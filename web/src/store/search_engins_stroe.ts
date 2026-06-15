import type { DropdownOption } from "naive-ui";
import { defineStore } from "pinia";
import SearchEngineApi from "../api/search_engin";
import { SearchEngine } from "../models/search_engin";


const seApi = new SearchEngineApi()
export const useSerchEngineStore = defineStore('searchEngine', {
    state: () => {
        return {
            engines: [
                {
                    title: 'bing',
                    link: 'https://www.bing.com/search?q='
                },
                {
                    title: "google",
                    link: 'https://www.google.com/search?q='
                }
            ],
            currentEngine: 'bing'
        }
    },
    actions: {
        async loadEngines() {
            const res = await seApi.list()
            if (res.code === "200") {
                const l = res.data ?? []
                if (l.length > 0) {
                    this.engines = l
                }
            }
            seApi.defauleEngin().then(res => {
                if (res.code === "200") {
                    this.currentEngine = res.data ?? "bing"
                }
            })
        },
        async addEngines(engin:SearchEngine) {
            return await seApi.add(engin)
        },
        async deleteEnigne(id:number){
            return await seApi.deleteSe(id)
        },
        changeCurrentEngines(engineName: string) {
            this.currentEngine = engineName;
            // localStorage.setItem('defaultEngine', engineName);
            seApi.changeDefault(engineName)
        },
        enginesOptions(): Array<DropdownOption> {
            let arr: Array<DropdownOption> = [];

            this.engines.forEach(element => {
                arr.push({
                    key: element.title,
                    label: element.title,
                })
            });
            arr.push({ key: 'setting', label: "设置" })
            return arr;
        },
        getEnginesLink: function (engineName: string): string {
            let link = ''
            this.engines.forEach(element => {
                if (element.title === engineName) {
                    link = element.link
                }
            }
            )
            return link
        }
    }
})