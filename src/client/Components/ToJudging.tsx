import React from "react";

import { Button } from "../antdComponents";

import { useSocketContext } from "../context";

type ToJudgingProps = {
  done: number;
  playerCount: number;
  // isCurator: boolean; // not being used atm
};

const ToJudging = ({ done, playerCount }: ToJudgingProps) => {
  
  const { socket } = useSocketContext();

  const handleClick = () => {
    socket?.emit("toJudging");
  };

  // --------------------[RENDER]---------------------

  if (done === playerCount) {
    return (
      <Button onClick={handleClick}>
        Judging Time!
      </Button>
      );
  } else {
    return (
      <Button disabled>
        {done} / {playerCount}
      </Button>
    );
  }
};

export default ToJudging;
