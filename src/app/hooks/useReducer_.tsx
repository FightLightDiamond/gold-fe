import React, {memo, useMemo, useRef, useState, useReducer} from "react";

/**
 * useState
 * 1. Init state: 0
 * 2. Action: up +, down -
 *
 * useReducer
 * 1. Init state: 0
 * 2. Action: up +, down -
 * 3. Reducer
 * 4. Dispatch
 */

/**
 * Tránh thực hiện lại 1 logic không cần thiết
 *
 * @constructor
 */

// Init state
const initState = 0
// Action
const UP_ACTION = 'up'
const DOWN_ACTION = 'down'
// Reducer
const reducer = (state: any, action: any) => {
  switch (action) {
    case UP_ACTION: return state + 1
    case DOWN_ACTION: return state - 1
    default: throw new Error('Invalid action')
  }
}

const UseReducer_ = () => {
  // const [count, setCount] = useState(0)
  const [count, dispatch] = useReducer(reducer, initState)

  return (
    <>
      <h1>use Reducer</h1>
      <h2>{count}</h2>
      <button onClick={() => dispatch(DOWN_ACTION)}>Down</button>
      <button onClick={() => dispatch(UP_ACTION)}>Up</button>
    </>
  )
}

export default memo(UseReducer_)
