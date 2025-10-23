import React from 'react';

import { useUserContext } from '../context';

import { Card, Flex, Col, Row, Button, ReloadOutlined } from '../antdComponents';


const randomizerStyle: React.CSSProperties = {
  width: '100%',
  height: 75,
  borderRadius: 6,
  marginTop: 30
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
        <Row justify="center">
          <h3 style={{
            textAlign:"center",
            alignItems:"center"
            }}
          >
            Pick a random username to join as!
          </h3>
        </Row>

        <Row>
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

          <Button onClick={handleRandomizeName}>
            <ReloadOutlined />
          </Button>
        </Row>

        </Col>
    </Flex>
  );
};

export default HomepageName;
