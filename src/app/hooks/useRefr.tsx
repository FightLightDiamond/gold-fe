import React, {
  useEffect,
  useState,
  useRef,
  memo, useCallback
} from "react";
import ContentMemo from "./ContentMemo";

/**
 * 1. memo() -> Higher Order Component (HOC)
 * 2. useCallback()
 *
 * Hook
 * HOC
 * Render props
 * @constructor
 */
const UseRefr = () => {
  const [count, setCount] = useState<number>(60)
  // const [intervalId, setIntervalId] = useState<any>(null)
  const timerId = useRef<number>()
  const prevCount = useRef<number>()

  const handleStart = () => {
    if(!timerId.current) {
      timerId.current = parseInt(String(setInterval(() => {
        setCount(prevState => prevState - 1)
      }, 1000)))
    }
    // setIntervalId(intervalId)
  }


  const handleStop = () => {
    clearInterval(timerId.current)
    timerId.current = 0
  }

  useEffect(() => {
    prevCount.current = count
    if(count === 0) {
      handleStop()
    }
  }, [count])

  const handleIncrement = useCallback(() => {
    setCount(prevState => prevState + 1)
  }, [])

  return (
    <>
      <h1>Use Ref</h1>
      <ContentMemo onIncrease={handleIncrement} />

      <h1>Count: {count}</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </>
  )
}

/**
 * Avoid rendering in unnecessary situations
 */
export default memo(UseRefr)


