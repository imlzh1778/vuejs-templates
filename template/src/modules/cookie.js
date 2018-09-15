export default {
    set (name, value, days) {
        let oDate = new Date();
        oDate.setTime(oDate.getTime() + 24 * 60 * 60 * 1000 * days);
        document.cookie = `${name}=${value};path=/;expires=${oDate.toGMTString()}`;
    },
    get (name) {
        let oArr = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
        return oArr ? oArr[2] : null;
    },
    delete (name) {
        this.set(name, '', -1);
    }
};