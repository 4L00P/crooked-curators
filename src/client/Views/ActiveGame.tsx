// The Active Game View that holds that canvas and reference image

import React from 'react';

import {
  Col, Row, Flex
} from '../antdComponents';

// COMPONENTS
import Canvas from '../Components/Canvas';
import Reference from '../Components/Reference';

const ActiveGame: React.FC = () => {

  // --------------------[RENDER]---------------------

  return (
    <>
      <Flex gap="middle" align="center" vertical>
        <Flex
          style={{ width: 500 }}
          justify='space-evenly'
          align='center'
        >
          <Reference />
        </Flex>
      </Flex>
      <Canvas />
    </>
  );
};

export default ActiveGame;
