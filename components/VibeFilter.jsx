import React, { useContext } from "react";
import { SetlistContext } from './../pages/index'

export default function VibeFilter(props) {
  const { state, dispatch } = useContext(SetlistContext);
  return (
    <fieldset>
      <legend>Vibe</legend>
      <select
        value={state.vibe}
        onChange={(e) =>
          dispatch({
            type: "VIBE_CHANGED",
            payload: e.target.value,
          })}
        name='vibe'>
        <option value='Religious'>Religious</option>
        <option value='Nerdy'>Nerdy</option>
        <option value='Chilled' defaultValue>
          Chilled
        </option>
        <option value='Wild'>Wild</option>
        <option value='Too posh'>Too posh to clap</option>
        <option value='Other'>Other</option>
      </select>
    </fieldset>
  );
}
