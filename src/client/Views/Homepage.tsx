// Page that holds the choose avatar, join game, create a game menu

import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';


import {
  Button,
  ReloadOutlined,
  Flex,
  FlexProps,
  Row,
  Col,
  Card,
  Input,
  Space
} from '../antdComponents';

// import the user context
import { useUserContext } from "../context";

import { FaArrowCircleRight } from 'react-icons/fa';

import AvatarPicker from '../Components/AvatarPicker';
import HomepageSignInToPlay from '../Components/HomepageSignInToPlay';
import HomepageCreateJoin from '../Components/HomepageCreateJoin';
import HomepageName from '../Components/HomepageName';
import HowToPlay from '../Components/HowToPlay';

// styling

const largeStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  borderRadius: 6
};

const titleStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  borderRadius: 6
};

const buttonStyle: React.CSSProperties = {
  width: '100%',
  height: 50
};


const Homepage: React.FC = () => {

  // --------------------[STATES]---------------------
  
  const [randomName, setRandomName] = useState('');


  // --------------------[HANDLERS]--------------------


  const handleRandomizeName = () => {
    axios.get('/name-randomizer').then(res => {
      setRandomName(res.data);
    });
  };

  useEffect(() => {
    handleRandomizeName();
  }, []);

  // --------------------[RENDER]---------------------

  return (
    <Flex>
      <Flex style={largeStyle} justify="center" align='flex-start'>
        <Col>
          <Row>
            <Flex style={titleStyle} justify="center" align='flex-center'>
              <h1>Welcome to Crooked Curators!</h1>
            </Flex>
          </Row>
          <Row gutter={15}>
            <HomepageName 
              randomName={randomName}
              handleRandomizeName={handleRandomizeName}
            />
          </Row>
          <Row>
            <HomepageCreateJoin randomName={randomName} />
            <HomepageSignInToPlay />
          </Row>
          <Row>
            <HowToPlay />
          </Row>
        </Col>
      </Flex>
    </Flex>
  );
};

export default Homepage;
