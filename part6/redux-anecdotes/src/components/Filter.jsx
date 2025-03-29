import { useState } from "react";
import { updateFilter } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();
  const [filterStr, setFilterStr] = useState("");

  const handleSetFilterChange = (event) => {
    const filterText = event.target.value;
    setFilterStr(filterText);
    dispatch(updateFilter(filterText));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input value={filterStr} onChange={handleSetFilterChange} />
    </div>
  );
};

export default Filter;
