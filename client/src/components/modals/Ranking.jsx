// Ranking.jsx - 이렇게 수정
import { useEffect } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { getUserListSlice } from "../../services/store/userListSlice.js";
import "./Ranking2.css";

export default function Ranking({ onClose }) {
  const userUUID = useSelector((state) => state.user.UUID);
  const userNickname = useSelector((state)=> state.user.Nickname);
  const userMaxScore = useSelector((state) => state.user.MaxScore);
  const userList = useSelector((state) => state.userList.userListForRank);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserListSlice());

    return () => {
      console.log("로또창 닫힘");
    };
  }, []);

  const getMedalEmotion = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return null;
  };

  const rankView = userList.map((e, i) => {
    if (i > 50) return;

    let medal = getMedalEmotion(i);
    const { UUID, MaxScore, Nickname } = e;

    return (
      <tr
        key={`${e.No}${new Date().toString()}`}
        className={UUID == userUUID ? "rank-mine" : ""}
      >
        <td>
          <span>{medal || i + 1}</span>
        </td>
        <td>
          <span>{Nickname || UUID}</span>
        </td>
        <td>
          <span>{MaxScore}</span>
        </td>
      </tr>
    );
  });

  const myRankView = () => {
    let rankSeq = userList.findIndex((e) => e.UUID === userUUID);
    let rankValue = null;
    if (rankSeq < 0) {
      rankValue = "???";
    } else if (0 <= rankSeq && rankSeq <= 2) {
      rankValue = getMedalEmotion(rankSeq);
    } else {
      rankValue = rankSeq + 1;
    }

    return (
      <div className="rank-me">
        <div>
          <span>
            {rankValue}
          </span>
        </div>
        <div>
          <span>{userNickname || userUUID}</span>
        </div>
        <div>
          <span>{userMaxScore}</span>
        </div>
      </div>
    );
  };

  return (
    <Modal
      isOpen={true} // 항상 열린 상태
      onClose={onClose}
      title="랭킹"
    >
      <div>
        <table className="rank-table style-clean">
          <thead>
            <tr>
              <td>순위</td>
              <td>이름</td>
              <td>점수</td>
            </tr>
          </thead>
          <tbody>{rankView}</tbody>
        </table>
      </div>
      <div>
        {myRankView()}
      </div>
    </Modal>
  );
}
