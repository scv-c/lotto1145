// Ranking.jsx - 이렇게 수정
import Modal from "./Modal.jsx";
import "./Nickname.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { updateUserNickname } from "../../services/api/user.js";
import { setNickname } from "../../services/store/userSlice.js";
import useToast from "../../services/hooks/useToast.js";

export default function Nickname({ onClose }) {
  const [newNickname, setNewNickname] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const inputRef = useRef(null);
  const userNickname = useSelector((state) => state.user.Nickname);
  const { showToast } = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    setNewNickname(userNickname); // defaultValue로 설정해봤는데, palceHolder에 가려짐. 초기값으로 설정해줌.

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const okPostHandler = async () => {
    updateUserNickname(newNickname)
      .then((res) => {
        showToast("success", "닉네임 변경 성공");
        dispatch(setNickname(newNickname));
        onClose();
        return res;
      })
      .catch((e) => {
        const { message, statusCode } = e.response.data;
        if (message === "Database query failed") {
          showToast("error", "중복된 닉네임입니다. 다시 입력하세요.");
        } else if (message === "Fail update. Not Find uuid") {
          showToast("error", "1번 이상 로또를 생성해야 합니다!");
        } else {
          showToast("error", e.message);
        }
        return e;
      });
  };

  const handleNicknameChange = (e) => {
    setNewNickname(e.target.value);
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

    // 길이가 7 이상이고 + 허용된 키가 아니면 -> 툴팁 발사
    if (newNickname?.length >= 7 && !allowedKeys.includes(e.key)) {
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
      onOkPost={okPostHandler}
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
          value={newNickname || ""}
          autoComplete="off"
        />

        <div className={`tooltip ${showTooltip ? "show" : ""}`}>
          최대 7글자까지만 입력 가능해요! 😅
        </div>
      </div>
    </Modal>
  );
}
