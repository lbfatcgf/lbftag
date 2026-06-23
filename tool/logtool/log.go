package logtool

import (
	"context"
	"log/slog"
	"os"
	fp "path/filepath"
	"time"

	"github.com/lmittmann/tint"
)

type logMsg struct {
	Level   slog.Level
	Message string
	arg     []any
}
type Logger struct {
	file     *os.File
	grouping string
	log      *slog.Logger
	consloe  *slog.Logger
	wirteCh  chan *logMsg
	cancel   context.CancelFunc
	level    slog.Level
}

var logMap map[string]*Logger

func init() {
	logMap = make(map[string]*Logger)
}

func NewLogger(grouping string, logConsloe bool) *Logger {
	logger := &Logger{
		wirteCh:  make(chan *logMsg, 1024),
		grouping: grouping,
	}
	err := logger.logFileHandler()
	if err != nil {
		panic(err)
	}
	if logConsloe {
		logger.consloe = slog.New(tint.NewHandler(os.Stderr, &tint.Options{
			Level:      slog.LevelDebug,
			TimeFormat: "2006-01-02 15:04:05",
		}))

	}
	logMap[grouping] = logger
	go logger.start()
	return logger
}

func (l *Logger) logFileHandler() error {
	l.level = slog.LevelDebug
	return l.genLogger()
}

func (l *Logger) genLogger() error {
	configDir, err := os.UserConfigDir()
	if err != nil {
		return err
	}
	logdir := fp.Join(configDir, "lbftag", "logs", l.grouping)
	err = os.MkdirAll(logdir, 0755)

	if err != nil {

		return err

	}

	openFile, err := os.OpenFile(fp.Join(logdir, time.Now().Format("2006-01-02")+".log"), os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0o666)
	if err != nil {
		return err
	}
	if l.file != nil {
		l.file.Close()
	}
	l.file = openFile
	logHandler := slog.NewJSONHandler(l.file, &slog.HandlerOptions{
		Level: l.level,
	})
	l.log = slog.New(logHandler)
	return nil
}

func (l *Logger) checkFileNeedChange() bool {
	fPath := l.file.Name()
	configDir, err := os.UserCacheDir()
	if err != nil {
		return false
	}
	logdir := fp.Join(configDir, "lbftag", "logs", l.grouping)
	return fp.Join(logdir, time.Now().Format("2006-01-02")+".log") != fPath

}
func (l *Logger) Info(message string, args ...any) {
	l.wirteCh <- &logMsg{Level: slog.LevelInfo, Message: message, arg: args}
}

func (l *Logger) Error(message string, args ...any) {
	l.wirteCh <- &logMsg{Level: slog.LevelError, Message: message, arg: args}
}

func (l *Logger) Debug(message string, args ...any) {
	l.wirteCh <- &logMsg{Level: slog.LevelDebug, Message: message, arg: args}
}

func (l *Logger) Warn(message string, args ...any) {
	l.wirteCh <- &logMsg{Level: slog.LevelWarn, Message: message, arg: args}
}

func (l *Logger) Close() {
	l.cancel()
}

func (l *Logger) start() {
	ctx, cancel := context.WithCancel(context.Background())
	l.cancel = cancel
	for {
		select {
		case <-ctx.Done():
			l.file.Close()
			return
		case logMsg := <-l.wirteCh:
			if l.checkFileNeedChange() {
				l.genLogger()
			}
			if l.consloe != nil {
				l.consloe.Log(ctx, logMsg.Level, logMsg.Message, logMsg.arg...)
			}
			if l.log != nil {
				l.log.Log(ctx, logMsg.Level, logMsg.Message, logMsg.arg...)
			}
		}
	}
}

func CloseAllLog() {
	for _, logger := range logMap {
		logger.Close()
	}
}
