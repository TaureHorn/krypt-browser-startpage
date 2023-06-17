export function isObjectEmpty(obj){
    if (typeof obj !== "object"){
        return null
    } else {
        return !Object.keys(obj).length > 0;
    }
}
