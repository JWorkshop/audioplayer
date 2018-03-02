const Audio = window.Audio;
const AudioContext = window.AudioContext || window.webkitAudioContext;
const Uint8Array = window.Uint8Array;

class AudioPlayer {
  constructor(url, loadEvent, errorEvent) {
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

    this.audio.addEventListener("canplaythrough", () => {
      let audio = this.audio;
      let context = this.context;
      let destination = this.destination;

      this._fireEvents(this.loadEvents);

      if (this.sourceNode === null || this.gainNode === null) {
        this.sourceNode = context.createMediaElementSource(audio);
        this.gainNode = context.createGain();

        /* Connect the source node to the gain node. */
        this.sourceNode.connect(this.gainNode);

        /* Connect the gain node to the destination. */
        this.gainNode.connect(destination);
      }

      this.loaded = true;
    });

    this.audio.addEventListener("error", () =>
      this._fireEvents(this.errorEvents)
    );

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

  _addEvent(event, events) {
    if (typeof event === "function") {
      events.push(event);
      return () => this._removeEvent(event, events);
    }
  }

  _removeEvent(event, events) {
    let index = events.indexOf(event);

    if (index !== -1) {
      events.splice(index, 1);
    }
  }

  _fireEvents(events) {
    for (let i = 0; i < events.length; i++) {
      events[i]();
    }
  }

  /** Bind an event handler to the load event. */
  onLoad(loadEvent) {
    return this._addEvent(loadEvent, this.loadEvents);
  }

  /** Unbind an event handler from the load event. */
  removeLoad(loadEvent) {
    this._removeEvent(loadEvent, this.loadEvents);
  }

  /** Unbind all event handlers from the load event. */
  clearLoad() {
    this.loadEvents = [];
  }

  /** Bind an event handler to the error event. */
  onError(errorEvent) {
    return this._addEvent(errorEvent, this.errorEvents);
  }

  /** Unbind an event handler from the error event. */
  removeError(errorEvent) {
    this._removeEvent(errorEvent, this.errorEvents);
  }

  /** Unbind all event handlers from the error event. */
  clearError() {
    this.errorEvents = [];
  }

  /** Bind an event handler to the start event. */
  onStart(startEvent) {
    return this._addEvent(startEvent, this.startEvents);
  }

  /** Unbind an event handler from the start event. */
  removeStart(startEvent) {
    this._removeEvent(startEvent, this.startEvents);
  }

  /** Unbind all event handlers from the start event. */
  clearStart() {
    this.startEvents = [];
  }

  /** Bind an event handler to the stop event. */
  onStop(stopEvent) {
    return this._addEvent(stopEvent, this.stopEvents);
  }

  /** Unbind an event handler from the stop event. */
  removeStop(stopEvent) {
    this._removeEvent(stopEvent, this.stopEvents);
  }

  /** Unbind all event handlers from the stop event. */
  clearStop() {
    this.stopEvents = [];
  }

  /** Bind an event handler to the pause event. */
  onPause(pauseEvent) {
    return this._addEvent(pauseEvent, this.pauseEvents);
  }

  /** Unbind an event handler from the pause event. */
  removePause(pauseEvent) {
    this._removeEvent(pauseEvent, this.pauseEvents);
  }

  /** Unbind all event handlers from the pause event. */
  clearPause() {
    this.pauseEvents = [];
  }

  /** Bind an event handler to the resume event. */
  onResume(resumeEvent) {
    return this._addEvent(resumeEvent, this.resumeEvents);
  }

  /** Unbind an event handler from the resume event. */
  removeResume(resumeEvent) {
    this._removeEvent(resumeEvent, this.resumeEvents);
  }

  /** Unbind all event handlers from the resume event. */
  clearResume() {
    this.errorEvents = [];
  }

  /** Load a source (URL) to the audio. */
  load(url) {
    this.stop();
    this.loaded = false;
    this.audio.src = url;
  }

  /** Get the duration of the audio. */
  getDuration() {
    return this.audio.duration;
  }

  /** Get the current time of the audio. */
  getCurrentTime() {
    return this.audio.currentTime;
  }

  /** Get the volume of the audio. */
  getVolume() {
    let gainNode = this.gainNode;

    if (gainNode !== null) {
      return gainNode.gain.value;
    }
  }

  /** Set the volume of the audio. */
  setVolume(volume) {
    let gainNode = this.gainNode;

    if (gainNode !== null) {
      gainNode.gain.value = volume;
    }
  }

  /** Create a new source node from the audio. */
  createSource() {
    let audio = this.audio;
    let context = this.context;

    return context.createMediaElementSource(audio);
  }

  /** Create an analyser for the audio to record frequency data. */
  setupAnalyser() {
    if (this.analyser === null) {
      let context = this.context;
      let sourceNode = this.sourceNode;
      let gainNode = this.gainNode;
      let destination = this.destination;

      /* Create the analyser from the audio context. */
      let analyser = (this.analyser = context.createAnalyser());

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
  getFrequencyData() {
    let analyser = this.analyser;
    let frequencyData = this.frequencyData;

    if (analyser !== null && frequencyData !== null) {
      analyser.getByteFrequencyData(frequencyData);
      return frequencyData;
    } else {
      return null;
    }
  }

  /** Get the time domain data (waveform) of the analyser previously created, otherwise null is returned. */
  getTimeDomainData() {
    let analyser = this.analyser;
    let timeDomainData = this.timeDomainData;

    if (analyser !== null && timeDomainData !== null) {
      analyser.getByteTimeDomainData(timeDomainData);
      return timeDomainData;
    } else {
      return null;
    }
  }

  /** Start the audio. */
  start() {
    if (this.loaded === true) {
      let audio = this.audio;

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
  pause() {
    if (this.loaded === true) {
      let audio = this.audio;

      if (audio.playing !== true) {
        audio.pause();
        this._fireEvents(this.pauseEvents);
      }
    }
  }

  /** Resume the audio. */
  resume() {
    if (this.loaded === true) {
      let audio = this.audio;

      if (audio.ended === false && audio.paused === true) {
        audio.play();
        this._fireEvents(this.resumeEvents);
      }
    }
  }

  /** Stop the audio. */
  stop() {
    if (this.loaded === true) {
      let audio = this.audio;

      audio.pause();
      audio.currentTime = 0;
      this._fireEvents(this.stopEvents);
    }
  }
}

export default AudioPlayer;
