import "./LottoButton.css";
import { useDispatch } from "react-redux";
import {
  setHistoryLottoList,
  setNewLottoList,
} from "../services/store/lottoSlice.js";
import { getNewLotto } from "../services/api/lotto.js";
import { useRef, useState } from "react";

export default function LottoButton({ onClick }) {
  const [btnState, setBtnState] = useState(false);
  const [btnTimer, setBtnTimer] = useState(null);
  const buttonCreateLottoRef = useRef(false);
  const dispatch = useDispatch();

  const buttonHandler = async () => {
    if (buttonCreateLottoRef.current) {
      return Promise.reject("불가");
    }
    buttonCreateLottoRef.current = true;
    setBtnState(true);

    return await getNewLotto()
      .then((res) => {
        dispatch(setNewLottoList(res.data));
        dispatch(setHistoryLottoList([res.data])); // setHistoryLottoList는 인자를 배열로 받고 있기에 한 번 감싸주기.
      })
      .then(() => {
        let count = 5;
        setBtnTimer(count);

        // 1초마다 업데이트
        const interval = setInterval(() => {
          if (!setBtnState) return;
          count--;
          setBtnTimer(count);

          // 5초 후 자동으로 interval 종료
          if (count == 0) {
            clearInterval(interval);
          }
        }, 1000);
      })
      .finally(() => {
        //세션당 여러번 반복 입력을 막기 위해 5초정도 타이머를 둠.
        setTimeout(() => {
          buttonCreateLottoRef.current = false;
          setBtnState(null);
        }, 5000);
      });
  };

  return (
    <div className="dashboard-btn-layer">
      <button className="create-button" onClick={buttonHandler}>
        <div className={`spinner ${btnState ? "btn-waiting" : ""}`}>
          <span className="timer-text">{btnTimer}</span>
        </div>
        <span className="text">로또 생성기</span>
      </button>
    </div>
  );
}
