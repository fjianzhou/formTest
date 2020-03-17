import { Modal, message } from "@lugia/lugia-web";
export default async param => {
  const { models } = param;
  const [model] = models;
  const { getState } = model;
  const stateSelectKeys = getState().get("selected");
  const selectedKeys = stateSelectKeys.toJS
    ? stateSelectKeys.toJS()
    : stateSelectKeys;
  const length = selectedKeys.length;
  if (length < 1) {
    message.error("您还没有选中要删除的数据", 2);
    return;
  }
  Modal.confirm({
    title: "确认是否删除",
    content: `您将删除条记录，是否确认？`,
    onOk: () => {
      const {
        mutations: { asyncDeleteSelected }
      } = model;
      asyncDeleteSelected();
    },
    okButtonProps: { type: "danger" }
  });
};
