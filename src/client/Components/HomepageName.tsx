import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { useUserContext } from '../context';

import { Card, Flex, Col, Button, ReloadOutlined } from '../antdComponents';


const randomizerStyle: React.CSSProperties = {
  width: '100%',
  height: 75,
  borderRadius: 6
};

const HomepageName = ({ randomName, handleRandomizeName }) => {

  // user context
  const { loggedIn, username } = useUserContext().user

  // if the loggedIn bool is false or the username is undefined don't render
  if (!loggedIn || username === undefined){
    return null;
  }

  return (
    <Flex style={randomizerStyle} justify="center" align="center">
      <Col>
        <Card
          style={{ width: 250, height: 50, textAlign: "center" }}
          size="small"
        >
          <h2
            style={{
              fontSize: "15px",
              marginTop: "1px",
            }}
          >
            {randomName}
          </h2>
        </Card>
      </Col>
      <Col>
        <Button onClick={handleRandomizeName}>
          <ReloadOutlined />
        </Button>
      </Col>
    </Flex>
  );
};

export default HomepageName;
