// send popup icon clicked meassage to background
chrome.runtime.sendMessage({clicked : true});

// receive vocab from content.js and append it in popup
chrome.runtime.onMessage.addListener(receiver);
function receiver(request, sender, sendResponse) {
	content = document.getElementById('usage');
	display = '<p style=\"color:blue;font-size:12px;\">'+ request + '</p>'
	content.insertAdjacentHTML('beforeend', display);
}
