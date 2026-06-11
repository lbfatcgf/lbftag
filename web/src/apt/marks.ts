import { AjaxRes } from "../models/ajax_res";
import { BookMarkerNode } from "../models/book_marker";

export class MarkApi {

    async list(pCode: string): Promise<AjaxRes<BookMarkerNode[]>> {
        const res=await fetch(
            `/api/marks?pCode=${pCode}`,
            {
                method: "GET",
            }
        );
        return await res.json() as AjaxRes<BookMarkerNode[]>;
    }

    async markInfo(code :string): Promise<AjaxRes<BookMarkerNode>>{
      const res=await fetch(
        `/api/mark/${code}`,{method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        }
      )  

      return await res.json() as AjaxRes<BookMarkerNode>
    }
}