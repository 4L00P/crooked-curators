import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Col, Row, Button, Tooltip } from "../antdComponents";

import { useSocketContext } from "../context";

type ToJudgingProps = {
  done: number;
  playerCount: number;
  // isCurator: boolean; // not being used atm
  handleArtworks: () => void;
};

const ToJudging = ({ done, playerCount, handleArtworks }: ToJudgingProps) => {
  
  const { socket } = useSocketContext();

  const handleClick = () => {
    handleArtworks();
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
