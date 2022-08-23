// send popup icon clicked meassage to background
chrome.runtime.sendMessage({clicked : true});

// receive vocab from content.js and append it in popup
chrome.runtime.onMessage.addListener(receiver);
function receiver(request, sender, sendResponse) {
	var content = document.getElementById('usage');
	// display = '<p style=\"color:blue;font-size:12px;\">'+ request + '</p>'
	// content.insertAdjacentHTML('beforeend', display);

	let vocabs = request.vocab;
	let timestamps = request.ts;
  const vocab = vocabs.split("\n");
	const ts = timestamps.split("\n");
	// display = '<p style=\"color:blue;font-size:12px;\">'

	// vocab.forEach((word, index) => {
	// 	const start_time = ts[index];
	// 	display += start_time + ',' + word + '<br>' 
	// });
	// display += '</p>';
	var counter = 1;
	vocab.forEach((word, index) => {
		const start_time = ts[index];
		if(word && word.length > 0){
				var div = document.createElement("div");
				div.style.paddingTop = "1%";
    		div.style.paddingBottom = "1%";
    		var button = document.createElement("input");
	      const id = "btn-" + counter;
	      button.id = id;
	      button.type = "button";
	      button.value = start_time;
	      button.classList.add("btn", "btn-outline-danger", "btn-custom-fixed");

	      button.onclick = function () {
	        markAsActive(id);
	        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
	          chrome.tabs.sendMessage(tabs[0].id, {
	            todo: "seekTo",
	            seconds: parseFloat(start_time),
	          });
	        });
	      };

	      var label = document.createElement("span");
	      label.style.paddingLeft = "5%";
	      label.style.color = "red";
	      label.innerText = word;

	      div.appendChild(button);
	      div.appendChild(label);
	      content.appendChild(div);
	      counter++;    		
		}

	});
	

	// content.insertAdjacentHTML('beforeend', display);
}
function markAsActive(btnId) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getURL" }, function (url) {
      chrome.storage.sync.get([url], function (currentActiveBtn) {
        currentActiveBtn = currentActiveBtn[url];
        if (btnId == undefined) {
          markButton(currentActiveBtn, true);
        } else {
          markButton(currentActiveBtn, false);
          chrome.storage.sync.set({ [url]: btnId }, function () {
            markButton(btnId, true);
          });
        }
      });
    });
  });
}

function markButton(btn, isActive) {
  if (btn) {
    if (isActive && document.getElementById(btn)) {
      document.getElementById(btn).classList.remove("btn-outline-danger");
      document.getElementById(btn).classList.add("btn-outline-success");
    } else {
      if (document.getElementById(btn)) {
        document.getElementById(btn).classList.remove("btn-outline-success");
        document.getElementById(btn).classList.add("btn-outline-danger");
      }
    }
  }
}

// function seekto(){
//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//   		console.log('watch button clicked');
// 		chrome.tabs.sendMessage(tabs[0].id, { todo: "seekTo", seconds: 120});
//   	});
// }

// document.getElementById('playvideo').addEventListener('click', seekto);