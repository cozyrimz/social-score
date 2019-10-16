import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Menu  from "./core/Menu";
import Footer from "./core/Footer";
import QuickStats from "./core/QuickStats";


const MainRouter = () => (
    <>
        <Menu />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/quickstats" component={QuickStats} />
            {/* <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} /> */}
        </Switch>
        <Footer />
    </>
);

export default MainRouter;
