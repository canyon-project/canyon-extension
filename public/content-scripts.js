const e = function() {
    const t = document.createElement("script");
    t.type = "text/javascript", t.className = "content_scripts", t.src = chrome.runtime.getURL("interceptor.js"), (document.head || document.documentElement).appendChild(t);
};
e();

let box = null

setTimeout(()=>{
    // window.postMessage({
    //   test:"你好"
    // },'*')
    window.addEventListener('message', function (e) {
        if (e.data.test1){
            console.log(e.data.test1)
            box = e.data.test1
        }
    })
},1000)



function huoqushuju() {
    window.postMessage({
        test:"你好"
    },'*')

    // return box

    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(box)
        },200)
    })
}

// get popup2content info
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {


    huoqushuju().then(res=>{
        box = null
        sendResponse(res)
    })
    return true
})




setInterval(()=>{
    console.log(box,'检查box')
},500)