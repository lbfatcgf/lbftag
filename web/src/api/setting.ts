import { AjaxRes } from "@/models/ajax_res";
import { HotSetting } from "@/models/hot_setting";

export default class SettingApi {
    async setting(): Promise<AjaxRes<HotSetting>> {
        const res = await fetch(
            `/api/setting`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        return await res.json() as AjaxRes<HotSetting>
    }

    async update(setting: HotSetting): Promise<AjaxRes<string>>{
        const res = await fetch(
            `/api/setting`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(setting)
            }
        )
        return await res.json() as AjaxRes<string>
    }
}