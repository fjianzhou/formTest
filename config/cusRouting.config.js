import routing from "./routing.config";
import List from "..\\src\\pages\\list.lugiad";
import Adduser from "..\\src\\pages\\addUser.lugiad";
const cusRouting = [
  {
    value: "/user/list",
    text: "用户列表",
    icon: "lugia-icon-financial_editor",
    component: List
  },
  {
    value: "/user/addUser",
    text: "新增用户",
    icon: "lugia-icon-financial_editor",
    component: Adduser,
    isShowMenu: false
  },
  {
    value: "/user/editorUser/:id",
    text: "编辑用户",
    icon: "lugia-icon-financial_editor",
    component: Adduser,
    isShowMenu: false
  }
];
export default [...cusRouting];
