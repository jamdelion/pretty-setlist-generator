import React, { useContext } from "react";
import { SetlistContext } from './../pages/index'

export default function EraFilter(props) {
  const { state, dispatch } = useContext(SetlistContext);
  return (
    <fieldset>
      <legend>Era</legend>
      <select
        name="era"
        value={state.era}
        onChange={(e) =>
          dispatch({
            type: "ERA_CHANGED",
            payload: e.target.value,
          })
        }
      >
        <option value="1955">50s</option>
        <option value="1965">60s</option>
        <option value="1975">70s</option>
        <option value="1985">80s</option>
        <option value="1995">90s</option>
        <option value="2005">2000s</option>
        <option value="2015">2010s</option>
        {/* <option value="Any" defaultValue>
          Any
        </option> */} (can't handle non numeric inputs atm)
      </select>
    </fieldset>
  );
}
