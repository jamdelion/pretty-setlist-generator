import Head from 'next/head'
import Image from 'next/image'
import React, { useState, useReducer, createContext } from "react";
import styles from '../styles/Home.module.css'
import GigLengthFilter from '../components/GigLengthFilter'
import VibeFilter from '../components/VibeFilter'
import NumSetsFilter from '../components/NumSetsFilter'
import FriendlySlider from '../components/FriendlySlider'
import KnownTunesFilter from '../components/KnownTunesFilter'
import EraFilter from '../components/EraFilter'
import SetList from '../components/SetList';
import SpankyLogo from "../spanky_transparent.png";

const initialState = {
  gigLength: 90,
  numSets: 3,
  vibe: "Chilled",
  famFriendly: 0, // -5, 0 or 5
  bangersOnly: 1,
  setlistGenerated: false,
  era: "1995",
  randomSetlist: false,
};

function setlistReducer(state, action) {
  switch (action.type) {
    case "GIG_LENGTH_CHANGED":
      return { ...state, gigLength: action.payload };
    case "NUM_SETS_CHANGED":
      return { ...state, numSets: action.payload };
    case "VIBE_CHANGED":
      return { ...state, vibe: action.payload };
    case "FAM_FRIENDLY_CHANGED":
      return { ...state, famFriendly: action.payload };
    case "BANGERS_ONLY_CHANGED":
      return { ...state, bangersOnly: action.payload };
    case "ERA_CHANGED":
      return { ...state, era: action.payload };
    case "SETLIST_GENERATED":
      return { ...state, setlistGenerated: action.payload };
    case "RANDOM_SETLIST_WANTED":
      return { ...state, randomSetlist: action.payload };
    default:
      return state;
  }
}

export const SetlistContext = createContext();

export default function Home() {
  const [state, dispatch] = useReducer(setlistReducer, initialState);


  return (
    <div className="text-center">
    <header className="flex flex-col items-center justify-around bg-charcoal text-white min-h-screen">
      <Image src={SpankyLogo} width={350} height={350} alt="logo" />
      <h1>Setlist Generator</h1>
      {state.setlistGenerated ? (
        <section>
          <h2>Set List</h2>
          <SetlistContext.Provider value={{ state, dispatch }}>
            <SetList />
          </SetlistContext.Provider>
          <button
            onClick={() => {
              // show form again
              dispatch({ type: "SETLIST_GENERATED", payload: false });
            }}
          >
            Return to form
          </button>
        </section>
      ) : (
        <>
          <form className="App-form">
            <SetlistContext.Provider value={{ state, dispatch }}>
              <GigLengthFilter />
              <VibeFilter />
              <NumSetsFilter />
              <FriendlySlider />
              <KnownTunesFilter />
              <EraFilter />
            </SetlistContext.Provider>
          </form>
          <button
            onClick={() => {
              dispatch({ type: "RANDOM_SETLIST_WANTED", payload: false });
              dispatch({ type: "SETLIST_GENERATED", payload: true });
            }}
          >
            Generate Setlist
          </button>
        </>
      )}

      <button
        onClick={() => {
          dispatch({ type: "RANDOM_SETLIST_WANTED", payload: true });
          dispatch({ type: "SETLIST_GENERATED", payload: true });
        }}
      >
        Generate Random Setlist
      </button>
    </header>
  </div>
);
}
