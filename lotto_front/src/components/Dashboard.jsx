import { useSelector } from "react-redux";
import LottoCircle from "./LottoCricle";
import SeqLotto from "./SeqLotto";

export default function Dashboard() {
  console.log("Dashboard렌더링");
  const { No, Seq, UUID, ...lottoList } = useSelector(
    (state) => state.lotto.newLottoList
  );

  return (
    <div className="dashboard">
      <div>
        <SeqLotto />
      </div>
      <LottoCircle lottoList={lottoList} />
    </div>
  );
}
