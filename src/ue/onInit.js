export default async param => {
  const { pageData } = param;
  pageData.btnHidden = true;
  console.log("init", param);
  // if (!pageData.half) {
  //   const height = pageData.theme.QueryForm.Container.normal.height;
  //   const space = 125;
  //   if (height < space) {
  //     pageData.btnHidden = true;
  //     pageData.half = 0;
  //   } else {
  //     pageData.half = height - space;
  //   }
  // }
  // pageData.direction = -pageData.direction;
  // const { ExpandButton } = pageData;
  // ExpandButton.text = "展开";
  // pageData.theme.QueryForm.Container.normal.height -= pageData.half;
  // pageData.theme.MainCard.Container.normal.height -= pageData.half;
};
