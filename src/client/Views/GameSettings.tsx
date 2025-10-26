// Game Settings Page that pops up after hitting 'Create Game'
import React from "react";

// context
import { useSocketContext } from "../context";
// UI
import { Button, Typography, Flex, Card } from '../antdComponents'
// COMPONENTS
import JoinedPlayers from "../Components/JoinedPlayers";

const GameSettings = ({roomCode, players}) => {

  const { socket } = useSocketContext();

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
      </Flex>
    </div>
  );
};

export default GameSettings;
