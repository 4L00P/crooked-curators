import { createContext, useContext } from 'react';
import axios from 'axios';

import { Ribbon as RibbonType } from './Components/types';
import { Artwork as ArtworkType } from './Components/types';

// USER CONTEXT HANDLING

export interface User {
  username: string;
  loggedIn: boolean;
}

export interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const UserContext = createContext<UserContextType | null>(null);

export function useUserContext() {
  const user = useContext(UserContext);

  if (user === null) {
    throw new Error(
      'User is not defined. useUserContext must be used within a UserContext'
    );
  }
  return user;
}

export async function fetchUser() {
  const data = await axios.get('/auth/google/user')
  return data
}


// GAME CONTEXT HANDLING

export interface Player {
  id: number;
  socketId: string;
  username: string;
}

export interface Reference {
  title: string;
  src: string;
}

export interface Game {
  stage: string;
  code: string;
  role: string;
  ribbons: RibbonType[];
  curator: Player | null;
  players: Player[];
  doneCount: number;
  reference: Reference | { title: null; src: null;}
  playerArtworks: ArtworkType[];
  lastRound: boolean;
}

export interface GameContextType {
  game: Game;
  setGame: React.Dispatch<React.SetStateAction<Game>>;
}

export const GameContext = createContext<GameContextType | null>(null)

export function useGameContext() {
  const game = useContext(GameContext);

  if (game === null) {
    throw new Error('Stage is not defined. useGameContext must be used within a GameContext')
  }
  return game
}


import { Socket } from "socket.io-client";

// SOCKET CONTEXT HANDLING

export interface SocketContextType {
  socket: Socket | null;
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
}

export const SocketContext = createContext<SocketContextType | null>(null);

export function useSocketContext() {
  const socketContext = useContext(SocketContext);

  if (socketContext === null) {
    throw new Error('Socket is not defined. useSocketContext must be used within a SocketContext');
  }
  return socketContext;
}