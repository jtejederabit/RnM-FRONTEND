import React, {ReactNode} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import NavigationBar from "./NavigationBar.tsx";

interface props {
    children: ReactNode;
}
const Layout: React.FC<props> = ({ children }) => {
    const token = useSelector((state: RootState) => state.login.token);
    return (
        <div>
            { token && <NavigationBar /> }
            <main>
                {children}
            </main>
        </div>
    );
}

export default Layout;