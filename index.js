var video = document.querySelector("#videoElement");

		if (navigator.mediaDevices.getUserMedia) {
		  navigator.mediaDevices.getUserMedia({ video: true })
		    .then(function (stream) {
		      video.srcObject = stream;
		    })
		    .catch(function (err0r) {
		      console.log("Something went wrong!");
		    });
		}

		function stop(e) {
		  var stream = video.srcObject;
		  var tracks = stream.getTracks();

		  for (var i = 0; i < tracks.length; i++) {
		    var track = tracks[i];
		    track.stop();
		  }

		  video.srcObject = null;
		}

<html>

	<head>
	<title>Expresstcha</title>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	</head>
<style>
#downloaded_img {
	display: block;
	width: 50%;
	height: 375px;
	margin-left: auto;
	margin-right: auto;
}
#container {
	margin: 0px auto;
	width: 80%;
	height: 375px;
	border: 5px #333 solid;
}
#videoElement {
	width: 100%;
	height: 375px;
	background-color: #666;
}
.flex-container {
  display: flex;
  background-color: DodgerBlue;
  padding-left: 10px;
  padding-right: 10px;
}

.flex-container > div {
  background-color: #f1f1f1;
  margin: 10px;
  width: 50%;
  padding: 20px;
  font-size: 30px;
}
</style>
<body>
	<h1 align="center">
		Expresstcha
	</h1>
	<h3> Confirm you're a human </h3>

	<p>Make a "Happy Face"</p>

	<div class="flex-container">
  		<div>
			<img id="downloaded_img" src="C:\Users\Hp\Documents\cutie.jpg" alt="demo_expression"></img>
  		</div>
  		<div>
  			<div id="container">
				<video autoplay="true" id="videoElement">
	
				</video>
				<i class="fa fa-stop" onclick="stop()" aria-hidden="true" style="color:red;"></i>
			</div>
  		</div>
	</div>
</body>
</html>