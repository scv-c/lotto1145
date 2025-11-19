// Ranking.jsx - 이렇게 수정
import Modal from "./Modal";

export default function Ranking({ onClose }) {
  const medals = {
    gold: "🥇",
    silver: "🥈",
    bronze: "🥉",
  };

  return (
    <Modal
      isOpen={true} // 항상 열린 상태
      onClose={onClose}
      title="랭킹"
    >
      <div>
        <h3>유저 랭킹</h3>
        <ul>
          <li>{medals["gold"]}1위: 홍길동 - 1000점</li>
          <li>2위: 김철수 - 950점</li>
          <li>3위: 이영희 - 900점</li>
        </ul>
      </div>
    </Modal>
  );
}
