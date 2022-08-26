import React, {memo, useState, createContext} from "react";
import Context_ from "./Context_";

export const ThemeContext = createContext('dark');

// Context
// CompA => CompB => CompC
/**
 * 1. Create context
 * 2. Provider : truyền
 * 3. Consumer: nhận
 * @constructor
 */
const UseContext_ = () => {
  const [theme, setTheme] = useState('dark')

  const toggleThem = () => {
    setTheme(theme === 'dark' ? 'light': 'dark')
  }

  return (
    <>
      <ThemeContext.Provider value={theme}>
        <h1>Use Context</h1>
        <button onClick={toggleThem}>Toggle theme</button>
        <Context_/>
      </ThemeContext.Provider>
    </>
  )
}

export default memo(UseContext_)
