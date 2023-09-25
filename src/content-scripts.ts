const executeJS = function () {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.className = 'content_scripts';
  script.src = chrome.runtime.getURL('interceptor.js');
  const parent = document.head || document.documentElement;
  parent.appendChild(script);
};
executeJS();