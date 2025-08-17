// import { useEffect, useState, useRef } from "react";

// export default function Alarm() {
//   const [time, setTime] = useState(new Date());
//   const [alarmTime, setAlarmTime] = useState("");
//   const [alarmSet, setAlarmSet] = useState(false);
//   const audioRef = useRef(null);
//   useEffect(() => {
//     const timerId = setInterval(() => {
//       setTime(new Date());
//     }, 1000);

//     return () => clearInterval(timerId);
//   }, []);

//   useEffect(() => {
//     if (alarmSet && time.toLocaleTimeString() === alarmTime) {
//       playAlarm();
//     }
//   }, [time, alarmTime, alarmSet]);

//   const setAlarm = (e) => {
//     e.preventDefault();
//     const alarm = `${e.target.hours.value}:${e.target.minutes.value}:00 ${e.target.period.value}`;
//     setAlarmTime(alarm);
//     setAlarmSet(true);
//     alert(`you sat alarm on ${alarm} clock`);
//   };

//   const playAlarm = () => {
//     if (!audioRef.current) {
//       audioRef.current = new Audio("/Alarm-Clock-Short-chosic.com_.mp3");
//     }
//     audioRef.current.loop = true;
//     audioRef.current.play();
//     setAlarmSet(false);
//   };

//   const snoozeAlarm = () => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//       audioRef.current.currentTime = 0;
//     }
//     const next = new Date(time.getTime() + 1 * 60000); // +5 min
//     let hours = next.getHours() % 12 || 12;
//     let minutes = next.getMinutes().toString().padStart(2, "0");
//     let period = next.getHours() >= 12 ? "PM" : "AM";
//     const snoozeTime = `${hours}:${minutes}:00 ${period}`;
//     setAlarmTime(snoozeTime);
//     setAlarmSet(true);
//     alert("Snoozed until", snoozeTime);
//   };
//   const stopAlarm = () => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//       audioRef.current.currentTime = 0;
//     }
//     setAlarmSet(false);
//     alert("Alarm stopped");
//   };
//   return (
//     <div className="alarm">
//       <span>Alarm</span>
//       {/* <p>{time.toLocaleTimeString()}</p> */}

//       <form onSubmit={setAlarm} className="alarm-form">
//         <input
//           type="number"
//           name="hours"
//           placeholder="HH"
//           min="1"
//           max="12"
//           required
//         />
//         <input
//           type="number"
//           name="minutes"
//           placeholder="MM"
//           min="0"
//           max="59"
//           required
//         />
//         <select name="period">
//           <option value="AM">AM</option>
//           <option value="PM">PM</option>
//         </select>
//         <button type="submit" className="set-btn">
//           Set
//         </button>
//       </form>
//       <div className="alarm-btns">
//         <button className="stopBtn" onClick={stopAlarm}>
//           <i className="fa-solid fa-stop"></i>
//         </button>
//         <button className="snoozeBtn" onClick={snoozeAlarm}>
//           <i className="fi fi-rs-alarm-snooze"></i>
//         </button>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState, useRef } from "react";

export default function Alarm() {
  const [time, setTime] = useState(new Date());
  const [alarmTime, setAlarmTime] = useState(
    localStorage.getItem("alarmTime") || ""
  );
  const [alarmSet, setAlarmSet] = useState(
    localStorage.getItem("alarmSet") === "true"
  );
  const audioRef = useRef(null);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (alarmSet && time.toLocaleTimeString() === alarmTime) {
      playAlarm();
    }
  }, [time, alarmTime, alarmSet]);

  const setAlarm = (e) => {
    e.preventDefault();
    const alarm = `${e.target.hours.value}:${e.target.minutes.value}:00 ${e.target.period.value}`;
    setAlarmTime(alarm);
    setAlarmSet(true);
    localStorage.setItem("alarmTime", alarm);
    localStorage.setItem("alarmSet", "true");
    console.log("alarm setted");
  };

  const playAlarm = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/Alarm-Clock-Short-chosic.com_.mp3");
    }
    audioRef.current.loop = true;
    audioRef.current.play();
    console.log("ringggg");
    setAlarmSet(false);
    localStorage.setItem("alarmSet", "false");
  };

  const stopAlarm = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setAlarmSet(false);
    localStorage.setItem("alarmSet", "false");
    console.log("Alarm stopped");
  };

  const snoozeAlarm = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    const next = new Date(time.getTime() + 5 * 60000); // +5 min
    let hours = next.getHours() % 12 || 12;
    let minutes = next.getMinutes().toString().padStart(2, "0");
    let period = next.getHours() >= 12 ? "PM" : "AM";
    const snoozeTime = `${hours}:${minutes}:00 ${period}`;
    setAlarmTime(snoozeTime);
    setAlarmSet(true);
    localStorage.setItem("alarmTime", snoozeTime);
    localStorage.setItem("alarmSet", "true");
    console.log("Snoozed until", snoozeTime);
  };

  return (
    <div className="alarm">
      <span>Alarm</span>
      <p>{time.toLocaleTimeString()}</p>

      <form onSubmit={setAlarm} className="alarm-form">
        <input
          type="number"
          name="hours"
          placeholder="HH"
          min="1"
          max="12"
          required
        />
        <input
          type="number"
          name="minutes"
          placeholder="MM"
          min="0"
          max="59"
          required
        />
        <select name="period">
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
        <button type="submit" className="set-btn">
          Set
        </button>
      </form>

      <div className="alarm-btns">
        <button className="stopBtn" onClick={stopAlarm}>
          <i className="fa-solid fa-stop"></i>
        </button>
        <button className="snoozeBtn" onClick={snoozeAlarm}>
          <i className="fi fi-rs-alarm-snooze"></i>
        </button>
      </div>
    </div>
  );
}
