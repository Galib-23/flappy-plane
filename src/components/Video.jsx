import ml5 from 'ml5';
import { useEffect, useState } from 'react';

const Video = () => {
  const [loading, setLoading] = useState(false);
  const [classifier, setClassifier] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      setLoading(true);
      try {
        const loadedClassifier = await ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/TpLznK5aM/", () => {
          console.log("Model Loaded");
          setLoading(false);
          //Start
        });
        setClassifier(loadedClassifier);
      } catch (error) {
        console.error("Model loading failed", error);
      } finally {
        setLoading(false);
      }
    }
    loadModel();
  }, []);

  console.log(classifier)

  return (
    <div>Video</div>
  )
}

export default Video