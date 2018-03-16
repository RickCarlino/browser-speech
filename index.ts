// ORIGINAL CODE: https://github.com/allain/promise-poll/blob/master/index.js
//                (MIT Licensed)
// This file is a typescript conversion of the code shown above.

export interface PollingProps<T> {
  /** Performs polling until return value is truthy. */
  pollingFunction: () => T | undefined
  timeout: number;
  interval: number;
}

export function poll<T>(input: PollingProps<T>): Promise<T> {
  const { pollingFunction, interval, timeout } = input;
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
};

/** Determines if browser can even use speech synthesis. */
function hasSpeech(): boolean {
  if (window.speechSynthesis
    && window.speechSynthesis.getVoices
    && window.speechSynthesis.speak) {
    return true;
  } else {
    return false;
  }
};

/** Dynamically (and asynchronously) populated list of voices.
 * Unfortunately, it is populated via polling :-\.
 * Pull requests welcome. */
let voices: SpeechSynthesisVoice[] =
  hasSpeech() ? window.speechSynthesis.getVoices() : [];

window.speechSynthesis &&
  (window.speechSynthesis.onvoiceschanged = function () {
    voices = window.speechSynthesis.getVoices();
  });

function checkVoiceList() { return (voices.length) ? voices : undefined; }

const voicePromise =
  poll({ pollingFunction: checkVoiceList, timeout: 5000, interval: 250 });

export function getVoice() { return voicePromise; }

export async function talk(text: string, lang = "en") {
  if (!hasSpeech()) {
    return Promise.reject({ error: "Speech synthesis not supported." });
  }

  return getVoice()
    .then((list) => {
      const v = list.filter(x => x.lang.includes(lang))[0];
      if (!v) {
        throw new Error("Language code " + lang + " not supported by browser.");
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = v;
      window.speechSynthesis.speak(utterance);
      return new Promise(function (resolve, reject) {
        utterance.onend = (event) => resolve(event);
        utterance.onerror = (event) => reject(event);
      });
    })
}

export const VERSION = "1.1.1"
