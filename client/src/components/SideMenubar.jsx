import { useState } from "react";
import Ranking from "./modals/Ranking";
import menuIcon from "./../assets/menu.png";
import Nickname from "./modals/Nickname";

export default function SideMenubar({ menuList = [{}] }) {
  const [toggleMenubar, setToggleMenubar] = useState(false);
  const [showRanking, setShowRanking] = useState(false);
  const [showNickname, setShowNickname] = useState(false);

  const onChangeToggleMenubar = () => {
    setToggleMenubar(!toggleMenubar);
  };

  const handleMenuClick = (type) => {
    setToggleMenubar(false); // 메뉴바 닫기

    if (type === "ranking") {
      setShowRanking(true); // Ranking 컴포넌트 표시
    }
    if (type === "nickname") {
      setShowNickname(true);
    }
  };

  const menuView = menuList.map((e, index) => {
    return (
      <div
        key={index}
        className="menu-item"
        onClick={() => handleMenuClick(e.type)}
      >
        {e.name || "test"}
      </div>
    );
  });

  return (
    <div className="menu">
      {/* 배경 오버레이 - 클릭하면 메뉴 닫힘 */}
      {toggleMenubar && (
        <div className="menu-overlay" onClick={() => setToggleMenubar(false)} />
      )}

      <div className={`menu-view menu-view-${toggleMenubar}`}>{menuView}</div>
      <button onClick={onChangeToggleMenubar} className="menu-btn">
        <img src={menuIcon} className="menu-icon" />{" "}
      </button>

      {/* Ranking 컴포넌트가 자체적으로 Modal을 포함 */}
      {showRanking && <Ranking onClose={() => setShowRanking(false)} />}
      {showNickname && <Nickname onClose={() => setShowNickname(false)} />}
    </div>
  );
}
