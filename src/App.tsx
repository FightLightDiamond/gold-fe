import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Home from "./pages";
import Layout from "./app/layout/layout";
import Heroes from "./pages/heroes";
import Sprite from "./pages/sprite";
import Border from "./pages/border";
import Login from "./pages/auth/login";
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
import DG from "./pages/dg";
import {useEffectOnce} from "./app/hooks/useEffectOnce";
import {WS} from "./app/http/ws";
import {getCurrentMatchSuccess} from "./app/http/store/reducers/match.slice";
import {toast} from "react-toastify";
import * as __ from "lodash";
import {updateBalance} from "./app/http/store/reducers/auth.slice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./app/http/store";

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  useEffectOnce(() => {
    const getWS = async () => {
      const socket = await WS.getSocket()

      socket.addEventListener("open", () => {
        // send a message to the server
        console.log('Socket open')
      });
      socket.addEventListener("message", () => {
        // send a message to the server
        console.log('Socket open')
      });

      socket.on("connect", () => {
        console.log('Connect')
        // socket.emit("joinRoom", "match");

        socket.on("betting", (data: any) => {
          dispatch({
            type: getCurrentMatchSuccess.type,
            payload: data
          })
          toast(`The match is betting`, );
        });

        socket.on("matching", (data: any) => {
          toast(`The match is fighting`);
          dispatch({
            type: getCurrentMatchSuccess.type,
            payload: data
          })
        });

        socket.on("reward", (data: any) => {
          const reward: any = __.find(data, (o) => {
            return o.user_id === auth.user.id
          })

          if(reward) {
            toast(`Congratulations on winning and earning $${reward.balance}!`);
            dispatch({
              type: updateBalance.type,
              payload: reward.balance * 2
            })
          }
        });
      })
    }
    void getWS();
  })
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
          <Route path="/down-clock" element={<DownClock/>}/>
          <Route path="/borer" element={<Border/>}/>
          <Route path="/distortion" element={<Distortion/>}/>
          <Route path="/portfolio" element={<Portfolio/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/tft" element={<TFT/>}/>
          <Route path="/dg" element={<DG/>}/>
          {/*<Route path="profile/*" element={<Profile />} />*/}
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
