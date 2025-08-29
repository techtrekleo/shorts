export interface MediaFile {
  file: File;
  url: string;
  duration?: number;
  name: string;
  size: number;
  type: string;
}

export interface VideoSettings {
  loopCount: number;
  startTime: number;
  endTime: number;
}

export interface AudioSettings {
  startTime: number;
  endTime: number;
  volume: number;
  fadeIn: number;
  fadeOut: number;
}

export interface ShortsConfig {
  video: VideoSettings;
  audio: AudioSettings;
  outputDuration: number;
  quality: 'low' | 'medium' | 'high';
}
