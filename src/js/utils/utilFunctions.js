/** 格式化输出时间，输入为10位时间戳*/
function add0(m){return m<10?'0'+m:m }
export function date(shijianchuo) { //时间戳到秒即共13位
    //shijianchuo是整数，否则要parseInt转换
    let time = new Date(+shijianchuo);
    let y = time.getFullYear();
    let m = time.getMonth()+1;
    let d = time.getDate();
    let h = time.getHours();
    let mm = time.getMinutes();
    let s = time.getSeconds();
    return y+'-'+add0(m)+'-'+add0(d);
    // return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}
export function roughDate(shijianchuo) {
    let minute = 1000 * 60;
    let hour = minute * 60;
    let day = hour * 24;
    let halfamonth = day * 15;
    let month = day * 30;

    let now = new Date().getTime();
    let diffValue = now - +shijianchuo*1000;
    let result = '';
    if(diffValue < 0){
        result =  date(shijianchuo);
    }
    let monthC = diffValue / month;
    let weekC = diffValue / (7*day);
    let dayC = diffValue / day;
    let hourC = diffValue / hour;
    let minC = diffValue / minute;
    if(monthC >= 1) {
        result = parseInt(monthC) + "个月前";
    } else if(weekC >= 1) {
        result = parseInt(weekC) + "周前";
    } else if(dayC >= 1) {
        result = parseInt(dayC) + "天前";
    } else if(hourC >= 1) {
        result = parseInt(hourC) + "小时前";
    } else if(minC >= 1) {
        result = parseInt(minC) + "分钟前";
    } else {
        result = "刚刚发表";
    }

    return result;
}

export function getTry(f) {
    try {
        return f();
    } catch (e) {
        console.log(e);
    }
}