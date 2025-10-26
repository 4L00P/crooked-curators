import React from "react";
import { useSocketContext } from "../context";
import { Button } from "../antdComponents";

const PlayAgainButton: React.FC = () => {
  const { socket } = useSocketContext();

  const toLobby = () => {
    // restarting the game brings everyone to the lobby again
    socket?.emit('toLobby');
  }

  return (
    <Button
      onClick={toLobby}
      variant="solid"
      color="primary"
      style={{
        backgroundColor: "var(--nav)",
        borderRadius: 8,
        paddingBlock: 20,
        paddingInline: 30,
      }}
    >
      <h3>Play Again</h3>
    </Button>
  );
};

export default PlayAgainButton;
