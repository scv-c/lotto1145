import { useEffect, useRef, useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LottoButton from "./components/LottoButton";
import { useDispatch } from "react-redux";
import { setUUID } from "./services/store/uuidSlice";
import { setHistoryLottoList } from "./services/store/lottoSlice.js";
import { loadUser } from "./services/storage/userStorage.js";
import { initUser } from "./services/api/user.js";
import { getUserLottoList } from "./services/api/lotto.js";
import socket from "./services/api/socket.js";

function App() {
  const [history, setHistory] = useState([]); // 이전 결과들 누적
  const [lotto, setLotto] = useState([]);
  const initRef = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (initRef.current) return;
    console.log("진행~");
    initRef.current = true;
    const myUUID = loadUser();
    const result = initUser(myUUID)
      .then((res) => {
        dispatch(setUUID(myUUID));
        console.log("zz");
      })
      .then(getUserLottoList)
      .then((res) => {
        const myHistoryLottoList = res.data;
        dispatch(setHistoryLottoList(myHistoryLottoList));
        initRef.current=false;
      });
  }, []);

  useEffect(()=>{
    socket.on('welcome', data => {
      console.log("연결함. ", data);
    })
  },[]);
  return (
    <>
      <Header />
      <Dashboard />
      <LottoButton />
      <Footer />
    </>
  );
}

export default App;
