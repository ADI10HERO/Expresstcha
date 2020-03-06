var emotions = ["happy","angry","sad"];
var emotion = '';
var timeleft = 10;
// var tries = 2;

var final_emotion = '';
window.onload = function() {
    const video = document.getElementById('videoElement')
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models')
    ]).then(startVideo)

    function startVideo() {
      navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
      )
    }
    make_string();
    show_timer();
    const redirect_url = 'https://www.google.com'; //later from user
    const old_url = 'https://syrushackathon.tech/'; //later from user
    setTimeout(function() {
      detect(old_url, redirect_url)  
    }, 1 );
    document.getElementById('refresh').onclick = make_string

}

function getmax(obj){
  var curr_max = 0;
  var max_key= '';
  var x;
  for (x in obj){
    if (obj[x] > curr_max){
      curr_max = obj[x];
      max_key = x;
    }
  }
  return max_key;
}

function make_string() {
  var x = Math.floor(Math.random() * 3);
  emotion = emotions[x];
  var display_string = "Make a " + emotion + " Face. You have ten seconds";
  document.getElementById("instruction_string").innerHTML = display_string;
  document.getElementById("downloaded_img").src="./static/" + emotion + ".jpg";
  responsiveVoice.speak(display_string);
}
var vote_arr  = {
  Neutral: 0,
  happy: 0,
  sad: 0,
  angry: 0,
  fearful: 0,
  disgusted: 0,
  surprised : 0
}
function detect(old_url, redirect_url){
  const video = document.getElementById('videoElement')
  var delay = 100;
  // var timer = 0;
  video.addEventListener('play', () => {
    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
      if (detections === undefined || detections==[{}]){
        console.log(0) 
       }
       else{
        var emotion_dict = detections[0]['expressions']
        vote_arr[getmax(emotion_dict)] +=1;
        final_emotion = getmax(vote_arr);
        console.log(final_emotion)
        console.log(emotion)
        if (emotion == final_emotion){
          await sucess();
          window.location.replace(redirect_url)
        }
        if (timeleft <= 0){
          // if (tries == 2){
          //   // await retry();
          //   tries -= 1 ;
          //   // location.reload();
          //   console.log(tries);
          // }
          // else{
            await failure();
            window.location.replace(old_url)
            // console.log(tries)
          
          // }
          
        }
      }
    }, delay)
  }
  )
}

function sucess(){
  responsiveVoice.speak("Captcha cleared, redirecting to destination website")
}

function failure(){
  responsiveVoice.speak("Captcha failed, redirecting to source website")
}


function retry(){
  responsiveVoice.speak("Captcha failed, Try again!")
}

function show_timer(){
  var downloadTimer = setInterval(function(){
   
    if(timeleft <= 0){
      clearInterval(downloadTimer);

      if (tries == 2){
        document.getElementById("countdown").innerHTML = "Try Again";
      } 
    else{
      document.getElementById("countdown").innerHTML = "Failed";
    }
  } else {
    document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
  }
  timeleft -= 1;
}, 1000);
}
