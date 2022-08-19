import React from "react";
import MainNavigation from "./MainNavigation";

const Layout = (props) => {
    return (
        <main>
            <MainNavigation />
            {props.children}
        </main>)
};

export default Layout;