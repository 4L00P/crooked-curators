// The Active Game View that holds that canvas and reference image

import React from 'react';
import { useState } from 'react';

import {
  Card, Col, Row, Flex
} from '../antdComponents';

// COMPONENTS
import Canvas from '../Components/Canvas';
import Reference from '../Components/Reference';
import ToJudging from '../Components/ToJudging';

type ActiveGameProps = {
  handleArtworks: () => void;
};

const ActiveGame: React.FC = () => {

  // --------------------[STATES]---------------------

  const [playerCount, setPlayerCount] = useState(1);
  const [done, setDone] = useState(0);

  // -------------------[HANDLERS]--------------------

  const handleDone = () => {
    setDone(done + 1);
  }

  // --------------------[RENDER]---------------------

  return (
    <>
      <Row gutter={2}>
        <Col span={3}>
          <Card>
          </Card>
        </Col>
        <Col span={18}>
          <Card >
            <Flex gap="middle" align="center" vertical>
              <Flex
                style={{width: 500}}
                justify='space-evenly'
                align='center'
              >
                <Reference />
              </Flex>
            </Flex>
            <Canvas handleDone={handleDone} />
          </Card>
        </Col>

        <Col span={3}>
          <Card >
            <ToJudging
              done={done}
              playerCount={playerCount}
              /* isCurator prop is not being used atm */
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ActiveGame;
