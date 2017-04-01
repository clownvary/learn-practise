export default function() {
    let ua = window.navigator.userAgent;
    let msie = ua.indexOf("MSIE ");
    let result = false;
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))
    {
        result = true;
    }

    return result;
}
