import SideMenubar from "./SideMenubar";

export default function Top() {
  const dumMenuList = [
    { name: "랭킹보기", type: "ranking" },
    { name: "닉네임변경", type: "nickname" }
  ];

  return (
    <div>
      <SideMenubar menuList={dumMenuList} />
    </div>
  );
}
