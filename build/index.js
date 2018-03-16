"use strict";
// ORIGINAL CODE: https://github.com/allain/promise-poll/blob/master/index.js
//                (MIT Licensed)
// This file is a typescript conversion of the code shown above.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
function poll(input) {
    var pollingFunction = input.pollingFunction, interval = input.interval, timeout = input.timeout;
    return new Promise(function (resolve, reject) {
        function check() {
            var result = pollingFunction();
            if (result) {
                clearInterval(intervalId);
                clearInterval(timeoutId);
                return resolve(result);
            }
        }
        check();
        var intervalId = setInterval(check, interval || 10);
        var timeoutId = setTimeout(function () {
            clearInterval(intervalId);
            reject(new Error('timeout'));
        }, timeout);
    });
}
exports.poll = poll;
;
/** Determines if browser can even use speech synthesis. */
function hasSpeech() {
    if (window.speechSynthesis
        && window.speechSynthesis.getVoices
        && window.speechSynthesis.speak) {
        return true;
    }
    else {
        return false;
    }
}
;
/** Dynamically (and asynchronously) populated list of voices.
 * Unfortunately, it is populated via polling :-\.
 * Pull requests welcome. */
var voices = hasSpeech() ? window.speechSynthesis.getVoices() : [];
window.speechSynthesis &&
    (window.speechSynthesis.onvoiceschanged = function () {
        voices = window.speechSynthesis.getVoices();
    });
function checkVoiceList() { return (voices.length) ? voices : undefined; }
var voicePromise = poll({ pollingFunction: checkVoiceList, timeout: 5000, interval: 250 });
function getVoice() { return voicePromise; }
exports.getVoice = getVoice;
function talk(text, lang) {
    if (lang === void 0) { lang = "en"; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!hasSpeech()) {
                return [2 /*return*/, Promise.reject({ error: "Speech synthesis not supported." })];
            }
            return [2 /*return*/, getVoice()
                    .then(function (list) {
                    var v = list.filter(function (x) { return x.lang.includes(lang); })[0];
                    if (!v) {
                        throw new Error("Language code " + lang + " not supported by browser.");
                    }
                    var utterance = new SpeechSynthesisUtterance(text);
                    utterance.voice = v;
                    window.speechSynthesis.speak(utterance);
                    return new Promise(function (resolve, reject) {
                        utterance.onend = function (event) { return resolve(event); };
                        utterance.onerror = function (event) { return reject(event); };
                    });
                })];
        });
    });
}
exports.talk = talk;
exports.VERSION = "1.1.1";
