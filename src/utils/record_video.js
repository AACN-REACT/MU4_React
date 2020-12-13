export function recordVideo(
  setError,
  setVideoStream,
  videoStream,
  setRecorder
) {
  const VideoSettings = {
    video: true,
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      sampleRate: 44100,
    },
  };
  const CaptureSettings = { cursor: "always", logicalSurface: true };

  if ("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices) {
    navigator.mediaDevices
      .getUserMedia(settings)
      .then((stream) => {
        setVideoStream(stream);
        console.log("STREAM", stream);
        return stream;
      })
      .then((stream) => {
        setRecorder(
          new MediaRecorder(stream, {
            audioBitsPerSecond: 128000,
            videoBitsPerSecond: 2500000,
            mimeType: "video/webm; codecs=vp9",
          })
        );
      })
      .catch((err) => {
        setError ? setError(`${err}`) : alert("no camera");
      });
  } else {
    setError ? setError("No camera devices") : alert("no camera");
  }
}
