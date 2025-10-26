import React, { useEffect } from "react";
import { useState } from 'react';
import axios from "axios";

import { useGameContext } from '../context';

const Player = ({ player }: any) => {

  // --------------------[STATES]---------------------

  const [points, setPoints] = useState(0);
  const { code } = useGameContext().game

  // -------------------[HANDLERS]--------------------

  const handlePlayerPoints = () => {
    axios.get(`/artworks/points/${player.id}/${code}`)
      .then(({ data }) => {
        // set state with player's points
        setPoints(data);
      })
  }

  useEffect(() => {
    handlePlayerPoints();
  }, [])

  return (
    <>
      <h3>{player.username} - {points}</h3>
    </>
  )
}

export default Player;
