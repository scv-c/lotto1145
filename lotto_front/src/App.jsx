import { useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import { v4 as uuidv4 } from "uuid";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LottoButton from "./components/LottoButton";

function App() {
  const [history, setHistory] = useState([]); // 이전 결과들 누적

  const [lotto, setLotto] = useState([]);
  const LottoHandle = () => {
    const l = new Set();
    const lottoList = [];

    //로또 번호 생성 (중복제거)
    while (l.size < 7) {
      const newNumber = 1 + Math.floor(Math.random() * 44);
      if (l.has(newNumber)) continue;

      l.add(newNumber);
    }

    //로또 id값 생성(react list key에러 대응)
    l.forEach((v) => {
      lottoList.push({
        id: uuidv4(),
        number: v,
      });
    });
    
    setLotto(lottoList);
    setHistory([lottoList,...history]);
  };

  return (
    <>
      <Header />
      <Dashboard lottoList={lotto} />
      <LottoButton onClick={LottoHandle} />
      <Footer history={history}/>
    </>
  );
}

export default App;
