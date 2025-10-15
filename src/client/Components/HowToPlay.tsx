// component with instructions on how to play

import React from "react";
import { useState } from 'react';

import {
  Flex,
  Row,
  Col
} from '../antdComponents';

// ---------------------[STYLE]---------------------

const boxStyle: React.CSSProperties = {
  // width: '75%',
  //height: 550,
  height: '100%',
  // borderRadius: 6,
};

// -------------------[COMPONENT]-------------------

const HowToPlay = () => {

  // --------------------[RENDER]---------------------
  return (
    <>
      <Flex gap="middle" align="center" vertical>
        <Flex style={boxStyle} justify='space-evenly' align='center'>
          <Col>
            <Row>
              <h1>The Premise</h1>
            </Row>
            <Row>
              <p>
                There is an art gallery in town opening tonight, but there are no pieces of art! You and your friends have cooked up a scheme to make forgeries to sell to the gallery! Compete with your friends to create the best forgeries.
              </p>
            </Row>
            <Row>
              <h1>How to Play</h1>
            </Row>
            <Row>
              <ul>
                <li>Create a Game or Join a Game with a game code</li>
                <li>Start the game!</li>
                <li>One person</li>
                <li>Create a Game or Join a Game with a game code</li>
              </ul>
            </Row>
          </Col>
        </Flex>
      </Flex>
    </>
  )

}

export default HowToPlay;
