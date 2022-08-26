import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Home from "./pages";
import Layout from "./app/layout/layout";
import Heroes from "./pages/heroes";

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/heroes" element={<Heroes/>}/>
          {/*<Route path="profile/*" element={<Profile />} />*/}
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
