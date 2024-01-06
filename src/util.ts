export function qifei() {
    return new Promise((resolve) => {
        // 获取当前活动页
        chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
            let message = { info: true };
            // 向content scripts发送消息
            chrome.tabs.sendMessage(tab.id, message, (res) => {
                resolve(res)
                return true
            });
        });
    })

}