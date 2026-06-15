import { AjaxRes } from "../models/ajax_res";
import { SearchEngine } from "../models/search_engin";

export default class SearchEngineApi {
    async list(): Promise<AjaxRes<SearchEngine[]>> {
        const res = await fetch(
            `/api/searchEngin`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
        )
        return await res.json() as AjaxRes<SearchEngine[]>
    }

    ///api/searchEngin/changeDefault/{engin}
    async changeDefault(engin: string): Promise<AjaxRes<string>> {
        const res = await fetch(
            `/api/searchEngin/changeDefault/${engin}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        })
        return await res.json() as AjaxRes<string>
    }
    // /api/searchEngin/default
    async defauleEngin(): Promise<AjaxRes<string>> {
        const res = await fetch(
            `/api/searchEngin/default`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        return await res.json() as AjaxRes<string>
    }

    // method=POST url=/api/searchEngin
    async add(engin: SearchEngine): Promise<AjaxRes<string>> {
        const res = await fetch(
            `/api/searchEngin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(engin)
        })
        return await res.json() as AjaxRes<string>
    }

    // method=DELETE url=/api/searchEngin/{id}
    async deleteSe(id: number): Promise<AjaxRes<string>> {
        const res = await fetch(
            `/api/searchEngin/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }

        )
        return await res.json() as AjaxRes<string>
    }
}