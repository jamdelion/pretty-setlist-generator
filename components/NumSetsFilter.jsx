import React, { useContext, useState } from "react";
import { SetlistContext } from './../pages/index'

export default function NumSetsFilter(props) {
  const { state, dispatch } = useContext(SetlistContext);
  const [checked, setChecked] = useState(true);

  const numOfSets = [1, 2, 3];

  return (
    <fieldset>
      <legend>Number of sets</legend>
      {numOfSets.map((num) => (
        <label htmlFor={num}>
          {num}
          <input
            defaultChecked={checked}
            onChange={() => setChecked(!checked)}
            type='radio'
            name='categories'
            id={num}
            key={num}
            value={num}
            onClick={(e) =>
              dispatch({
                type: "NUM_SETS_CHANGED",
                payload: e.target.value,
              })}
          />
        </label>
      ))}
    </fieldset>
  );
}
