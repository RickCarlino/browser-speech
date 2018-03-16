"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var DEMO_TEXT = "You are listening to a demo of browser-speech. " +
    "Available now on NPM.";
var LABEL_START = "Play \"browser-speech\" demo";
var LABEL_RUNNING = "Playing audio...";
var LABEL_FAIL = "Error during playback.";
var BUTTON_TEXT = "Push here to try browser-speech";
var LANG = "en";
var setText = function (button, text) { return button.innerHTML = text; };
var demoDone = function (button) { return setText(button, BUTTON_TEXT); };
var demoFailed = function (button) { return setText(button, LABEL_FAIL); };
function runDemo(button) {
    index_1.talk(DEMO_TEXT, LANG).then(function () { return demoDone(button); }, function () { return demoFailed(button); });
    setText(button, LABEL_RUNNING);
}
function bootstrap(button) {
    button.addEventListener("click", function () { return runDemo(button); });
    setText(button, LABEL_START);
}
var button = document.querySelector("#btn");
(button) ? bootstrap(button) : alert("Page failed to load.");
