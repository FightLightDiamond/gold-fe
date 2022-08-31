import { memo, useContext, useEffect } from "react";
import TopMenu from "./top-menu";
import { abilityRoles } from "../casl/";
import { AbilityContext } from "../casl/can";
import Container from "react-bootstrap/Container";
import {useEffectOnce} from "../hooks/useEffectOnce";
import {WS} from '../http/ws'
import {useDispatch} from "react-redux";
import { profile } from "../http/store/reducers/auth.slice";

const Layout = ({ children }: any) => {
    const dispatch = useDispatch()
    const ability = useContext(AbilityContext);

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
        dispatch({type: profile.type})
    })

    useEffect(() => {
        const role = "user";
        // Need update rule when browser refresh
        const permissions = abilityRoles(role, 1);
        ability.update([...permissions.rules, ...ability.rules]);
    }, [ability]);

    return (
        <>
            <TopMenu />
            <Container>{children}</Container>
        </>
    );
}

export default memo(Layout);
