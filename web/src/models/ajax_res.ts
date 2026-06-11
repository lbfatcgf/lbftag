export type AjaxRes<T> = {
    code:string;
    msg:string;
    data?:T
}