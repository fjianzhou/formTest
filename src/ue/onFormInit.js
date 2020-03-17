export default async param => {
  const { props, pageData, models } = param;
  const [{ mutations }] = models;
  let isEditReg = /.*\/editorUser\/.+/;
  if (props.path === "/addUser") {
    pageData.$set("save", false);
    pageData.text = "新增";
    mutations.doReset();
  } else if (isEditReg.test(props.path)) {
    pageData.$set("save", true);
    pageData.text = "保存";
    const { match: { params: { id } = {} } = {} } = props;
    pageData.$set("key", id);
    mutations.asyncGetUserInfoByKey({ key: id });
  }
  // console.log("init", param);
  // if (props.edit) {
  //   pageData.$set("save", true);
  //   const [model] = models;
  //   const { mutations } = model;
  //   const id = "get by location";
  //   mutations.asyncGetRecord({ id });
  // }
  // console.info("onFormInit.js", param);
};
