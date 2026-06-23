import { AjaxRes } from "@/models/ajax_res";
import { BookMarkerNode } from "@/models/book_marker";

export class MarkApi {

    async list(pCode: string): Promise<AjaxRes<BookMarkerNode[]>> {
        const res = await fetch(
            `/api/marks?pCode=${pCode}`,
            {
                method: "GET",
            }
        );
        return await res.json() as AjaxRes<BookMarkerNode[]>;
    }

    async markInfo(code: string): Promise<AjaxRes<BookMarkerNode>> {
        const res = await fetch(
            `/api/mark/${code}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
        )

        return await res.json() as AjaxRes<BookMarkerNode>
    }

    async importMarks(file: File): Promise<AjaxRes<string>> {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch(
            `/api/mark/import/html`, {
            method: "POST",
            body: formData
        })
        return await res.json() as AjaxRes<string>
    }

    async updateMark(mark: BookMarkerNode): Promise<AjaxRes<string>> {
        const res = await fetch(
            `/api/mark`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(mark)
        })

        return await res.json() as AjaxRes<string>
    }

    async deleteMark(code: string): Promise<AjaxRes<string>> {
        const res = await fetch(
            `/api/mark/${code}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }
        )

        return await res.json() as AjaxRes<string>
    }

    async addMark(mark: BookMarkerNode): Promise<AjaxRes<string>> {
        const res = await fetch(
            `/api/mark`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(mark)
        }
        )

        return await res.json() as AjaxRes<string>
    }
    async clearAll(): Promise<AjaxRes<string>> {
        const res = await fetch(
            `/api/mark/clearAll`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }
        )

        return await res.json() as AjaxRes<string>
    }
}