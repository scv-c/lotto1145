import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Button from "./components/button";
import Dashboard from "./components/Dashboard";
import { v4 as uuidv4 } from "uuid";
import Top from "./components/Top";
import Footer from "./components/Footer";

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
      <Top />
      <Dashboard lottoList={lotto} />
      <Button onClick={LottoHandle} />
      <Footer history={history}/>
    </>
  );
}

export default App;
