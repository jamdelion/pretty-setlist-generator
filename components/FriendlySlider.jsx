import React, { useContext } from "react";
import { SetlistContext } from './../pages/index'

export default function FriendlySlider(props) {
  const { state, dispatch } = useContext(SetlistContext);
  return (
    <fieldset>
      <legend>Family friendly?</legend>
      <p>5 is very friendly, -5 is filthy! </p>
      <label htmlFor='family-friendly'>
        {state.famFriendly}
        <input
          type='range'
          id='family-friendly'
          min='-5'
          max='5'
          step='5'
          value={state.famFriendly}
          onChange={(e) =>
            dispatch({
              type: "FAM_FRIENDLY_CHANGED",
              payload: e.target.value,
            })}
        />
      </label>
    </fieldset>
  );
}
