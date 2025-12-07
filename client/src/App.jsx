import { useEffect, useRef } from "react";
import "./App2.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LottoButton from "./components/LottoButton";
import { useDispatch } from "react-redux";
import { getUserSlice, setUUID } from "./services/store/userSlice.js";
import { setHistoryLottoList } from "./services/store/lottoSlice.js";
import { loadUser } from "./services/storage/userStorage.js";
import { initUser } from "./services/api/user.js";
import { getUserLottoList } from "./services/api/lotto.js";
import socket from "./services/api/socket.js";
import { setSeqLottoInfo } from "./services/store/seqLottoSlice.js";
import { ToastContainer, Zoom } from "react-toastify";
import useToast from "./services/hooks/useToast.js";

function App() {
  const initRef = useRef(false);
  const { showToast } = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    const myUUID = loadUser();

    const initFlow = async (uuid) => {
      try {
        await initUser(uuid); //
        const res = await dispatch(getUserSlice());
        if (res.error) {
          console.log("getUserSlice 실패, UUID 세팅");
          dispatch(setUUID(uuid));
          return;
        }

        try {
          const lottoList = await getUserLottoList();
          dispatch(setHistoryLottoList(lottoList.data));
        } catch (err) {
          console.log("getUserLottoList 실패, 무시:", err);
        }
      } catch (err) {
        console.log("initUser 자체 실패:", err);
      } finally {
        initRef.current = false; // 항상 마지막 처리
      }
    };

    initFlow(myUUID);
  }, []);

  useEffect(() => {
    socket.on("updateNewSeq", (data) => {
      dispatch(setSeqLottoInfo(data));
    });

    socket.on("curSeqHighScoreUser", (data) => {
      if (data.length === 0) return;
      const score = data[0].AnsCount;
      const userList = data.map((e) => e.UUID);

      showToast(
        "default",
        `🎉이번 최고득점 ${score}점🎉 ${userList.join("님, ")}님`
      );
    });
  }, []);
  return (
    <>
      <Header />
      <Dashboard>
        <LottoButton />
      </Dashboard>
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={1000}
        limit={3}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />
    </>
  );
}

export default App;
