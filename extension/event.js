document.addEventListener("seekToSecond", function (e) {
  // document.getElementById("movie_player").seekTo(e.detail);
  // console.log(e.detail.seekTime);
  document.getElementsByTagName('video')[0].currentTime = e.detail.seekTime;
});