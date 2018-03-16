# Browser Speech

Just want to see what it does? Visit the [live demo page](https://computer_programmer.neocities.org/browser-speech/).
# What Is It?

The HTML5 [Text To Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) is a powerful tool for making web pages that talk.

The API comes with a large number of configuration options and callbacks. Such settings are necessary for special use cases. For most of my TTS use cases, I've found I really only need a few things:

 * An input string
 * A language code (Eg: `en`, `es`, `ko`, etc..)
 * A callback that fires on start
 * An error callback

`browser-speech` is born from these needs. The library is 0 config by design and only does one thing: talk.

If you don't need a bunch of knobs and special customization for your speech use cases, this library may be a good fit.

If you _do_ require special settings (such as speech rate adjustment, pauses, etc...) using the HTML5 Speech API directly may be a better choice.

`browser-speech` is written in Typescript and targets all modern browsers.

# Is it any good?

Yes. It is used in real world applications, such as the control software for [FarmBot](http://farm.bot). If you would like your application added to a list of real-world use cases, please [submit a PR](https://github.com/RickCarlino/browser-speech/pulls).

# Installation

```
npm install browser-speech
```

# Usage

The library exports a `talk(text: string, language: string)` function. The function is promise based and works well with the `await` keyword.

```
import { talk } from "browser-speech";

// FIRST PARAMETER:  Text you wish to speak
// SECOND PARAMETER: Language code. Default is "en" (English). Throws exception
//                   when an unsupported code is entered.

talk("Hello, world!", "en")
  .then((event) => console.log("Text to speech is nice");)
  .catch((event) => console.error("Failed. :("););
```

# Running Live Demo

Load `live_demo.html` in your browser via [parcel](https://parceljs.org/getting_started.html).

```
npm install -g parcel-bundler
parcel live_demo.html
# You can now test the operability of the `talk()` function by opening
# http://localhost:1234 - You should hear speech.
```
