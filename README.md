# audioplayer

An instance class wrapping an HTML5 audio object.
It offers analyser for analysing frequencies of the playing audio.

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/@jworkshop/audioplayer.svg
[npm-url]: http://npmjs.org/package/@jworkshop/audioplayer
[travis-image]: https://img.shields.io/travis/JWorkshop/audioplayer.svg
[travis-url]: https://travis-ci.org/JWorkshop/audioplayer
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/@jworkshop/audioplayer.svg
[download-url]: https://npmjs.org/package/@jworkshop/audioplayer

## install

[![NPM](https://nodei.co/npm/@jworkshop/audioplayer.png)](https://nodei.co/npm/@jworkshop/audioplayer)

## Usage

```javascript
import AudioPlayer from "@jworkshop/audioplayer";

let loadHandler = () => { ... };

let errorHandler = () => { ... };

let url = "<audio source url>";

/* Create an instance of an audio player. */
let audioPlayer = new AudioPlayer();
/* Or create it with url, loadHandler and errorHandler. */
let audioPlayer = new AudioPlayer(url, loadHandler, errorHandler);

/** Bind an event handler to the load event. */
audioPlayer.onLoad(loadHandler);

/** Unbind an event handler from the load event. */
audioPlayer.removeLoad(loadHandler);

/** Unbind all event handlers from the load event. */
audioPlayer.clearLoad();

/** Bind an event handler to the error event. */
audioPlayer.onError(errorHandler);

/** Unbind an event handler from the error event. */
audioPlayer.removeError(errorHandler);

/** Unbind all event handlers from the error event. */
audioPlayer.clearError();

/** Bind an event handler to the start event. */
audioPlayer.onStart(startHandler);

/** Unbind an event handler from the start event. */
audioPlayer.removeStart(startHandler);

/** Unbind all event handlers from the start event. */
audioPlayer.clearStart();

/** Bind an event handler to the stop event. */
audioPlayer.onStop(stopHandler);

/** Unbind an event handler from the stop event. */
audioPlayer.removeStop(stopHandler);

/** Unbind all event handlers from the stop event. */
audioPlayer.clearStop();

/** Bind an event handler to the pause event. */
audioPlayer.onPause(pauseHandler);

/** Unbind an event handler from the pause event. */
audioPlayer.removePause(pauseHandler);

/** Unbind all event handlers from the pause event. */
audioPlayer.clearPause();

/** Bind an event handler to the resume event. */
audioPlayer.onResume(resumeHandler);

/** Unbind an event handler from the resume event. */
audioPlayer.removeResume(resumeHandler);

/** Unbind all event handlers from the resume event. */
audioPlayer.clearResume();

/** Load a source (URL) to the audio. */
audioPlayer.load(url);

/** Get the duration of the audio. */
audioPlayer.getDuration();

/** Get the current time of the audio. */
audioPlayer.getCurrentTime();

/** Get the volume of the audio. */
audioPlayer.getVolume();

/** Set the volume of the audio. */
audioPlayer.setVolume(volume);

/** Create a new source node from the audio. */
audioPlayer.createSource();

/** Create an analyser for the audio to record frequency data. */
audioPlayer.setupAnalyser();

/** Get the frequency data of the analyser previously created, otherwise null is returned.
  * It requires setupAnalyser() first. */
audioPlayer.getFrequencyData();

/** Get the time domain data (waveform) of the analyser previously created, otherwise null is returned.
  * It requires setupAnalyser() first. */
audioPlayer.getTimeDomainData();

/** Start the audio. */
audioPlayer.start();

/** Pause the audio. */
audioPlayer.pause();

/** Resume the audio. */
audioPlayer.resume();

/** Stop the audio. */
audioPlayer.stop();
```
