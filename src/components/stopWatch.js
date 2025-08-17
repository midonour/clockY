import { useEffect, useState, useRef } from "react";

export default function StopWatch() {
  const [isRunning, setIsRunning] = useState(
    () => JSON.parse(localStorage.getItem("isRunning")) || false
  );
  const [stopWatch, setStopWatch] = useState(
    () => JSON.parse(localStorage.getItem("stopWatch")) || 0
  );
  const audioRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setStopWatch((prev) => prev + 1);
      }, 1);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // 🔹 Save state whenever it changes
  useEffect(() => {
    localStorage.setItem("isRunning", JSON.stringify(isRunning));
    localStorage.setItem("stopWatch", JSON.stringify(stopWatch));
  }, [isRunning, stopWatch]);

  // 🔹 Stop sound when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      else{
        runWatch();
      }
    };
  }, []);

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
  };

  const runWatch = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(
        "/Tic-Tac-Mechanical-Alarm-Clock-2-chosic.com_.mp3"
      );
    }
    audioRef.current.loop = true;
    audioRef.current.play();
    setIsRunning(true);
  };

  const closeWatch = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsRunning(false);
    setStopWatch(0);
    localStorage.removeItem("stopWatch"); // reset storage
    localStorage.removeItem("isRunning");
  };

  const pauseWatch = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsRunning(false);
  };

  return (
    <div className="count-down">
      <span>Stop Watch</span>
      <p>{formatTime(stopWatch)}</p>
      <div className="count-down-btns">
        <button onClick={runWatch}>
          <i className="fa-solid fa-play"></i>
        </button>
        <button onClick={pauseWatch}>
          <i className="fa-solid fa-pause"></i>
        </button>
        <button onClick={closeWatch}>
          <i className="fa-solid fa-stop"></i>
        </button>
      </div>
    </div>
  );
}
