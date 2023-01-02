import React, { useContext } from "react";
import { SetlistContext } from './../pages/index'
import { songs } from "../songs";
import { sampleSize } from "lodash";

export default function SetList() {
  const { state, dispatch } = useContext(SetlistContext);
  // props: { numSets, gigLength, vibe, famFriendly, bangersOnly, era }

  // sort out number of songs in set
  const AVG_MINS_PER_SONG = 3.5;
  let numSongs = Math.round(state.gigLength / AVG_MINS_PER_SONG); // doesn't yet handle "other";

  let songNames = Object.keys(songs); 

  function filterByEra(songYear, midOfEra) {
    if (Math.abs(parseInt(midOfEra)-songYear) <= 5) return 1;
    else return 0;
  }

  let scoredSongs = [];
  songNames.map(songName => {
    scoredSongs.push({
      name: songName,
      bangerScore: songs[songName].banger * state.bangersOnly,
      filthyScore: songs[songName].dirty * state.famFriendly,
      eraScore: filterByEra(songs[songName].year, state.era),
      // more scores here
      totalScore: 0
    })
  })

  // calculate the total score for each song
  scoredSongs.map(song => {
    return song.totalScore = song.bangerScore + song.filthyScore + song.eraScore;
  })

  function getRandomSongs(numberOfSongs) {
    return sampleSize(scoredSongs, numberOfSongs)
  }

  function getTopScoredSongs(numberOfSongs) {
    let orderedSongs = scoredSongs.slice();
    orderedSongs.sort((a,b)=> b.totalScore - a.totalScore);
    return orderedSongs.slice(0, numberOfSongs) // array of song objects, ordered from highest totalScore
  }

  function putSongsInSets(songs) {
    if (songs.length !== numSongs) return;
    const songsPerSet = Math.floor(songs.length / state.numSets);
    return new Array(parseInt(state.numSets)).fill("").map((_, i) => {
      return songs.slice(i * songsPerSet, (i+1) * songsPerSet) // returns an array of numSet arrays of song objects
    })
  }

  let songsInSets = [];

  if (state.randomSetlist) {
    let songs = getRandomSongs(numSongs);
    songsInSets = putSongsInSets(songs);
  } else {
    let topSongs = getTopScoredSongs(numSongs);
    songsInSets = putSongsInSets(topSongs);

  }

  return (
    <div>
        {songsInSets.map((set, index) => (
        <>
          <h1>Set {index + 1}</h1>
          <ol>{set.map((song) => <li key={song.name}>{song.name}</li>)}</ol>
        </>
      ))}
    </div>
  );

}
