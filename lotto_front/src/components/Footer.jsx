import LottoCircle from "./LottoCricle";

export default function Footer({history}) {    
    const historyView = history.map((e,i)=>{
        return (
            <div className="history-item">
                <span>No.{i}</span>
                <LottoCircle lottoList={e}/>            
            </div>
        )        
    });

    return (        
        <div className="history-view">
            {historyView}
        </div>
    )
}