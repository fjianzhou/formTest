import React from "react";
import ThemeProvider from "@lugia/theme-hoc";
import { Table, Theme } from "@lugia/lugia-web";
import styled from "styled-components";
import Widget from "@lugia/lugia-web/dist/consts";

const Operation = styled.a`
  margin-right: 10px;
`;

export default ThemeProvider(
  class CustomTable extends React.Component {
    render() {
      const {
        selectRowKeys = [],
        onChange,
        columns = [],
        data = [],
        onView,
        onEdit,
        onDelete,
        getPartOfThemeHocProps
      } = this.props;
      const theColumns = [...columns];
      theColumns.push({
        title: "操作",
        dataIndex: "custom_operations",
        key: "custom_operations",
        render: (text, record, index) => [
          <Operation
            href="javascript:;"
            onClick={() => onEdit(text, record, index)}
          >
            编辑
          </Operation>,
          <Operation
            href="javascript:;"
            onClick={() => onView(text, record, index, columns)}
          >
            查看
          </Operation>,
          <Operation
            href="javascript:;"
            onClick={() => onDelete(text, record, index)}
          >
            删除
          </Operation>
        ]
      });
      const { viewClass, theme } = getPartOfThemeHocProps("Container");
      const config = {
        [Widget.Table]: {
          Container: theme[viewClass]
        }
      };

      return (
        <Theme config={config}>
          <Table
            {...this.props}
            data={data}
            columns={theColumns}
            selectOptions={{
              onChange,
              selectRowKeys
            }}
            theme={theme}
            viewClass={viewClass}
          />
        </Theme>
      );
    }
  },
  "CustomTable"
);
