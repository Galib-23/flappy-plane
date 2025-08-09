import { useEffect, useRef, useState } from "react"

const Video = ({ isVideoOn, setIsVideoOn, setFist }) => {
  const videoRef = useRef(null);
  const [classifier, setClassifier] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isVidStarted, setIsVidStarted] = useState(false);

  useEffect(() => {
    const loadModel = async () => {
      setLoading(true);
      try {
        const loadedClassifier = await window.ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/TpLznK5aM/model.json", () => {
          console.log("Model Loaded");
          if (isVideoOn) {
            startVideo();
          }
        });
        setLoading(false);
        setClassifier(loadedClassifier);
      } catch (error) {
        console.error("Model Loading failed", error);
        setLoading(false);
      }
    }
    loadModel();
  }, [isVidStarted, isVideoOn]);

  useEffect(() => {
    if (isVideoOn) {
      startVideo();
    } else {
      stopVideo();
    }
  }, [isVideoOn]);

  const startVideo = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            setIsVidStarted(true);
            classifyGesture();
          }
        }
      }).catch((error) => {
        console.error("Error accessing the camera", error);
      })
    }
  }

  const stopVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  }

  const classifyGesture = () => {
    if (classifier && videoRef.current) {
      classifier.classify(videoRef.current, (results, error) => {
        if (error) {
          console.error("Classification Error", error);
          return;
        }
        setResult(results);
        if (results[0].label === "fist") {
          setFist(true);
        } else {
          setFist(false);
        }
        setTimeout(() => classifyGesture(), 30);
      })
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center mt-10 gap-4">
      <h2 className="text-2xl font-semibold">🖐 For up ✊ For down</h2>
      <div className="relative">
        <video ref={videoRef} width={500} height={480} className="border-2 border-cyan-600 rounded-xl" autoPlay muted></video>
        <div className="absolute h-24 w-48 border-[3px] border-green-400 top-4 left-4 p-1">
          {
            loading && !result ? (
              <h2 className="text-lg font-semibold text-green-500">Please Wait. <br /> Loading....</h2>
            ) : result? (
              <>
                <h1 className="text-sm font-semibold text-green-500">Gesture: {result[0].label}</h1>
                <h1 className="text-sm font-semibold text-green-500">Confidence: {result[0].confidence.toFixed(2)}</h1>
                <h1 className="text-sm font-semibold text-red-500">Gesture: {result[1].label}</h1>
                <h1 className="text-sm font-semibold text-red-500">Confidence: {result[1].confidence.toFixed(2)}</h1>
              </>
            ) : <></>
          }
        </div>
      </div>
      {
        isVideoOn && (
          <button onClick={() => {
            setIsVideoOn(false);
            stopVideo();
          }} className="mt-4 px-3 py-2 outline-rose-500 hover:bg-rose-600 text-rose-500 hover:text-white rounded-lg shadow-md outline">
            Close Gesture Control
          </button>
        )
      }
    </div>
  )
}

export default Video