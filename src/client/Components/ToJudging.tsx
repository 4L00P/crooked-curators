import React from "react";

import { Button, Popconfirm } from "../antdComponents";

import { useSocketContext } from "../context";

const ToJudging = () => {
  const { socket } = useSocketContext();

  const goToJudging = () => {
    socket?.emit("toJudging");
  };

  // --------------------[RENDER]---------------------

  return (
    <Popconfirm
      title="Ready to move to judging?"
      onConfirm={goToJudging}
      onCancel={() => {}}
      okText="Yes"
      cancelText="No"
    >
      <Button
        type="primary"
        variant="solid"
        color="primary"
        style={{
          paddingBlock: 20,
          paddingInline: 30,
        }}
      >
        <h3>Judging Time!</h3>
      </Button>
    </Popconfirm>
  );
};

export default ToJudging;
