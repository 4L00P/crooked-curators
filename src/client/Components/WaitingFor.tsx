// Wasiting page that shows up while either: 
// curator is selecting or while artists are painting

import React from "react";
import { Card, Flex } from '../antdComponents'

// import the game context
import { useGameContext } from "../context";

const WaitingFor = () => {

  const { game } = useGameContext();
  // waiting on will either be 'curator' or 'artists'
  let waitingOn = 'curator'

  // if the game context role is 'artist'
  if (game.role === 'artist'){
    waitingOn = 'curator'
  }
  
  // if the game context role is 'curator'
  if (game.role === 'curator'){
    waitingOn = 'artists'
  }
  
  
  return (
    
      <Flex align='center'>

        <Card style={{ width: 300 }}>
          <h3> Waiting for {waitingOn}... </h3>
        </Card>

      </Flex>
  
  );
};

export default WaitingFor;