import Vue from 'vue'

Vue.filter('dateFormat', function (date, format) {
    format = typeof format !== 'string' ? 'yyyy-MM-dd' : format

    if (isNaN(date)) {
        return ''
    }

    let o = {
        'M+': date.getMonth() + 1, // month
        'd+': date.getDate(), // day
        'h+': date.getHours(), // hour
        'm+': date.getMinutes(), // minute
        's+': date.getSeconds(), // second
        'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
        'S': date.getMilliseconds() // millisecond
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }

    if (/(D)/.test(format)) {
        format = format.replace(RegExp.$1, ['日', '一', '二', '三', '四', '五', '六'][date.getDay()])
    }

    for (let k in o) {
        if (o.hasOwnProperty(k) && new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
        }
    }

    return format
})