export function isObjectEmpty(obj){
    if (typeof obj !== "object"){
        return false
    } else {
        return !Object.keys(obj).length > 0;
    }
}
