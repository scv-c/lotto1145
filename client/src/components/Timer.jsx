import "./Timer2.css";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(0);

  // 다음 5분 단위 시간까지 남은 초를 계산하는 함수
  const calculateTimeLeft = () => {
    const now = dayjs();
    const currentMinutes = now.minute();
    const currentSeconds = now.second();

    // 현재 시간을 초 단위로 변환
    const totalCurrentSeconds = currentMinutes * 60 + currentSeconds;

    // 다음 5분 단위 시간을 초 단위로 계산
    const nextFiveMinuteMark = Math.ceil(totalCurrentSeconds / 120) * 120;

    // 남은 시간(초)
    const secondsLeft = nextFiveMinuteMark - totalCurrentSeconds;

    return secondsLeft;
  };

  useEffect(() => {
    // 초기 시간 설정
    setTimeLeft(calculateTimeLeft());

    // 1초마다 업데이트
    const interval = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      // 0에 도달하면 다음 5분 단위로 리셋
      if (newTimeLeft === 120) {
        setTimeLeft(120);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 시간을 MM:SS 형식으로 포맷
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="timer">
      <span>{formatTime(timeLeft)}</span>
    </div>
  );
}
