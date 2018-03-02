"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Audio = window.Audio;
var AudioContext = window.AudioContext || window.webkitAudioContext;
var Uint8Array = window.Uint8Array;

var AudioPlayer = function () {
  function AudioPlayer(url, loadEvent, errorEvent) {
    var _this = this;

    _classCallCheck(this, AudioPlayer);

    this.audio = new Audio();
    this.context = new AudioContext();
    this.destination = this.context.destination;
    this.sourceNode = null;
    this.analyser = null;
    this.frequencyData = null;
    this.timeDomainData = null;
    this.gainNode = null;

    this.loadEvents = [];
    this.errorEvents = [];
    this.startEvent = [];
    this.stopEvents = [];
    this.pauseEvents = [];
    this.resumeEvents = [];

    this.loaded = false;

    this.audio.addEventListener("canplaythrough", function () {
      var audio = _this.audio;
      var context = _this.context;
      var destination = _this.destination;

      _this._fireEvents(_this.loadEvents);

      if (_this.sourceNode === null || _this.gainNode === null) {
        _this.sourceNode = context.createMediaElementSource(audio);
        _this.gainNode = context.createGain();

        /* Connect the source node to the gain node. */
        _this.sourceNode.connect(_this.gainNode);

        /* Connect the gain node to the destination. */
        _this.gainNode.connect(destination);
      }

      _this.loaded = true;
    });

    this.audio.addEventListener("error", function () {
      return _this._fireEvents(_this.errorEvents);
    });

    if (loadEvent) {
      this._addEvent(loadEvent, this.loadEvents);
    }

    if (errorEvent) {
      this._addEvent(errorEvent, this.errorEvents);
    }

    if (url) {
      this.load(url);
    }
  }

  _createClass(AudioPlayer, [{
    key: "_addEvent",
    value: function _addEvent(event, events) {
      var _this2 = this;

      if (typeof event === "function") {
        events.push(event);
        return function () {
          return _this2._removeEvent(event, events);
        };
      }
    }
  }, {
    key: "_removeEvent",
    value: function _removeEvent(event, events) {
      var index = events.indexOf(event);

      if (index !== -1) {
        events.splice(index, 1);
      }
    }
  }, {
    key: "_fireEvents",
    value: function _fireEvents(events) {
      for (var i = 0; i < events.length; i++) {
        events[i]();
      }
    }

    /** Bind an event handler to the load event. */

  }, {
    key: "onLoad",
    value: function onLoad(loadEvent) {
      return this._addEvent(loadEvent, this.loadEvents);
    }

    /** Unbind an event handler from the load event. */

  }, {
    key: "removeLoad",
    value: function removeLoad(loadEvent) {
      this._removeEvent(loadEvent, this.loadEvents);
    }

    /** Unbind all event handlers from the load event. */

  }, {
    key: "clearLoad",
    value: function clearLoad() {
      this.loadEvents = [];
    }

    /** Bind an event handler to the error event. */

  }, {
    key: "onError",
    value: function onError(errorEvent) {
      return this._addEvent(errorEvent, this.errorEvents);
    }

    /** Unbind an event handler from the error event. */

  }, {
    key: "removeError",
    value: function removeError(errorEvent) {
      this._removeEvent(errorEvent, this.errorEvents);
    }

    /** Unbind all event handlers from the error event. */

  }, {
    key: "clearError",
    value: function clearError() {
      this.errorEvents = [];
    }

    /** Bind an event handler to the start event. */

  }, {
    key: "onStart",
    value: function onStart(startEvent) {
      return this._addEvent(startEvent, this.startEvents);
    }

    /** Unbind an event handler from the start event. */

  }, {
    key: "removeStart",
    value: function removeStart(startEvent) {
      this._removeEvent(startEvent, this.startEvents);
    }

    /** Unbind all event handlers from the start event. */

  }, {
    key: "clearStart",
    value: function clearStart() {
      this.startEvents = [];
    }

    /** Bind an event handler to the stop event. */

  }, {
    key: "onStop",
    value: function onStop(stopEvent) {
      return this._addEvent(stopEvent, this.stopEvents);
    }

    /** Unbind an event handler from the stop event. */

  }, {
    key: "removeStop",
    value: function removeStop(stopEvent) {
      this._removeEvent(stopEvent, this.stopEvents);
    }

    /** Unbind all event handlers from the stop event. */

  }, {
    key: "clearStop",
    value: function clearStop() {
      this.stopEvents = [];
    }

    /** Bind an event handler to the pause event. */

  }, {
    key: "onPause",
    value: function onPause(pauseEvent) {
      return this._addEvent(pauseEvent, this.pauseEvents);
    }

    /** Unbind an event handler from the pause event. */

  }, {
    key: "removePause",
    value: function removePause(pauseEvent) {
      this._removeEvent(pauseEvent, this.pauseEvents);
    }

    /** Unbind all event handlers from the pause event. */

  }, {
    key: "clearPause",
    value: function clearPause() {
      this.pauseEvents = [];
    }

    /** Bind an event handler to the resume event. */

  }, {
    key: "onResume",
    value: function onResume(resumeEvent) {
      return this._addEvent(resumeEvent, this.resumeEvents);
    }

    /** Unbind an event handler from the resume event. */

  }, {
    key: "removeResume",
    value: function removeResume(resumeEvent) {
      this._removeEvent(resumeEvent, this.resumeEvents);
    }

    /** Unbind all event handlers from the resume event. */

  }, {
    key: "clearResume",
    value: function clearResume() {
      this.errorEvents = [];
    }

    /** Load a source (URL) to the audio. */

  }, {
    key: "load",
    value: function load(url) {
      this.stop();
      this.loaded = false;
      this.audio.src = url;
    }

    /** Get the duration of the audio. */

  }, {
    key: "getDuration",
    value: function getDuration() {
      return this.audio.duration;
    }

    /** Get the current time of the audio. */

  }, {
    key: "getCurrentTime",
    value: function getCurrentTime() {
      return this.audio.currentTime;
    }

    /** Get the volume of the audio. */

  }, {
    key: "getVolume",
    value: function getVolume() {
      var gainNode = this.gainNode;

      if (gainNode !== null) {
        return gainNode.gain.value;
      }
    }

    /** Set the volume of the audio. */

  }, {
    key: "setVolume",
    value: function setVolume(volume) {
      var gainNode = this.gainNode;

      if (gainNode !== null) {
        gainNode.gain.value = volume;
      }
    }

    /** Create a new source node from the audio. */

  }, {
    key: "createSource",
    value: function createSource() {
      var audio = this.audio;
      var context = this.context;

      return context.createMediaElementSource(audio);
    }

    /** Create an analyser for the audio to record frequency data. */

  }, {
    key: "setupAnalyser",
    value: function setupAnalyser() {
      if (this.analyser === null) {
        var context = this.context;
        var sourceNode = this.sourceNode;
        var gainNode = this.gainNode;
        var destination = this.destination;

        /* Create the analyser from the audio context. */
        var analyser = this.analyser = context.createAnalyser();

        /* Create an array of frequency data and time domain data for recording.
           * NOTE: frequencyBinCount tells you how many frequencies you'll receive from the analyser.
           * NOTE: fftSize tells you the size of the FFT (Fast Fourier Transform) you'll receive from the analyser.
           */
        this.frequencyData = new Uint8Array(analyser.frequencyBinCount);
        this.timeDomainData = new Uint8Array(analyser.fftSize);

        /* Disonnect all the previous connections. */
        sourceNode.disconnect();
        gainNode.disconnect();

        /* Connect the source to the analyser. */
        sourceNode.connect(analyser);

        /* Connect the analyser to the gain node. */
        analyser.connect(gainNode);

        /* Connect the gain node to the destination. */
        gainNode.connect(destination);
      }
    }

    /** Get the frequency data of the analyser previously created, otherwise null is returned. */

  }, {
    key: "getFrequencyData",
    value: function getFrequencyData() {
      var analyser = this.analyser;
      var frequencyData = this.frequencyData;

      if (analyser !== null && frequencyData !== null) {
        analyser.getByteFrequencyData(frequencyData);
        return frequencyData;
      } else {
        return null;
      }
    }

    /** Get the time domain data (waveform) of the analyser previously created, otherwise null is returned. */

  }, {
    key: "getTimeDomainData",
    value: function getTimeDomainData() {
      var analyser = this.analyser;
      var timeDomainData = this.timeDomainData;

      if (analyser !== null && timeDomainData !== null) {
        analyser.getByteTimeDomainData(timeDomainData);
        return timeDomainData;
      } else {
        return null;
      }
    }

    /** Start the audio. */

  }, {
    key: "start",
    value: function start() {
      if (this.loaded === true) {
        var audio = this.audio;

        /* If the readyState is HAVE_NOTHING, it means it's never started before.
         * So don't have to reset the current time anyway. */
        if (audio.readyState !== 0) {
          audio.currentTime = 0;
        }

        audio.play();
        this._fireEvents(this.startEvents);
      }
    }

    /** Pause the audio. */

  }, {
    key: "pause",
    value: function pause() {
      if (this.loaded === true) {
        var audio = this.audio;

        if (audio.playing !== true) {
          audio.pause();
          this._fireEvents(this.pauseEvents);
        }
      }
    }

    /** Resume the audio. */

  }, {
    key: "resume",
    value: function resume() {
      if (this.loaded === true) {
        var audio = this.audio;

        if (audio.ended === false && audio.paused === true) {
          audio.play();
          this._fireEvents(this.resumeEvents);
        }
      }
    }

    /** Stop the audio. */

  }, {
    key: "stop",
    value: function stop() {
      if (this.loaded === true) {
        var audio = this.audio;

        audio.pause();
        audio.currentTime = 0;
        this._fireEvents(this.stopEvents);
      }
    }
  }]);

  return AudioPlayer;
}();

exports.default = AudioPlayer;