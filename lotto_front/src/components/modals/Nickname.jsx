// Ranking.jsx - 이렇게 수정
import Modal from "./Modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import "./Nickname.css";
import { useEffect, useRef, useState } from "react";

export default function Nickname({ onClose }) {
  const [nickname, setNickname] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleKeyDown = (e) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
      "Enter",
    ];

    console.log("dpd?")
    // 길이가 7 이상이고 + 허용된 키가 아니면 -> 툴팁 발사
    if (nickname.length >= 7 && !allowedKeys.includes(e.key)) {
      setShowTooltip(true);

      setTimeout(() => {
        setShowTooltip(false);
      }, 1500);
    }
  };

  return (
    <Modal
      isOpen={true} // 항상 열린 상태
      onClose={onClose}
      title="닉네임 변경"
    >
      <div className="input-wrapper">
        <span className="input-icon">✏️</span>

        <input
          ref={inputRef}
          type="text"
          id="nickInput"
          className="custom-input"
          placeholder="새 닉네임 (최대 7자)"
          maxLength="7"
          onChange={handleNicknameChange}
          onKeyDown={handleKeyDown}
          value={nickname}
        />

        <div className={`tooltip ${showTooltip ? "show" : ""}`}>
          최대 7글자까지만 입력 가능해요! 😅
        </div>
      </div>
    </Modal>
  );
}
