import React from "react";
import ReactDOM from "react-dom/client";
import { createStore } from "redux";

import counterReducer from "./reducer";

const store = createStore(counterReducer);

const App = () => {
  const onClickAction = (type) => {
    store.dispatch({
      type,
    });
  };

  return (
    <div>
      <button onClick={() => onClickAction("GOOD")}>good</button>
      <button onClick={() => onClickAction("OK")}>ok</button>
      <button onClick={() => onClickAction("BAD")}>bad</button>
      <button onClick={() => onClickAction("RESET")}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
