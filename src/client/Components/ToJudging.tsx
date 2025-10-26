import React from "react";

import { Button } from "../antdComponents";

import { useSocketContext, useGameContext } from "../context";

const ToJudging = () => {
  const { socket } = useSocketContext();
  const { doneCount, players } = useGameContext().game;

  const handleClick = () => {
    socket?.emit("toJudging");
  };

  // --------------------[RENDER]---------------------

  return (
    <Button
      onClick={handleClick}
      disabled={doneCount !== players.length - 1}
      variant="solid"
      color="primary"
      style={{
        backgroundColor: "var(--nav)",
        borderRadius: 8,
        paddingBlock: 20,
        paddingInline: 30,
      }}
    >
      <h3>Judging Time!</h3>
    </Button>
  );
};

export default ToJudging;
