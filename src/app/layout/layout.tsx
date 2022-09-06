import {memo, useContext, useEffect, useState} from "react";
import TopMenu from "./top-menu";
import {abilityRoles} from "../casl/";
import {AbilityContext} from "../casl/can";
import Container from "react-bootstrap/Container";
import {useEffectOnce} from "../hooks/useEffectOnce";
import {WS} from '../http/ws'
import {useDispatch, useSelector} from "react-redux";
import {profile} from "../http/store/reducers/auth.slice";
import {ToastContainer} from "react-toastify";
import {RootState} from "../http/store";

const Layout = ({children}: any) => {
  const dispatch = useDispatch()
  const ability = useContext(AbilityContext);
  const auth = useSelector((state: RootState) => state.auth);

  useEffectOnce(() => {
    const getSW = async () => {
      const ws = await WS.getSocket();

      ws.on("disconnect", function () {
        console.log("disconnected");
      });

      ws.on("connect", function () {
        console.log("connect");
      });
    }
    void getSW()

  })

  useEffect(() => {
    if(auth.isAuthentication) {
      dispatch({type: profile.type})
    }
  }, [auth.isAuthentication]);


  useEffect(() => {
    const role = "user";
    // Need update rule when browser refresh
    const permissions = abilityRoles(role, 1);
    ability.update([...permissions.rules, ...ability.rules]);
  }, [ability]);

  return (
    <>
      <TopMenu/>
      <Container style={{
        marginTop: "70px"
      }}>{children}</Container>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={true}
        draggable
        theme={"dark"}
      />
    </>
  );
}

export default memo(Layout);
