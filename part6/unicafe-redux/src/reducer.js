const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const counterReducer = (state = initialState, action) => {
  const tempState = { ...state };

  switch (action.type) {
    case "GOOD":
      tempState.good += 1;
      return tempState;
    case "OK":
      tempState.ok += 1;
      return tempState;
    case "BAD":
      tempState.bad += 1;
      return tempState;
    case "RESET":
      tempState.good = 0;
      tempState.ok = 0;
      tempState.bad = 0;
      return tempState;
    default:
      return state;
  }
};

export default counterReducer;
