import { useEffect, useState } from "react";
export default function Clock() {
  const [Time, setTime] = useState(new Date());
  useEffect(() => {
    const Timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(Timer);
  }, []);
  const formattedTime=Time.toLocaleTimeString()
  return (
    <div className="clock">
      <span>Clock</span>
      <p>{formattedTime}</p>
    </div>
  );
}
