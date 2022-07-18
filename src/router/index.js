import React, {useEffect, useState} from "react";
import {Switch, Route, withRouter, useParams} from "react-router-dom";
import {connect} from "react-redux";
import {routes} from "./config";
import PartnersAppearance from "../pages/PartnersAppearance";
import MyAppearance from "../pages/MyAppearance";
import AboutPartner from "../pages/AboutPartner";
import AboutMe from "../pages/AboutMe";
import PartnersTraits from "../pages/PartnersTraits";
import MyTraits from "../pages/MyTraits";
import Test from "../pages/Test";
import Finish from "../pages/Finish";
import Comp404 from "../pages/404";
import {getSign} from "../utils/api";
import toast from "react-hot-toast";
import BounceLoader from "react-spinners/BounceLoader";
import Index from "../pages/Index";

function Sign({history}) {
  let [error, setError] = useState(false);
  let {sign} = useParams();

  useEffect(() => {
    (async () => {
      try {
        let exist = await getSign(sign);

        if (exist) {
          localStorage.setItem("sign", sign);
          history.push("/");
        } else {
          setError(true);
        }
      } catch (e) {
        toast.error(e);
      }
    })();
  }, []);

  if (error) {
    return (
      <Comp404 />
    );
  } else {
    return (
      <div className="loading">
        <BounceLoader color={"#E6B43F"} />
      </div>
    );
  }
}

let SignWithRouter = withRouter(Sign);

function App() {
  return (
    <Switch>
      <Route path={routes.sign} children={<SignWithRouter />} />
      <Route path={"/"} exact={true}>
        <Index />
      </Route>
      <Route path={routes.partnersAppearance} exact={true}>
        <PartnersAppearance />
      </Route>
      <Route path={routes.myAppearance} exact={true}>
        <MyAppearance />
      </Route>
      <Route path={routes.aboutPartner} exact={true}>
        <AboutPartner />
      </Route>
      <Route path={routes.aboutMe} exact={true}>
        <AboutMe />
      </Route>
      <Route path={routes.partnersTraits} exact={true}>
        <PartnersTraits />
      </Route>
      <Route path={routes.myTraits} exact={true}>
        <MyTraits />
      </Route>
      <Route path={routes.test} exact={true}>
        <Test />
      </Route>
      <Route path={routes.finish} exact={true}>
        <Finish />
      </Route>
      <Route>
        <Comp404 />
      </Route>
    </Switch>
  );
}

export default withRouter(connect((state) => ({state}))(App));