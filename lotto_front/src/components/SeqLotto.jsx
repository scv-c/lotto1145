import "./SeqLotto.css";
import { useSelector } from "react-redux";
import LottoCircle from "./LottoCricle";

export default function SeqLotto() {
  const no = useSelector((state) => state.seqLotto.No);
  const seq = useSelector((state) => state.seqLotto.Seq);

  const seqLottoList = useSelector((state) => state.seqLotto.seqLottoList);

  return (
    <div className="seqLotto">
      <div className="seq">{no && no + "회차"}</div>
      <LottoCircle lottoList={seqLottoList} />
    </div>
  );
}
