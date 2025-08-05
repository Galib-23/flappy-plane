import cityImg from "./assets/city.jpg";
import building from "./assets/building.png";
import plane from "./assets/plane.png";
import boom from "./assets/boom.png";
import { useEffect, useState } from "react";

const App = () => {
  const [score, setScore] = useState(0);
  const [planePosFromTop, setPlanePosFromTop] = useState(175);
  const [buildingPos, setBuildingPos] = useState(0);
  const [isOver, setIsOver] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  // animate plane
  useEffect(() => {
    let animatePlaneId;
    const animatePlane = () => {
      setPlanePosFromTop((prevPos) => {
        if (prevPos <= 380) {
          return prevPos + 0.4;
        } else {
          return prevPos;
        }
      });
      animatePlaneId = requestAnimationFrame(animatePlane);
    }
    if (isStarted) {
      animatePlaneId = requestAnimationFrame(animatePlane);
    }
    return () => cancelAnimationFrame(animatePlaneId);
  }, [isStarted]);

  // animate building
  useEffect(() => {
    let animationFrameId;
    const animateBuilding = () => {
      setBuildingPos((prevPos) => {
        if (prevPos <= 500) {
          return prevPos + 1;
        } else {
          return 0;
        }
      });
      animationFrameId = requestAnimationFrame(animateBuilding);
    }
    if (isStarted && !isOver) {
      animationFrameId = requestAnimationFrame(animateBuilding);
    }
    return () => cancelAnimationFrame(animationFrameId);
  }, [isOver, isStarted]);

  useEffect(() => {
    if (planePosFromTop >= 380 || planePosFromTop < 10 || (planePosFromTop < 150 && buildingPos > 375) || (planePosFromTop > 265 && buildingPos > 375)) {
      setIsOver(true);
      setIsStarted(false);
    }
  }, [buildingPos, planePosFromTop]);

  const handleSpacePress = (event) => {
    if (event.key === " ") {
      event.preventDefault();
      setPlanePosFromTop((prevPos) => {
        if (prevPos > 10) {
          return prevPos - 20;
        }
      })
    }
  }

  useEffect(() => {
    if (isStarted && !isOver) {
      window.addEventListener("keydown", handleSpacePress);
    }

    return () => {
      window.removeEventListener("keydown", handleSpacePress);
    }
  }, [isOver, isStarted]);

  useEffect(() => {
    if (isStarted && buildingPos == 500) {
      setScore((prevScore) =>  prevScore + 1);
    }
  }, [buildingPos, isStarted])

  return (
    <div className="min-h-screen flex flex-col items-center">
      <p className="text-base mb-2 mt-6">
        Press <span className="font-bold">Space</span> to control the game.
      </p>
      <div
        className="object-contain relative border-2 border-cyan-600 rounded-sm shadow-md mt-6"
        style={{
          backgroundImage: `url(${cityImg})`,
          backgroundRepeat: "no-repeat",
          height: "400px",
          width: "600px",
          backgroundSize: "cover"
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        {
          isOver && (
            <div className="absolute h-full w-full flex flex-col items-center justify-center z-50"
              style={{
                backgroundImage: `url(${boom})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                left: "35px"
              }}
            >
              <h1 className="text-4xl font-bold">9-1-1 It's an emergency!!</h1>
              <p className="text-lg text-teal-500 font-semibold">Your Score: {score}</p>
            </div>
          )
        }
        <h2 className="left-3 top-3 absolute text-cyan-800 text-xl z-40 font-semibold bg-blue-200 p-1 rounded-lg">Score: {score}</h2>
        <img src={plane} alt="plane" className="z-10 absolute h-10 w-20 left-20 transition-transform duration-150 ease-out" style={{
          transform: `translateY(${planePosFromTop}px)`
        }} />
        <div>
          <img src={building} alt="building" className="w-24 h-40 absolute bottom-0" style={{
            right: `${buildingPos}px`
          }} />
          <img src={building} alt="building" className="w-24 h-40 absolute transform -scale-y-100" style={{
            right: `${buildingPos}px`
          }} />
        </div>
      </div>
      <div className="flex gap-6 mt-4">
        {
          !isStarted && !isOver && (
            <button className="px-3 py-2 text-teal-400 outline-teal-400 hover:bg-teal-400 hover:text-white rounded-lg shadow-lg outline" onClick={() => setIsStarted(true)}>
              Start Game
            </button>
          )
        }
        {
          isOver && (
            <button className="px-3 py-2 text-teal-400 outline-teal-400 hover:bg-teal-400 hover:text-white rounded-lg shadow-lg outline" onClick={() => {
              setBuildingPos(0);
              setPlanePosFromTop(175);
              setIsOver(false);
              setIsStarted(false);
              setScore(0);
            }}>Reset</button>
          )
        }
      </div>
    </div>
  )
}

export default App