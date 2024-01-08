export function getCoverageAndCanyonData(): Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        const message = { type: '__canyon__' };
        if (tab.id) {
          chrome.tabs.sendMessage(tab.id, message, (res) => {
            if (res.coverage === undefined) {
              reject('No coverage data detected.');
            }
            if (res.canyon === undefined) {
              reject('No canyon data detected.');
            }
            resolve(res);
            return true;
          });
        }
      });
    }, 360);
  });
}

export function upload({ canyon, coverage }:any) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(canyon.dsn, {
        method: 'POST',
        body: JSON.stringify({
          ...canyon,
          coverage,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${canyon.reporter}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(String(err));
        });
    }, 500);
  });
}
