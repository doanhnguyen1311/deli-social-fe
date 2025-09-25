import { useState, useEffect } from "react";

type Props = {
  expired: number;
};

export default function SimpleCountdown({ expired = 300 }: Props) {
  const initialTime = expired < 300 ? expired : 300;
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    setTimeLeft(expired < 300 ? expired : 300);

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [expired]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return <span className="text-danger fw-bold">{formatTime(timeLeft)}</span>;
}
