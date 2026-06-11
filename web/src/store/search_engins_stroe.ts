import type { DropdownOption } from "naive-ui";
import { defineStore } from "pinia";


export const useSerchEngineStore = defineStore('searchEngine', {
    state: () => {
        return {
            engines: new Map<string, string>([
                ["bing", 'https://www.bing.com/search?q='],
                ["google", 'https://www.google.com/search?q=']
            ]),
            currentEngine: 'bing'
        }
    },
    actions: {
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
        addEngines(engineName: string, engineLink: string) {
            this.engines.set(engineName, engineLink);
            localStorage.setItem('engines', JSON.stringify(this.engines));
        },
        changeCurrentEngines(engineName: string) {
            this.currentEngine = engineName;
            localStorage.setItem('defaultEngine', engineName);
        },
        enginesOptions(): Array<DropdownOption> {
            let arr: Array<DropdownOption> = [];

            this.engines.forEach((_value, key, _map) => {
                arr.push({
                    key: key,
                    label: key,
                })
            })
            return arr;
        },
        getEnginesLink: function (engineName: string): string {
            return this.engines.get(engineName) ?? ''
        }
    }
})