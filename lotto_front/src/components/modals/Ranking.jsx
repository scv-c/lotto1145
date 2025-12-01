// Ranking.jsx - 이렇게 수정
import { useEffect } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { getUserListSlice } from "../../services/store/userListSlice.js";
import "./Ranking.css";

export default function Ranking({ onClose }) {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList.userListForRank);

  useEffect(() => {
    dispatch(getUserListSlice());

    return () => {
      console.log("로또창 닫힘");
    };
  }, []);

  useEffect(() => {
    console.log(userList);
  }, [userList]);

  const getMedalEmotion = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return null;
  };

  const rankView = userList.map((e, i) => {
    let medal = getMedalEmotion(i);
    const { UUID, MaxScore } = e;

    return (
      <li key={`${e.No}${new Date().toString()}`}>
        <span>{medal || i + 1}</span>
        <span>{UUID}</span>
        <span>{MaxScore}</span>
      </li>
    );
  });

  return (
    <Modal
      isOpen={true} // 항상 열린 상태
      onClose={onClose}
      title="랭킹"
    >
      <div>
        <ul>
          {rankView}
        </ul>
      </div>
    </Modal>
  );
}
