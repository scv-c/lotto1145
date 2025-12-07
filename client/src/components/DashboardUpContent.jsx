import "./DashboardUpContent.css";
import { useSelector } from "react-redux";
import LottoCircle from "./LottoCricle";
import Timer from "./Timer";
import dayjs from "dayjs";

export default function SeqLotto() {
  const no = useSelector((state) => state.seqLotto.No);
  const seq = useSelector((state) => state.seqLotto.Seq);

  const beforeSeq = (seq) =>
    dayjs(seq).subtract(2, "m").format("YYYY-MM-DD HH:mm");
  const seqLottoList = useSelector((state) => state.seqLotto.seqLottoList);

  return (
    <>
      <div className="up-content">
        <div className="top-layer">
          <div className="status-badge">다음 회차까지 남은 시간</div>
          <Timer />
        </div>

        <div className="center-layer">
          {seq ? (
            <>
              <div className="seq">{no && no + "회차"}</div>
              <div>
                <span>{beforeSeq(seq)}</span>~<span>{seq}</span>
              </div>
              <LottoCircle lottoList={seqLottoList} />
            </>
          ) : (
            <div className="message">다음 결과 발표 대기중</div>
          )}
        </div>
      </div>
    </>
  );

  /**
   * <div className="nav-btn nav-left">&lt;</div>
   * <div className="nav-btn nav-right">&gt;</div>
   */
}
