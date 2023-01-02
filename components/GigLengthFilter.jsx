import React, { useContext } from "react";
import { SetlistContext } from './../pages/index'

export default function GigLengthFilter(props) {
  const { state, dispatch } = useContext(SetlistContext);

  return (
    <fieldset>
      <legend>Gig length</legend>
      <select
        name="gig-length"
        value={state.gigLength}
        onChange={(e) =>
          dispatch({
            type: "GIG_LENGTH_CHANGED",
            payload: e.target.value,
          })
        }
      >
        <option value="30">30 minutes</option>
        <option value="45">45 minutes</option>
        <option value="60" defaultValue>
          1 hour
        </option>
        <option value="90">90 minutes</option>
        <option value="120">2 hours</option>
        <option value="other">Other</option>
      </select>
    </fieldset>
  );
}
