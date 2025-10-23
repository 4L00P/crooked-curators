import React from "react";
import { useUserContext } from "../context";

// ANTD
import { Flex, Row, Col } from "../antdComponents";

// COMPONENTS
import CreateGameButton from "./CreateGameButton";
import GameCodeJoin from "./GameCodeJoin";

const joinCreateStyle: React.CSSProperties = {
  width: "100%",
  height: 200,
};

const HomepageCreateJoin = ({randomName}) => {

  // user context
  const { loggedIn, username } = useUserContext().user

  // if the loggedIn bool is false or the username is undefined don't render
  if (!loggedIn || username === undefined){
    return null;
  }

  return (
    <Flex style={joinCreateStyle} justify="center" align="center">
      <Col>
        <Row>
          <CreateGameButton username={randomName} />
        </Row>
        <p />
        <Row>
          <GameCodeJoin username={randomName} />
        </Row>
      </Col>
    </Flex>
  );
};

export default HomepageCreateJoin;
