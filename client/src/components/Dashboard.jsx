import "./Dashboard2.css";
import { useSelector } from "react-redux";
import LottoCircle from "./LottoCricle";
import DashboardUpContent from "./DashboardUpContent";

export default function Dashboard({ children }) {
  const { No, Seq, UUID, AnsCount, ...lottoList } = useSelector(
    (state) => state.lotto.newLottoList
  );

  return (
    <div className="dashboard">
      <div>
        <DashboardUpContent />
      </div>
      <div className="newLotto">
        <LottoCircle lottoList={lottoList} />
      </div>
      {children}
    </div>
  );
}
