import lugiax from "@lugia/lugiax";
import { fromJS } from "immutable";
import { go } from "@lugia/lugiax-router";
import { dateFormat, findItemInArrayByValue, generateUUID } from "../utils";
import { userStateData, department, sexData } from "../mock";
import ListModel from "./list";
const __LUGIAX_MODEL_DEFINE__ = "addUser";
const initState = {
  user_name: "",
  user_age: 18,
  user_sex: "1",
  user_state: "1",
  user_department: "1",
  user_entry_time: dateFormat("YYYY-mm-dd", new Date()),
  sexData
};
const collectData = (newState, addFlag) => {
  const userState = findItemInArrayByValue(
    userStateData,
    newState.get("user_state"),
    "value",
    "text"
  );
  const userDepartment = findItemInArrayByValue(
    department,
    newState.get("user_department"),
    "value",
    "text"
  );
  const userSex = findItemInArrayByValue(
    sexData,
    newState.get("user_sex"),
    "value",
    "text"
  );
  const info = {
    key: addFlag ? generateUUID() : newState.get("user_key"),
    user_name: newState.get("user_name"),
    user_age: newState.get("user_age"),
    user_sex: userSex,
    user_state: userState,
    user_department: userDepartment,
    user_entry_time: newState.get("user_entry_time")
  };
  return info;
};
export default lugiax.register({
  model: __LUGIAX_MODEL_DEFINE__,
  state: initState,
  mutations: {
    sync: {
      doReset(state, param, { getState }) {
        let newState = getState();
        let sourceData = newState.get("editData");
        console.log("sourceData", sourceData);
        if (sourceData) {
          newState = newState
            .set("user_name", sourceData.get("user_name"))
            .set("user_age", sourceData.get("user_age"))
            .set(
              "user_sex",
              findItemInArrayByValue(
                sexData,
                sourceData.get("user_sex"),
                "text",
                "value"
              )
            )
            .set(
              "user_state",
              findItemInArrayByValue(
                userStateData,
                sourceData.get("user_state"),
                "text",
                "value"
              )
            )
            .set(
              "user_department",
              findItemInArrayByValue(
                department,
                sourceData.get("user_department"),
                "text",
                "value"
              )
            )
            .set("user_key", sourceData.get("key"))
            .set("user_entry_time", sourceData.get("user_entry_time"));
        } else {
          Object.keys(initState).forEach(item => {
            newState = newState.set(item, initState[item]);
          });
        }
        return newState;
      }
    },
    async: {
      async getUserInfoByKey(state, param, { getState }) {
        let newState = getState();
        const listModel = ListModel.getState();
        const rowData = listModel.get("table").find(item => {
          return item.get("key") == param.key;
        });
        newState = newState.set("editData", rowData);
        newState = newState
          .set("user_name", rowData.get("user_name"))
          .set("user_age", rowData.get("user_age"))
          .set(
            "user_sex",
            findItemInArrayByValue(
              sexData,
              rowData.get("user_sex"),
              "text",
              "value"
            )
          )
          .set(
            "user_state",
            findItemInArrayByValue(
              userStateData,
              rowData.get("user_state"),
              "text",
              "value"
            )
          )
          .set(
            "user_department",
            findItemInArrayByValue(
              department,
              rowData.get("user_department"),
              "text",
              "value"
            )
          )
          .set("user_key", rowData.get("key"))
          .set("user_entry_time", rowData.get("user_entry_time"));
        return newState;
      },
      async addUserInfo(state, param, { getState, mutations }) {
        let newState = getState();
        const info = collectData(newState, true);
        await ListModel.mutations.addInfo(info);
        newState = mutations.doReset();
        go({ url: "/user/list" });
        newState.delete("editData");
        return newState;
      },
      async saveUserInfo(state, param, { getState, mutations }) {
        let newState = getState();
        const info = collectData(newState, false);
        await ListModel.mutations.updateInfo(info);
        newState = mutations.doReset();
        go({ url: "/user/list" });
        newState.delete("editData");
        return newState;
      }
    }
  }
});
