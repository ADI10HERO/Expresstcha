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

var delay = 100

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

var vote_arr  = {
  neutral: 0,
  happy: 0,
  sad: 0,
  angry: 0,
  fearful: 0,
  disgusted: 0,
  surprised : 0
}

var final_emotion = '';
// video.addEventListener('play', () => {
//   // const canvas = faceapi.createCanvasFromMedia(video)
//   // document.body.append(canvas)
//   // const displaySize = { width: video.width, height: video.height }
//   // faceapi.matchDimensions(canvas, displaySize)
//   setInterval(async () => {
//     const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
//     // console.log(emotion_dict);
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

export function detect(){
  var delay = 20000;
  video.addEventListener('play', () => {
    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
      if (detections === undefined){
        console.log(0) 
       }
       else{
         var emotion_dict = detections['expressions']
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
