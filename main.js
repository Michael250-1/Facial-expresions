Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach('#camera');

function takesnapshot(){
Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML='<img id="captureimage" src="'+data_uri+'">';
});
}
console.log("ml5 version:",ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/6BZtTVwmg/model.json',modelLoaded);
function modelLoaded(){
    console.log("modelLoaded");
}
prediction1="";
prediction2="";

function speak(){
    var synth=window.speechSynthesis;
    data1="The first prediction is" + prediction1;
    data2="and the second prediction is" + prediction2;
    var utterThis=new SpeechSynthesisUtterance(data1 + data2);
    synth.speak(utterThis);
}
function check(){
    img=document.getElementById("captureimage");
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
    if (error){
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("result_emotion_1").innerHTML=results[0].label;
        document.getElementById("result_emotion_2").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();
        if (results[0].label=="Happy"){
document.getElementById("emoji1").innerHTML="&#128522;";
        }
if (results[0].label=="Sad"){
    document.getElementById("emoji1").innerHTML="&#128532;";

    }
    if (results[0].label=="Mad"){
        document.getElementById("emoji1").innerHTML="&#128548;";

      
        }
        if (results[1].label=="Happy"){
            document.getElementById("emoji2").innerHTML="&#128522;";
                    }
            if (results[1].label=="Sad"){
                document.getElementById("emoji2").innerHTML="&#128532;";
            
                }
                if (results[1].label=="Mad"){
                    document.getElementById("emoji2").innerHTML="&#128548;";
            
                  
                    }
}
}
