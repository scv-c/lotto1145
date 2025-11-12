import LottoCircle from "./LottoCricle";

export default function Dashboard({ lottoList }) {
  return (
    <div className="dashboard">      
        <LottoCircle lottoList={lottoList} />            
    </div>
  );
}
