window.addEventListener('message', function (e) {
    if (e.data.test){
        console.log(window.__canyon__)
        //   回复
        window.postMessage({
            test1: window.__canyon__
        },"*")
    }
});

console.log('interceptor')