import "./Dashboard.css";
import { useSelector } from "react-redux";
import LottoCircle from "./LottoCricle";
import SeqLotto from "./SeqLotto";

export default function Dashboard({ children }) {
  console.log("Dashboard렌더링");
  const { No, Seq, UUID, ...lottoList } = useSelector(
    (state) => state.lotto.newLottoList
  );

  return (
    <div className="dashboard">
      <div>
        <SeqLotto />
      </div>
      <div className="newLotto">
        <LottoCircle lottoList={lottoList} />
      </div>
      <div>{children}</div>
    </div>
  );
}
