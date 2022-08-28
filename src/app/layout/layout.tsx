import { memo, useContext, useEffect } from "react";
import TopMenu from "./top-menu";
import { abilityRoles } from "../casl/";
import { AbilityContext } from "../casl/can";
import Container from "react-bootstrap/Container";

function Layout({ children }: any) {
    const ability = useContext(AbilityContext);

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
