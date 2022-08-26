import React, {memo, useContext} from "react";

import {ThemeContext} from "./useContext_";
// Context
// CompA => CompB => CompC

const Paragraph = () => {
  const theme = useContext(ThemeContext)
  return (
    <>
     <p>Paragraph</p>
      {theme}
    </>
  )
}

export default memo(Paragraph)

