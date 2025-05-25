let isInProcess = false;

chrome.runtime.onConnect.addListener(
(request) => {
return true;
}
);

const captureScreen = (request, sender, sendResponse) => {
  if (isInProcess) {
    sendResponse({});
    return true;
  }
isInProcess = true;
chrome.tabs.captureVisibleTab(
null,
{},
function(dataUrl){
  console.log(dataUrl);
  isInProcess = false;
  sendResponse({imgSrc:dataUrl});
});
return true;
};

chrome.runtime.onMessage.addListener(
captureScreen
);

    chrome.runtime.onMessageExternal.addListener(
      captureScreen
    );

chrome.runtime.onInstalled.addListener(function () {
});
