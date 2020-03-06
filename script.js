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

window.onload = function() {
    const video = document.getElementById('videoElement')
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models')
    ]).then(startVideo).then(this.make_string)

    function startVideo() {
      navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
      )
    }
  }

var final_emotion = '';

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


function timeout(){
    detect();
    setTimeout(timeout,5000);
    }

function make_string() {
  var x = Math.floor(Math.random() * 3);
  emotion = emotions[x];
  var display_string = "Make a " + emotion + " Face. You have five seconds";
  document.getElementById("instruction_string").innerHTML = display_string;
  document.getElementById("downloaded_img").src="./static/" + emotion + ".jpg";
  responsiveVoice.speak(display_string);
}

var delay = 100

// video.addEventListener('play', () => {
//   setInterval(async () => {
//     const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
//     console.log(emotion_dict);
//     if (detections === undefined){
//      console.log(0) 
//     }
//     else{
//       var emotion_dict = detections['expressions']
//     vote_arr[getmax(emotion_dict)] +=1;
//     console.log(vote_arr)
//     final_emotion = getmax(vote_arr);
//     console.log(final_emotion)
//     document.getElementById('json').innerHTML = final_emotion;
//   }
//     // js_det = JSON.parse(detections)
//     // document.getElementById('json').innerHTML =  max(detections['expressions']);
//     //const resizedDetections = faceapi.resizeResults(detections, displaySize)
//     //canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
//     //faceapi.draw.drawDetections(canvas, resizedDetections)
//     //faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
//     //faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
//   }, delay) 
// })

function detect(){
  console.log("in detect")
  var delay = 700;
  video.addEventListener('play', () => {
    console.log("herererere")
    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
      if (detections === undefined){
        console.log(0) 
       }
       else{
        var emotion_dict = detections['expressions']
        console.log(emotion_dict)
        vote_arr[getmax(emotion_dict)] +=1;
        console.log(vote_arr)
        final_emotion = getmax(vote_arr);
        console.log(final_emotion)
        document.getElementById('json').innerHTML = final_emotion;
     }
    }, delay) 
  })
  setTimeout(detect, 500);
}
