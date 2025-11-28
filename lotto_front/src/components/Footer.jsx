import { useEffect, useRef } from "react";
import LottoCircle from "./LottoCricle";
import { useSelector } from "react-redux";

export default function Footer() {
  const historyLottoList = useSelector((state) => state.lotto.historyLottoList);
  const scrollRef = useRef(null);
  /**
   * History View 마우스드래그 이벤트 추가 useEffect
   */
  useEffect(() => {
    const el = scrollRef.current;
    let isDown = false;
    let startY;
    let scrollTop;

    const mouseDown = (e) => {
      isDown = true;
      el.classList.add("active");
      startY = e.pageY - el.offsetTop;
      scrollTop = el.scrollTop;
    };

    const mouseLeave = () => {
      isDown = false;
      el.classList.remove("active");
    };

    const mouseUp = () => {
      isDown = false;
      el.classList.remove("active");
    };

    const mouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const y = e.pageY - el.offsetTop;
      const walk = (y - startY) * 0.7; // 드래그 속도
      el.scrollTop = scrollTop - walk;
    };

    el.addEventListener("mousedown", mouseDown);
    el.addEventListener("mouseleave", mouseLeave);
    el.addEventListener("mouseup", mouseUp);
    el.addEventListener("mousemove", mouseMove);

    return () => {
      el.removeEventListener("mousedown", mouseDown);
      el.removeEventListener("mouseleave", mouseLeave);
      el.removeEventListener("mouseup", mouseUp);
      el.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const historyView = historyLottoList.map((e, i) => {
    const { No, Seq, UUID, ...lottoList } = e;
    return (
      <div className="history-item" key={No}>
        <span>{Seq}</span>
        <LottoCircle lottoList={lottoList} />
      </div>
    );
  });

  return (
    <div ref={scrollRef} className="history-view">
      {historyView}
    </div>
  );
}
