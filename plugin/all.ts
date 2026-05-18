import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from "vite-plugin-singlefile"
import { Plugin as importToCDN } from "vite-plugin-cdn-import"
export default function () {
    return [vue(), viteSingleFile(), importToCDN(
        {
            modules: [
                {
                    name: "vue",
                    var: "Vue",
                    path: "https://cdn.jsdelivr.net/npm/vue@3.5.34/dist/vue.global.min.js"
                },
                {
                    name: 'naive-ui',
                    var: 'naive',
                    path: 'https://cdn.jsdelivr.net/npm/naive-ui@2.44.1/dist/index.prod.js',
                }
            ]
        }
    )]
}