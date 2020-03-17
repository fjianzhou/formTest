export default async param => {
  const {
    pageData,
    models: [userInfo],
    props
  } = param;
  const { mutations, getState } = userInfo;

  const saveUser = getState();
  const user_name = saveUser.get("user_name");
  const user_age = saveUser.get("user_age");
  const user_sex = saveUser.get("user_sex");
  const user_state = saveUser.get("user_state");
  const user_department = saveUser.get("user_department");
  const user_entry_time = saveUser.get("user_entry_time");

  if (!user_name) {
    pageData.user_nameError = "error";
    pageData.user_nameHelp = "名称不能我空!";
  } else {
    pageData.user_nameError = "";
    pageData.user_nameHelp = "";
  }
  if (!user_age) {
    pageData.user_ageError = "error";
    pageData.user_ageHelp = "年龄不能为空!";
  } else if (user_age > 60) {
    pageData.user_ageError = "error";
    pageData.user_ageHelp = "年龄太大,适合次工资";
  } else {
    pageData.user_ageError = "";
    pageData.user_ageHelp = "";
  }
  if (!user_sex) {
    pageData.user_sexError = "error";
    pageData.user_sexHelp = "性别不能为空!";
  } else {
    pageData.user_sexError = "";
    pageData.user_sexHelp = "";
  }
  if (!user_state) {
    pageData.user_stateError = "error";
    pageData.user_stateHelp = "状态不能为空!";
  } else {
    pageData.user_stateError = "";
    pageData.user_stateHelp = "";
  }
  if (!user_department) {
    pageData.user_departmentError = "error";
    pageData.user_departmentHelp = "部门不能为空!";
  } else {
    pageData.user_departmentError = "";
    pageData.user_departmentHelp = "";
  }
  if (!user_entry_time) {
    pageData.user_entry_timeError = "error";
    pageData.user_entry_timeHelp = "入职时间不能为空!";
  } else {
    pageData.user_entry_timeError = "";
    pageData.user_entry_timeHelp = "";
  }
  const {
    user_nameError,
    user_ageError,
    user_sexError,
    user_stateError,
    user_departmentError,
    user_entry_timeError
  } = pageData;
  if (
    user_nameError ||
    user_ageError ||
    user_sexError ||
    user_stateError ||
    user_departmentError ||
    user_entry_timeError
  ) {
    return;
  }
  if (pageData.save) {
    mutations.asyncSaveUserInfo(pageData.key);
  } else {
    mutations.asyncAddUserInfo();
  }
};
