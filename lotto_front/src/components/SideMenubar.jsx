import { useState } from "react";
import Ranking from "./modals/Ranking";

export default function SideMenubar({ menuList = [{}] }) {
  const [toggleMenubar, setToggleMenubar] = useState(false);
  const [showRanking, setShowRanking] = useState(false);

  const onChangeToggleMenubar = () => {
    setToggleMenubar(!toggleMenubar);
  };

  const handleMenuClick = (type) => {
    setToggleMenubar(false); // 메뉴바 닫기
    
    if (type === "ranking") {
      setShowRanking(true); // Ranking 컴포넌트 표시
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
    <div>
      <div className={`menu-view menu-view-${toggleMenubar}`}>{menuView}</div>
      <button onClick={onChangeToggleMenubar}> sideMenu </button>
      
      {/* Ranking 컴포넌트가 자체적으로 Modal을 포함 */}
      {showRanking && <Ranking onClose={() => setShowRanking(false)} />}
    </div>
  );
}