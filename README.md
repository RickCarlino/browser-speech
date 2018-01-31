# Browser Speech

# What Is It?

The [Text To Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) is great. You can use it to build web apps that talk.

There is a downside, though: it requires a lot of configuration. Sometimes, specifying a string of text and a language code is good enough.

This library **intentionally minimizes the configuration for common text-to-speech use cases.** If you don't need a bunch of knobs and special customization for your speech use cases, this library may be a good fit.

It is written in Typescript and targets all major browsers.

# Is it any good?

Yes.

# Installation

```
npm install browser-speech
```

# Usage

`talk` is promise based. It works well with the `await` keyword, also.


```
import { talk } from "browser-speech";

// FIRST PARAMETER:  Text you wish to speak
// SECOND PARAMETER: Language code. Default is "en" (English). Throws exception
                     when an unsupported code is entered.
talk("Hello, world!", "en")
  .then((event) => console.log("Text to speech is nice");)
  .catch((event) => console.error("Failed. :("););
```

# Dev Environment

Perfect is the enemy of done. In the case of `browser-speech`, I have not had time to write a test suite.

If you want to make changes to the lib (PRs welcome!) and verify that everything still works, you can load  `integration_test.html` in your browser via [parcel](https://parceljs.org/getting_started.html).

```
npm install -g parcel-bundler
parcel integration_test.html
# You can now test the operability of the `talk()` function by opening
# http://localhost:1234 - You should hear speech.
```
