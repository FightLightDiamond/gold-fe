import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Home from "./pages";
import Layout from "./app/layout/layout";
import Heroes from "./pages/heroes";
import Sprite from "./pages/sprite";
import Border from "./pages/border";
import Login from "./pages/auth/login";
import Room from "./pages/room";
import DownClock from "./pages/down-clock";

const App = () => {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/heroes" element={<Heroes/>}/>
          <Route path="/sprite" element={<Sprite/>}/>
          <Route path="/border" element={<Border/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/room" element={<Room/>}/>
          <Route path="/down-clock" element={<DownClock/>}/>
          <Route path="/borer" element={<Border/>}/>
          {/*<Route path="profile/*" element={<Profile />} />*/}
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
