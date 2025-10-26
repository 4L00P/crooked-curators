// Game Settings Page that pops up after hitting 'Create Game'
import React from "react";

// context
import { useSocketContext, useGameContext, useUserContext } from "../context";
// UI
import { Button, Typography, Flex, Card } from '../antdComponents'
// COMPONENTS
import JoinedPlayers from "../Components/JoinedPlayers";

const GameSettings = ({roomCode, players}) => {

  const { socket } = useSocketContext();
  const { username } = useUserContext().user;

  const startGame = () => {
    // emit a nextStage event to server
    socket?.emit('startGame')
  }

  return (
    <div>
      <Flex align='center' justify='center'>
        <Card 
          type="inner" 
          title="ROOM CODE"
          style={{ width: 250, textAlign:'center' }}
        >
          <Typography.Title level={2} copyable>{roomCode}</Typography.Title>
        </Card>
      </Flex>

      <br></br>
      <JoinedPlayers players={players} />
      <br></br>

      <Flex align='right' justify='right'>
        <div style={{
          display: username === players[0] ? 'block' : 'none'
        }}>
          <Button 
            type='primary'
            onClick={startGame}
            disabled={!socket || !roomCode}
            style={{
              backgroundColor: "var(--nav)",
              borderRadius: 8,
              paddingBlock: 20,
              paddingInline: 30,
            }}
          >
            <h3>Start Game!</h3>
          </Button>
        </div>

        <div style={{
          display: username === players[0] ? 'none' : 'block'
        }}>
          <h3> Wait for the host to start the game... </h3>
        </div>
      </Flex>


    </div>
  );
};

export default GameSettings;
