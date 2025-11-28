import { useSelector } from "react-redux";
import LottoCircle from "./LottoCricle";

export default function Dashboard() {
  console.log("Dashboard렌더링");
  const { No, Seq, UUID, ...lottoList } = useSelector(
    (state) => state.lotto.newLottoList
  );

  return (
    <div className="dashboard" key={No}>
      <LottoCircle lottoList={lottoList} />
    </div>
  );
}
