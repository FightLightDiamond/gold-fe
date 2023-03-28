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
import Charts from './pages/charts';
import './i18n/config';
import History from "./pages/match/history";
import Portfolio from "./pages/portfolio";
import EloMatchCharts from "./pages/elo-match";
import Register from "./pages/auth/register";
import Distortion from "./pages/distortion";
import Profile from "./pages/auth/profile";
import TFT from "./pages/tft";

const App = () => {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/sign-in" element={<Login/>}/>
          <Route path="/sign-up" element={<Register/>}/>
          <Route path="/heroes" element={<Heroes/>}/>
          <Route path="/elo-match" element={<EloMatchCharts/>}/>
          <Route path="/charts" element={<Charts/>}/>
          <Route path="/history" element={<History/>}/>

          <Route path="/sprite" element={<Sprite/>}/>
          <Route path="/border" element={<Border/>}/>
          <Route path="/border" element={<Border/>}/>
          <Route path="/room" element={<Room/>}/>
          <Route path="/down-clock" element={<DownClock/>}/>
          <Route path="/borer" element={<Border/>}/>
          <Route path="/distortion" element={<Distortion/>}/>
          <Route path="/portfolio" element={<Portfolio/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/tft" element={<TFT/>}/>
          {/*<Route path="profile/*" element={<Profile />} />*/}
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
