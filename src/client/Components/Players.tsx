import React, { useEffect } from "react";
import { useState } from 'react';

import { useGameContext } from '../context';

import { Card } from "../antdComponents"

import Player from "./Player";

const Players = () => {

  // --------------------[STATES]---------------------

  const { players } = useGameContext().game

  // --------------------[RENDER]---------------------

  return (
    <Card>
      {players.map((player) => {
        return (
          <Player player={player} key={player.username}/>
        )
      })}
    </Card>
  );
}

export default Players;
