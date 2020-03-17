export default async param => {
  const {
    props,
    pageData,
    models: [user],
    events: [{ newValue }]
  } = param;
  const { field } = props;
  if (field === "user_name") {
    if (newValue) {
      pageData.user_nameError = "";
      pageData.user_nameHelp = "";
    } else {
      pageData.user_nameError = "error";
      pageData.user_nameHelp = "名称不能我空!";
    }
  } else if (field === "user_age") {
    if (newValue < 18) {
      pageData.user_ageError = "error";
      pageData.user_ageHelp = "年龄太小，不能雇佣童工";
    } else if (newValue > 60) {
      pageData.user_ageError = "error";
      pageData.user_ageHelp = "年龄太大,适合次工资";
    } else {
      pageData.user_ageError = "";
      pageData.user_ageHelp = "";
    }
  } else if (field === "user_sex") {
    if (newValue) {
      pageData.user_sexError = "";
      pageData.user_sexHelp = "";
    } else {
      pageData.user_sexError = "error";
      pageData.user_sexHelp = "性别不能为空!";
    }
  } else if (field === "user_state") {
    if (newValue) {
      pageData.user_stateError = "";
      pageData.user_stateHelp = "";
    } else {
      pageData.user_stateError = "error";
      pageData.user_stateHelp = "状态不能为空!";
    }
  } else if (field === "user_department") {
    if (newValue) {
      pageData.user_departmentError = "";
      pageData.user_departmentHelp = "";
    } else {
      pageData.user_departmentError = "error";
      pageData.user_departmentHelp = "部门不能为空!";
    }
  }
};
