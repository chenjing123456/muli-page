/**
 *
 * @desc 判断使用的是手机 还是 pc
 */
export function isMobile() {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = false;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > -1) {
            flag = true;
            break;
        }
    }
    return flag;
}