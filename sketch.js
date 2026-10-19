// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://taijin-s.github.io/IMG11524212/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(320, 320);

  var constraints = {
    audio: false,
    video: {
      facingMode: ”environment“
    }
  };

  video = createCapture(constraints, function() {
    classifyVideo();
  });
  
  video.size(320, 320);
  video.hide();
}

function draw() {
  background(0);
  
  // 繪製視訊畫面
  image(video, 0, 0, width, height);

  // 繪製辨識結果底圖與文字，讓畫面更清楚
  fill(0, 150);
  rect(0, height - 40, width, 40);

  fill(255);
  noStroke();
  textSize(18);
  textAlign(CENTER, CENTER);
  text(label, width / 2, height - 20);
}

// 取得當前視訊畫面的預測結果
function classifyVideo() {
  classifier.classify(video, gotResult);
}

// 當收到辨識結果時
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  
  label = results[0].label;
  classifyVideo();
}
