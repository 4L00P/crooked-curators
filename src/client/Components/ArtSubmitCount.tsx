import React from 'react';
import { useGameContext} from '../context';

import ToJudging from './ToJudging';

import {
  Card, Flex
} from "../antdComponents"

const ArtSubmitCount:React.FC = () => {

  const { doneCount, players, role } = useGameContext().game;

  if (role === "artist"){
    return (
      <Card
        size="small"
        style={{
          textAlign:'center'
        }}
      >
        <h3> Pieces Submitted: {doneCount}/{players.length - 1} </h3>
      </Card>
    )
  }

  return (
    <Card size="small">
      <Flex justify='center' vertical>
        <h3> Pieces Submitted: {doneCount}/{players.length - 1} </h3>
        
        {/* <div style={{display: doneCount === players.length - 1 ? 'flex' : 'none'}}> */}
          <ToJudging/>
        {/* </div> */}

      </Flex>
    </Card>
  )
}

export default ArtSubmitCount;
