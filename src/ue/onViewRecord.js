import React from "react";
import styled from "styled-components";
import { show } from "../../src/customComponents";

export default async param => {
  const { events } = param;
  const [text, record, _, column] = events;
  const { key } = record;
  show({ data: record, column });
};
