const e = function() {
    const t = document.createElement("script");
    t.type = "text/javascript", t.className = "content_scripts", t.src = chrome.runtime.getURL("interceptor.js"), (document.head || document.documentElement).appendChild(t);
};
e();

let casualCoverageAndCanyonData = null

window.addEventListener('message', function (e) {
    if (e.data.type === '__canyon__event_get_coverage_and_canyon_data_response'){
        casualCoverageAndCanyonData = e.data.payload
    }
})

function getCoverageAndCanyonData() {
    window.postMessage({
        type:'__canyon__event_get_coverage_and_canyon_data_request',
        payload:{}
    },'*')
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(casualCoverageAndCanyonData)
        },360)
    })
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request)
    getCoverageAndCanyonData().then(res=>{
        casualCoverageAndCanyonData = null
        sendResponse(res)
    })
    return true
})