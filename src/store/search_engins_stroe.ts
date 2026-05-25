import type { DropdownOption } from "naive-ui";
import { reactive } from "vue";

export const SearchEnginsStore = reactive<{
    engines: Map<string, string>
    currentEngine: string
    loadEngines: () => void
    addEngines: (engineName: string, engineLink: string) => void
    changeCurrentEngines: (engineName: string) => void
    enginesOptions:() => Array<DropdownOption>
    getEnginesLink:(engineName:string)=>string
}>({
    engines: new Map<string, string>([
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

        this.engines.forEach((value, key, map) => {
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
})