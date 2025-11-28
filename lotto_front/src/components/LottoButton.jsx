import { useDispatch } from "react-redux";
import {
  setHistoryLottoList,
  setNewLottoList,
} from "../services/store/lottoSlice.js";
import { getNewLotto } from "../services/api/lotto.js";
import { useRef } from "react";

export default function LottoButton({ onClick }) {
  const buttonCreateLottoRef = useRef(false);
  const dispatch = useDispatch();

  const buttonHandler = async () => {
    if (buttonCreateLottoRef.current) {
      return Promise.reject("불가");
    }
    buttonCreateLottoRef.current = true;

    return await getNewLotto()
      .then((res) => {
        dispatch(setNewLottoList(res.data));
        dispatch(setHistoryLottoList([res.data])); // setHistoryLottoList는 인자를 배열로 받고 있기에 한 번 감싸주기.
      })
      .then(() => {
        //세션당 여러번 반복 입력을 막기 위해 5초정도 타이머를 둠.
        setTimeout(() => {
          buttonCreateLottoRef.current = false;
        }, 5000);
      });
  };

  console.log(`button 동작`);
  return <button onClick={buttonHandler}>로또 생성기</button>;
}
