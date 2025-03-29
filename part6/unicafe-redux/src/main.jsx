import React from "react";
import ReactDOM from "react-dom/client";

import createStore from "./reducer";
import { useMemo } from "react";

const App = () => {
  const onClickAction = (type) => {
    store.dispatch({
      type,
    });
  };

  const store = createStore(reducer);

  const counter = useMemo(() => store.getState(), [store]);

  return (
    <div>
      <button onClick={() => onClickAction("GOOD")}>good</button>
      <button onClick={() => onClickAction("OK")}>ok</button>
      <button onClick={() => onClickAction("BAD")}>bad</button>
      <button onClick={() => onClickAction("RESET")}>reset stats</button>
      <div>good {counter.good}</div>
      <div>ok {counter.ok}</div>
      <div>bad {counter.bad}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
