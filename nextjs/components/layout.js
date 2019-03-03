import Head from "next/head";
import Navbar from "./navbar.js";

/* jshint ignore:start */
const Layout = (props) => (
    <div>
        <Head>
            <link rel="stylesheet" href="https://bootswatch.com/4/cerulean/bootstrap.min.css"/>
            <title>My Awesome Website</title>
        </Head>
        <Navbar></Navbar>
        {props.children}
    </div>
);
/* jshint ignore:end */

export default Layout;
