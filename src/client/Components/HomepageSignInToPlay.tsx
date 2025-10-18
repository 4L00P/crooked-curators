// Card that covers the create and start if user is not signed in

import React from "react";
import { useState} from "react";

import { useUserContext } from "../context";

import { Card, Flex, Col, Row, Button } from '../antdComponents'

import SignInButton2 from "./SignInButton2";

const joinCreateStyle: React.CSSProperties = {
  width: "100%",
  height: 350,
};

const buttonStyle: React.CSSProperties = {
  width: '100%',
  height: 50
}

const HomepageSignInToPlay = () => {

  // user context
  const { loggedIn, username } = useUserContext().user

  // if loggedIn bool is true and the username is NOT undefined don't render
  if (loggedIn && username !== undefined){
    return null;
  }

  return (
    
      <Flex style={joinCreateStyle} justify="center" align="center">
        <Col>

    
          <Card style={{ width: 300, textAlign: "center" }} >
            <h2> Sign in to Create or Join a Game </h2>
          </Card>
 
          <Flex style={buttonStyle} justify="center" align="center">
            <SignInButton2 />
          </Flex>

        </Col>
      </Flex>
  
  );
};

export default HomepageSignInToPlay;