import { reactive } from "vue";
export const SearchEnginsStore = reactive({
    engines: new Map([
        ["bing", 'https://www.bing.com/search?q='],
        ["google", 'https://www.google.com/search?q=']
    ]),
    currentEngine: "bing",
    loadEngines() {
        let storage = localStorage.getItem('engines');
        if (storage) {
            this.engines = JSON.parse(storage);
        }
        let de = localStorage.getItem('defaultEngine');
        if (de) {
            this.currentEngine = de;
        }
    },
    addEngines(engineName, engineLink) {
        this.engines.set(engineName, engineLink);
        localStorage.setItem('engines', JSON.stringify(this.engines));
    },
    changeCurrentEngines(engineName) {
        this.currentEngine = engineName;
        localStorage.setItem('defaultEngine', engineName);
    },
    enginesOptions() {
        let arr = [];
        this.engines.forEach((_value, key, _map) => {
            arr.push({
                key: key,
                label: key,
            });
        });
        return arr;
    },
    getEnginesLink: function (engineName) {
        return this.engines.get(engineName) ?? '';
    }
});
