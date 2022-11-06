import { useState, useEffect } from 'react';

export default function useIsAudioActive({
  source,
  fftSize = 1024,
}: UseIsAudioActive) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (!source) return;

    const audioContext = new AudioContext();
    const analyser = new AnalyserNode(audioContext, { fftSize });

    const audioSource = audioContext.createMediaStreamSource(source);
    // * connect your source to output (usually laptop's mic)
    audioSource.connect(analyser);

    // * buffer length gives us how many different frequencies we are going to be measuring
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    update();

    function update() {
      analyser.getByteTimeDomainData(dataArray);

      const sum = dataArray.reduce((a, b) => a + b, 0);

      if (sum / dataArray.length / 128.0 >= 1) {
        setIsSpeaking(true);
        setTimeout(() => setIsSpeaking(false), 1000);
      }

      requestAnimationFrame(update);
    }

    return () => {
      setIsSpeaking(false);
    };
  }, [source]);

  return isSpeaking;
}

type UseIsAudioActive = {
  source: MediaStream | null;
  fftSize?: FftSize;
};

type FftSize =
  | 32
  | 64
  | 128
  | 256
  | 512
  | 1024
  | 2048
  | 4096
  | 8192
  | 16384
  | 32768;
