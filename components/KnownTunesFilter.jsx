import React, { useContext } from "react";
import { SetlistContext } from './../pages/index'

export default function KnownTunesFilter(props) {
  const { state, dispatch } = useContext(SetlistContext);
  return (
    <fieldset>
      <legend>Bangers only?</legend>
      <p>5 is bangers only, 1 is rogue tunes welcome </p>
      <label htmlFor='known-tunes'>
        {state.bangersOnly}
        <input
          type='range'
          id='known-tunes'
          min='1'
          max='5'
          step='1'
          value={state.bangersOnly}
          onChange={(e) =>
            dispatch({
              type: "BANGERS_ONLY_CHANGED",
              payload: e.target.value,
            })}
        />
      </label>
    </fieldset>
  );
}
