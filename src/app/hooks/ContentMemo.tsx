import React, {memo} from "react";

const ContentMemo = ({onIncrease}: any) => {
  console.log('content')
  return (
    <>
      <h3>Content memo</h3>
      <button onClick={onIncrease}>Click me!</button>
    </>
  )
}

export default memo(ContentMemo)
