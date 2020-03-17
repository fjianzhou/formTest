import React from "react";
import ReactDOM from "react-dom";
import { Modal } from "@lugia/lugia-web";
import Widgets from "@lugia/lugia-web/dist/consts";
import ShowInfo from "./showInfo";
const modalView = {
  [Widgets.Modal]: {
    ModalWrap: {
      normal: {
        width: 885
      }
    }
  }
};
export const showInfo = props => {
  Modal.createShowModal({
    component: ShowInfo
  })({ title: "查看信息", footer: false, ...props, theme: modalView });
};
