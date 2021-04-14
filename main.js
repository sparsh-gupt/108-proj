prediction1 = "";
prediction2 = "";
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach("#camera");

function capture() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="capture_image" src="' + data_uri + '"/>'
    });
}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/6gqNY21iC/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "And the second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}
function check() {
    img = document.getElementById("capture_image");
    classifier.classify(img, gotresult);

}

function gotresult(error, result) {
    if (error) {
        console.error();
    } else {
        console.log(result);
        document.getElementById("result_emotion_name").innerHTML = result[0].label;
        document.getElementById("result_emotion_name2").innerHTML = result[1].label;
        prediction1 = result[0].label;
        prediction2 = result[1].label;
        speak()
        if (result[0].label == "namaste") {
            document.getElementById("update_emoji").innerHTML = "&#x1F64F;";
        }
        if (result[0].label == "thumbs up") {
            document.getElementById("update_emoji").innerHTML = "&#x1F44D;";
        }
        if (result[0].label == "nice") {
            document.getElementById("update_emoji").innerHTML = "&#x1F44C;";
        }
        if (result[1].label == "namaste") {
            document.getElementById("update_emoji2").innerHTML = "&#x1F64F;";
        }
        if (result[1].label == "thumbs up") {
            document.getElementById("update_emoji2").innerHTML = "&#x1F44D;";
        }
        if (result[1].label == "nice") {
            document.getElementById("update_emoji2").innerHTML = "&#x1F44C;";
        }
    }
}