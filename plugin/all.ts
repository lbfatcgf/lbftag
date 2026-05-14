import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from "vite-plugin-singlefile"
export default function() {
    return [vue(),viteSingleFile()]
}