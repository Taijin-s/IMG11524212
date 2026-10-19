// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
=== */

// Classifier Variable
let classifier;
// Model URL
let imageModelURL = ’https://taijin-s.github.io/IMG11524212/‘;

// Video
let video;
// To store the classification
let label = ”載入模型中...“;

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + ’model.json‘);
}

function setup() {
  createCanvas(320, 320);

  // 建立視訊設定（相容多數裝置）
  var constraints = {
    audio: false,
    video: {
      facingMode: ”environment“ // 使用後鏡頭（若電腦測試可改為 video: true）
    }   
  };

  video = createCapture(constraints, function() {
    // 確保視訊準備好後才開始分類
    classifyVideo();
  });
  
  video.size(320, 320);
  video.hide();
}

function draw() {
  background(0);
  
  // 繪製視訊畫面
  image(video, 0, 0, width, height);

  // 繪製辨識結果外框與文字背景，讓字體更清晰
  fill(0, 150);
  rect(0, height - 40, width, 40);

  // 繪製辨識結果標籤
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
  // 如果有錯誤發生
  if (error) {
    console.error(error);
    return;
  }
  
  // 更新標籤
  label = results[0].label;
  
  // 繼續進行下一次分類
  classifyVideo();
}
111
