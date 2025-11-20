import SideMenubar from "./SideMenubar";

export default function Top() {

    const dumMenuList = [{name:"랭킹보기", "type":"ranking"},{name:"hi2"},{name:"hi3"},{name:"hi4"}]; 

    return (
        <div>
            <SideMenubar menuList={dumMenuList}/>
        </div>
    )
}