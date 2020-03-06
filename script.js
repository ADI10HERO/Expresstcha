var emotions = ["Happy","Angry","Sad"];
var emotion = '';
var vote_arr  = {
  Neutral: 0,
  Happy: 0,
  Sad: 0,
  Angry: 0,
  Fearful: 0,
  Disgusted: 0,
  Surprised : 0
}
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
  
    setTimeout(detect, 1000 );
    
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


// function timeout(){
//     detect();
//     setTimeout(timeout,5000);
//     }

function make_string() {
  var x = Math.floor(Math.random() * 3);
  emotion = emotions[x];
  var display_string = "Make a " + emotion + " Face. You have five seconds";
  document.getElementById("instruction_string").innerHTML = display_string;
  document.getElementById("downloaded_img").src="./static/" + emotion + ".jpg";
  responsiveVoice.speak(display_string);
}

function detect(){
  const video = document.getElementById('videoElement')
  var delay = 100;
  video.addEventListener('play', () => {
    console.log("herererere")
    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
      console.log(detections)
      if (detections === undefined || detections==[{}]){
        console.log(0) 
       }
       else{
        var emotion_dict = detections[0]['expressions']
        console.log(emotion_dict)
        vote_arr[getmax(emotion_dict)] +=1;
        // console.log(vote_arr)
        final_emotion = getmax(vote_arr);
        // console.log(final_emotion)
        document.getElementById('json').innerHTML = final_emotion;
     }
    }, delay) 
  })
  setTimeout(detect, 500);
}
