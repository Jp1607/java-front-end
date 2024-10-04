export function capitalize(param: string): string {
    let ret: string = '';
    if (param !== undefined && param !== null && param !== '') {
        ret = (param.charAt(0).toUpperCase() + param.slice(1));
    }
    return ret;
}