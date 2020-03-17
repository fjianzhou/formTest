import lugiax from "@lugia/lugiax";
import { fromJS } from "immutable";
import { go } from "@lugia/lugiax-router";
import { Modal, message } from "@lugia/lugia-web";
import { table, userStateData, department, sexData } from "../mock";
import { findItemInArrayByValue } from "../utils";
const __LUGIAX_MODEL_DEFINE__ = "list";
let oldData = fromJS(table);
const state = {
  current: 1,
  pageSize: 2,
  total: 4,
  table: table.slice(0, 2),
  totalText: `共计${table.length}条记录`,
  selected: [],
  userStateData,
  department
};

const queryData = (newState, pageSizeResetFlag) => {
  const userName = newState.get("userName");
  const userState = newState.get("userState");
  const userDepartment = newState.get("userDepartment");
  const userEntryTime = newState.get("userEntryTime");
  const current = newState.get("current");
  const pageSize = newState.get("pageSize");
  let newTable = oldData.filter(row => {
    const stateFlag = userState
      ? findItemInArrayByValue(
          userStateData,
          row.get("user_state"),
          "text",
          "value"
        ) === userState
      : true;
    const departmentFlag = userDepartment
      ? findItemInArrayByValue(
          department,
          row.get("user_department"),
          "text",
          "value"
        ) === userDepartment
      : true;
    const nameFlag = userName ? row.get("user_name").includes(userName) : true;
    const entryTimeFlag = userEntryTime
      ? new Date(row.get("user_entry_time")) >=
        new Date(userEntryTime + " 00:00:00:00")
      : true;
    return stateFlag && departmentFlag && entryTimeFlag && nameFlag;
  });
  let pageTotal = newTable.size;
  const startIndex = pageSizeResetFlag ? 0 : pageSize * (current - 1);
  const endIndex = pageSizeResetFlag ? pageSize : pageSize * current;
  if (pageSizeResetFlag) {
    newState = newState.set("current", 1);
  }
  newTable = newTable.slice(startIndex, endIndex);
  newState = newState
    .set("table", newTable)
    .set("totalText", `共计${pageTotal}条记录`)
    .set("total", pageTotal);
  return newState;
};

export default lugiax.register({
  model: __LUGIAX_MODEL_DEFINE__,
  state,
  mutations: {
    sync: {
      goToAddUserPage() {
        go({ url: "/user/addUser" });
      },
      addInfo(state, userInfo, { getState, mutations }) {
        let newState = getState();
        oldData = oldData.unshift(fromJS(userInfo));
        newState = newState
          .set("userName", "")
          .set("userState", "")
          .set("userDepartment", "")
          .set("userEntryTime", "");
        newState = queryData(newState, true, true);
        return newState;
      },
      updateInfo(state, userInfo, { getState, mutations }) {
        let newState = getState();
        const index = oldData.findIndex(item => {
          return item.get("key") === userInfo.key;
        });
        oldData = oldData.update(index, () => fromJS(userInfo));
        newState = queryData(newState);
        return newState;
      },
      onSelected(state, param) {
        const { events = [] } = param;
        const [seleckKeys = []] = events;
        return state.set("selected", seleckKeys);
      }
    },
    async: {
      async deleteSelected(state, param, { getState }) {
        let newState = getState();
        const selected = state.get("selected").toJS
          ? state.get("selected").toJS()
          : state.get("selected");
        oldData = oldData.filter(item => {
          return !selected.includes(item.get("key"));
        });
        newState = queryData(newState, true);
        return newState;
      },
      async onDelete(state, param, { getState, mutations }) {
        Modal.confirm({
          title: "确认是否删除",
          content: `您将删除条记录，是否确认？`,
          onOk: () => {
            mutations.asyncOnDeleteFn(param);
          },
          okButtonProps: { type: "danger" }
        });
      },
      async onDeleteFn(state, param, { getState, mutations }) {
        let newState = getState();
        const { events: [text, rowData] = [] } = param;
        const { key } = rowData;
        oldData = oldData.filter(item => {
          return item.get("key") != key;
        });
        newState = queryData(newState, true);
        return newState;
      },
      async onEdit(state, param) {
        const { events = [] } = param;
        const [text, record] = events;
        const { key } = record;
        go({ url: `/user/editorUser/${key}` });
        return state;
      },
      async onView(state, param) {
        const { events = [] } = param;
        const [text, record] = events;
        const { key } = record;
        return state;
      },
      async query(state, param, { getState }) {
        let newState = getState();
        newState = queryData(newState, true);
        return newState;
      },
      async onChangePage(state, param, { getState }) {
        let newState = getState();
        const {
          events: [{ current, pageSize }]
        } = param;
        newState = newState
          .set("current", current)
          .set("pageSize", pageSize)
          .set("selected", fromJS([]));
        newState = queryData(newState);
        return newState;
      }
    }
  }
});
