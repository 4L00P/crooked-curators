import React from "react";
import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import axios from "axios";
import { Socket, io } from "socket.io-client";

import {
  Layout,
  theme,
  Content,
  Footer,
} from "./antdComponents";


// -------------------[COMPONENTS]------------------
import NavBar from "./Components/NavBar";
import SwitchView from "./SwitchView";

import Homepage from "./Views/Homepage";
import Profile from "./Views/Profile";
import GameSettings from "./Views/GameSettings";
import ActiveGame from "./Views/ActiveGame";
import RoundJudging from "./Components/RoundJudging";
import Gallery from "./Components/Gallery";
import CuratorSearch from "./Components/CuratorSearch";

// Context imports
import {
  User,
  UserContext,
  useUserContext,
  fetchUser,
  Game,
  Player,
  GameContext,
  useGameContext,
  SocketContext,
} from "./context";

const App: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // --------------------[STATES]---------------------

  const [user, setUser] = useState<User>({
    username: null,
    loggedIn: false,
  });

  /* represent connected status with socketId on UI (note: this is reactive as opposed to socketRef. 
      no re-render will occur for anything related to socketRef - good for performance) */
  const [userSocketId, setUserSocketId] = useState<string | null>(null);
  /*
   * anyone who opens app upon login:
   * 1. create socket
   * 2. update user with socket id (add to state)
   * 3. fetch user
   *
   * if creating game
   * 4. create game - http
   * 5. join game
   *
   * if joining game
   * 4. join game
   */

  const [game, setGame] = useState<Game>({
    code: "",
    stage: "lobby",
    curator: null,
    role: null,
    ribbons: [],
    players: [],
    reference: {
      title: null,
      src: null,
    },
    playerArtworks: []
  });

  // socket connection state
  const [isConnected, setIsConnected] = useState(socket?.connected || false);
  // game code state
  const [roomCode, setRoomCode] = useState("");
  // players state
  const [players, setPlayers] = useState([]);


  // view state - tied to game context
  const [view, setView] = useState({});

  // --------------------[SOCKET LISTENERS]---------------------
  useEffect(() => {
    if (socket) return; // socket already exists
    const newSocket = io(); // connect to the server that served the page
    setSocket(newSocket);

    // --------FUNCTIONS FOR SOCKET LISTENERS ----------

    const onConnect = async () => {
      if (!newSocket.id) {
        console.error("Socket ID is not available");
        return;
      }
      /* below we know we have access to the id because we are inside the 
      connect listener that tells us a connection has been established successfully */
      console.log("socket", newSocket.id);
      setIsConnected(true);

      try {
        console.log("SOCKO", newSocket.id);

        /* now that we know the socket id we can update the user with it */
        axios.patch("/api/user/socketId", { socketId: newSocket.id });
        setUserSocketId(newSocket.id);

        /* order is important. we need to fetch the user after attaching
        the socketId if we want access to the socketId on the user in the client (hint, hint) */
        const { data } = await fetchUser();
        // update the user context to align with db
        setUser({ username: data.username, loggedIn: true });

        // error handling
      } catch (err) {
        console.error("Error initializing socket:", err);
        setUser({ username: null, loggedIn: false });
      }
    };

    
    function getRoomDetails(roomCodeObj) {
      console.log("game info from server", roomCodeObj);
      // update the room code
      setRoomCode(roomCodeObj.roomCode);
      // update players array
      setPlayers(roomCodeObj.players);
    }

    function roundAdvance(roundInfo) {
      console.log("round advancing");
      // update the game context
      setGame(roundInfo);
      // change view to the new stage
      setView(roundInfo);
    }

    function referenceSelected(ref) {

      setGame((oldGame) => ({ ...oldGame, reference: ref }))
    }

    function stageAdvance(stage) {
      // set game stage to whatever is sent from server
      setGame((oldGame) => {
        // send updated game info to setView
        setView({ ...oldGame, stage: stage })
        // update game context
        return { ...oldGame, stage: stage }
      })

    }

    function artworkContext({playerArtworks}) {
      // add the round artworks to the game context
      setGame((oldGame) => ({...oldGame, playerArtworks: playerArtworks}))

    }

    // SOCKET ON
    newSocket.on("connect", onConnect);
    newSocket.on("referenceSelected", referenceSelected);
    newSocket.on("sendRoomDetails", getRoomDetails);
    newSocket.on("newRound", roundAdvance);
    newSocket.on("stageAdvance", stageAdvance);
    newSocket.on("artworkContext", artworkContext);

    // SOCKET OFF
    return () => {
      newSocket.off("connect", onConnect);
      newSocket.off("referenceSelected", referenceSelected);
      newSocket.off("sendRoomDetails", getRoomDetails);
      newSocket.off("newRound", roundAdvance);
      newSocket.off("stageAdvance", stageAdvance);
      newSocket.on("artworkContext", artworkContext);

      setUserSocketId(null);
    };
  }, []);


  // --------------------[RENDER]---------------------

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <GameContext.Provider value={{ game, setGame }}>
        <SocketContext.Provider value={{ socket, setSocket }}>

          <Layout>
            <NavBar />
            <div>{`User Context: ${user.username}, ${user.loggedIn
              } \n Game Context: ${Object.keys(game).map(
                (key) => key + ":" + game[key]
              )}`}</div>
            <Content
              style={{
                padding: "0 15%",
                color: "#3B262C",
              }}
            >
              <br />
              <div
                style={{
                  background: colorBgContainer,
                  minHeight: 280,
                  minWidth: 1100,
                  padding: 24,
                  borderRadius: 20,
                }}
              >
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route
                    path="/game-settings"
                    element={
                      <>
                        <SwitchView view={view} />
                        <GameSettings
                          roomCode={roomCode}
                          players={players}
                        />
                      </>
                    }
                  />
                  <Route path="/profile" element={<Profile />} />
                  <Route
                    path="/game"
                    element={
                      <>
                        <SwitchView view={view} />
                        <ActiveGame
                        />
                      </>
                    }
                  />
                  <Route
                    path="/judging"
                    element={
                      <>
                        <SwitchView view={view} />
                        <RoundJudging />
                      </>
                    }
                  />
                  <Route path="/gallery"
                    element={
                      <>
                        <SwitchView view={view} />
                        <Gallery />
                      </>
                    } 
                  />
                  <Route
                    path="/curator"
                    element={
                      <>
                        <SwitchView view={view} />
                        <CuratorSearch />
                      </>
                    }
                  />
                  <Route
                    path="*"
                    element={<p>There is nothing here: 404!</p>}
                  />
                </Routes>
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Crooked Curators ©{new Date().getFullYear()} Created by 4LOOP
            </Footer>
          </Layout>
        </SocketContext.Provider>
      </GameContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
