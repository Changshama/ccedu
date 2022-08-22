var open = false;
var word = 'test'

function getVideoId(url) {
  var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);
  if (match && match[2].length == 11) {
    return match[2];
  } else {
    alert("Invalid URL");
    return "error";
  }
}

async function start() {
	// flask server address
	const url = "https://0294-35-245-75-81.ngrok.io";

	let video_url = window.location.toString();

	let video_id = getVideoId(video_url)

	let data = { video_id };

	const req = await fetch(url, {
		method: "POST",
		body: JSON.stringify(data),
		headers: { "Content-Type": "application/json" },
	});
	
	req.json().then((e) => {
		word = e.ans;
		//send extracted vocabulary list to popup
		chrome.runtime.sendMessage(word);
	});
	
}

chrome.runtime.onMessage.addListener(function(request) {
		if (request.todo == "openDialog" && open == false) {
					start();
  				open =true;
			}

});