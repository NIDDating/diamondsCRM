import "./App.scss";
import {BrowserRouter as Router} from "react-router-dom";
import AppRouter from "./router";
import translations from "./translations";
import {connect, Provider} from "react-redux";
import {store} from "./store";
import {IntlProvider} from "react-intl";
import {Toaster} from "react-hot-toast";
import {GLOBAL} from "./store/actionTypes";

function App2({store, dispatch}) {
  var language = window.navigator.userLanguage || window.navigator.language;

  language = language.split("-");
  language = language[0];

  if (store.global.language === null) {
    dispatch({
      type: GLOBAL.SET_LANGUAGE,
      value: language
    });
  }

  return (
    <IntlProvider messages={translations[store.global.language ? store.global.language : language]} locale={store.global.language}>
      <Router>
        <Toaster />
        <div className="App">
          <AppRouter />
        </div>
      </Router>
    </IntlProvider>
  );
}

const App2WithStore = connect((store) => ({store}))(App2);

function App() {
  return (
    <Provider store={store}>
      <App2WithStore />
    </Provider>
  );
}

export default App;
