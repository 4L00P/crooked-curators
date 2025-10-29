// component with instructions on how to play

import React from "react";

import {
  Flex,
  Row,
  Col,
  Card
} from '../antdComponents';

import { Timeline } from "antd";

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
    <Card style={{ marginRight: 25, marginLeft: 15 }}>
      <Flex gap="middle" align="center" vertical>
        <Flex style={boxStyle} justify='space-evenly' align='center'>
          <Col>
            <Row>
              <h2>The Premise</h2>
            </Row>
            <Row>
              <p>
                There is an art gallery in town opening tonight, but there are no pieces of art! You and your friends have cooked up a scheme to make forgeries to sell to the gallery! Compete with your friends to create the best forgeries.
              </p>
            </Row>
            <Row>
              <h2>How to Play</h2>
            </Row>
            <Row>
              <Timeline items={
                [
                  {
                    children: 'Start the game!'
                  },
                  {
                    children: 'Create a Game or Join a Game with a game code.'
                  },
                  {
                    children: 'One person will become the curator for the round and everyone else will be an artist!'
                  },
                  {
                    children: 'The artists will draw from the reference and submit their work when they are complete. *Note: SUBMISSIONS ARE FINAL AND CANNOT BE UNDONE.'
                  },
                  {
                    children: 'Once all artists are complete, the curator will assign up to three ribbons to artworks from the round.'
                  },
                  {
                    children: 'The three ribbons are Blue (Positive), White (Neutral), Red(Negative). ALL ribbons are worth different amounts of points, so a negative ribbon can be worth more that the positive ribbon in a round!'
                  },
                  {
                    children: 'Once ribbons are distributed, the next round begins and a new curator is picked.'
                  },
                  {
                    children: 'The number of rounds will be determined by how many players there are, so that each player can be a curator once.'
                  },
                  {
                    children: 'After all rounds are complete, there will be a gallery showing all of the artworks that won ribbons and the scoreboard of how many points each player earned.'
                  },
                ]
              }/>
            </Row>
          </Col>
        </Flex>
      </Flex>
    </Card>
  )

}

export default HowToPlay;
