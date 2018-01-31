// ORIGINAL CODE: https://github.com/allain/promise-poll/blob/master/index.js
//                (MIT Licensed)
// This file is a typescript conversion of the code shown above.

export interface PollingProps<T> {
  /** Finishes polling if return value is truthy. */
  predicate: () => T | undefined
  timeout: number;
  interval: number;
}

export function poll<T>(input: PollingProps<T>): Promise<T> {
  const { predicate, interval, timeout } = input;
  return new Promise(function (resolve, reject) {
    function check() {
      var result = predicate();
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

let voices: SpeechSynthesisVoice[] = speechSynthesis.getVoices();

speechSynthesis.onvoiceschanged = function () {
  voices = speechSynthesis.getVoices();
};

function checkVoiceList() { return (voices.length) ? voices : undefined; }

const voicePromise =
  poll({ predicate: checkVoiceList, timeout: 5000, interval: 250 });
export function getVoice() {
  return voicePromise;
}

export async function talk(text: string, lang = "en") {
  return getVoice()
    .then((list) => {
      const v = list.filter(x => x.lang.includes(lang))[0];
      if (!v) {
        throw new Error("Language code " + lang + " not supported by browser.");
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = v;
      speechSynthesis.speak(utterance);
      return new Promise(function (resolve, reject) {
        utterance.onend = (event) => resolve(event);
        utterance.onerror = (event) => reject(event);
      });
    })
}

export const VERSION = "1.0.0"
