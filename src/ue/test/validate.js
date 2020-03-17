export default async param => {
  const { props, pageData } = param;
  const { field } = props;
  if (field === "name") {
    const { events } = param;
    const [event] = events;
    if (event.newValue === "ligx") {
      pageData.nameError = "error";
      pageData.nameHelp = "姓名错误";
    } else {
      pageData.nameError = "";
    }
  }
};
