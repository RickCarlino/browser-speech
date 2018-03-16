import { talk } from "./index";

const DEMO_TEXT = "You are listening to a demo of browser-speech. " +
  "Available now on NPM.";

const LABEL_START = "Play \"browser-speech\" demo";
const LABEL_RUNNING = "Playing audio...";
const LABEL_FAIL = "Error during playback.";

const BUTTON_TEXT = "Push here to try browser-speech";
const LANG = "en";

const setText = (button: Element, text: string) => button.innerHTML = text;
const demoDone = (button: Element) => setText(button, BUTTON_TEXT);
const demoFailed = (button: Element) => setText(button, LABEL_FAIL);

function runDemo(button: Element) {
  talk(DEMO_TEXT, LANG).then(() => demoDone(button), () => demoFailed(button));
  setText(button, LABEL_RUNNING);
}

function bootstrap(button: Element) {
  button.addEventListener("click", () => runDemo(button));
  setText(button, LABEL_START);
}

const button = document.querySelector("#btn");

(button) ? bootstrap(button) : alert("Page failed to load.");
