// chrome.action.onClicked.addListener(tab => {
	
//   	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//   		console.log('extension icon clicked');
// 		chrome.tabs.sendMessage(tabs[0].id, { todo: "openDialog"});
// 		console.log(tabs[0].url);
//   });
// });

//send icon clicked message to content.js 
chrome.runtime.onMessage.addListener( function (message, sender, sendResponse) {
  if (message.clicked) {
  	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  		console.log('extension icon clicked');
		chrome.tabs.sendMessage(tabs[0].id, { todo: "openDialog"});
  	});
  }
});
