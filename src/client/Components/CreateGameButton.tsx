import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Flex } from '../antdComponents';

import axios from 'axios'

import { useSocketContext, useUserContext } from '../context';

const buttonStyle: React.CSSProperties = {
  width: '100%',
  height: 50,
  marginTop: 30
}

const CreateGameButton = ({username}) => {

  const { socket } = useSocketContext();
  const { setUser } = useUserContext();

  // send a request to /create-game
  // makes a room code and adds it to the db
  const handleCreateGame = () => {
    axios.post('/games/create')
    .then(({data}) => {
      console.log('create game info from client', data)
      // emit a join game from here
      // join with the roomCode that was just created
      socket?.emit('joinGame', {username: username, roomCode: data.gameCode})
      setUser({ username: username, loggedIn: true });
    })
    .catch((err) => {
      // can add client message for user (little popup)
      console.error('create game failed', err)
    })
    
  }

  return (
    <Flex style={buttonStyle} justify="center" align="center">
        <Link to='/game-settings' >

          <Button
            onClick={handleCreateGame}
            variant="solid"
            color="primary"
            style={{
              backgroundColor: "var(--nav)",
              borderRadius: 8,
              paddingBlock: 20,
              paddingInline: 30,
            }}
          >
            <h3>Create a Game!</h3>
          </Button>

        </Link>
    </Flex>
  )
}


export default CreateGameButton;

