var emotions = ["happy","angry","sad"];
var emotion = '';

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
    const redirect_url = 'https://www.google.com'; //later from user
    const old_url = 'https://syrushackathon.tech/'; //later from user
    setTimeout(function() {
      detect(old_url, redirect_url)  
    }, 1 );

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
  var display_string = "Make a " + emotion + " Face. You have five seconds";
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
  var timer = 0;
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
          url = await sucess();
          window.location.replace(redirect_url)
        }
        if (timer >= 5000){
          url = await failure();
          window.location.replace(old_url)
        }
      }
      console.log(timer)
      timer+=100;
    }, delay)
  })
}

function sucess(){
  responsiveVoice.speak("Captcha cleared, redirecting to destination website")
}

function failure(){
  responsiveVoice.speak("Captcha failed, redirecting to source website")
}