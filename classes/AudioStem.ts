const MAX_GAIN = 1.0;
const MIN_GAIN = 0.0001;
const FADE_TIME_SECONDS = 1;

interface AudioStemParams {
  audioContext: AudioContext;
  audio: HTMLAudioElement;
  name: string;
  trackId: string;
}

export default class AudioStem {
  trackId: string;
  name: string;
  audioElement: HTMLAudioElement;
  audioContext: AudioContext;
  audioNode: MediaElementAudioSourceNode;
  gainNode: GainNode;

  constructor({ audioContext, audio, name, trackId }: AudioStemParams) {
    this.name = name;
    this.trackId = trackId;
    this.audioContext = audioContext;
    this.audioElement = audio;
    this.audioNode = audioContext.createMediaElementSource(audio);
    this.gainNode = new GainNode(audioContext);
    this.gainNode.gain.setValueAtTime(0, audioContext.currentTime);

    this.audioElement.loop = true;
    this.audioNode.connect(this.gainNode).connect(audioContext.destination);
  }

  play() {
    if (this.isPlaying()) {
      return;
    }
    console.log("* playing ", this.name);
    const now = this.audioContext.currentTime;

    this.gainNode.gain.value = MIN_GAIN;
    this.gainNode.gain.exponentialRampToValueAtTime(
      MAX_GAIN,
      now + FADE_TIME_SECONDS
    );
    this.audioElement.play();
  }

  pause() {
    if (!this.isPlaying()) {
      return;
    }
    console.log("- pausing ", this.name);

    const now = this.audioContext.currentTime;

    this.gainNode.gain.setValueAtTime(MAX_GAIN, now);
    this.gainNode.gain.exponentialRampToValueAtTime(
      MIN_GAIN,
      now + FADE_TIME_SECONDS
    );

    this.audioElement.pause();

    // setTimeout(() => {
    //   this.audioElement.pause();
    // }, FADE_TIME_SECONDS * 1000);
  }

  isPlaying() {
    return !this.audioElement.paused;
  }
}
