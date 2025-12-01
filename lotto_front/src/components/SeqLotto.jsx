import { useSelector } from "react-redux";
import LottoCircle from "./LottoCricle";

export default function SeqLotto() {
  const seq = useSelector((state) => state.seqLotto.seq);
  const seqLottoList = useSelector((state) => state.seqLotto.seqLottoList);

  return (
    <div>
      <div>{seq}</div>
      <LottoCircle lottoList={seqLottoList} />
    </div>
  );
}
