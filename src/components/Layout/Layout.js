import React from "react";
import MainNavigation from "./MainNavigation";
import Footer from "./Footer";

const Layout = (props) => {
    return (
        <main>
            <MainNavigation />
            {props.children}
            <Footer />
        </main>)
};

export default Layout;