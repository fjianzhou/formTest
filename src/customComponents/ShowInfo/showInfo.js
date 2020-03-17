import * as React from "react";
import { Icon, Grid } from "@lugia/lugia-web";
import styled from "styled-components";
const { Row, Col } = Grid;

const RowWrap = styled.div`
  display: flex;
  padding-bottom: 24px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
`;
const RowLeft = styled.span`
  width: 60px;
  font-family: PingFangSC-Regular;
  color: #a6aab2;
  text-align: right;
  line-height: 22px;
`;
const RowRight = styled.span`
  flex: 1;
  padding-left: 16px;
  font-size: 14px;
  color: #50575d;
  letter-spacing: 0;
  line-height: 22px;
`;
export default function renderInfoFn(props) {
  const { data = {}, column = [] } = props;
  return (
    <Row type="flex" justify="start">
      {column.map(item => {
        return (
          <Col span={8}>
            <RowWrap>
              <RowLeft>{item.title}</RowLeft>
              <RowRight>{data[item.dataIndex]}</RowRight>
            </RowWrap>
          </Col>
        );
      })}
    </Row>
  );
}
