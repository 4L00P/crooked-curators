import React from 'react';
import { Navigate } from 'react-router-dom';

import { useGameContext } from './context';

const SwitchView: React.FC = ({ view }) => {

  const { role, stage } = useGameContext().game;
  //const { role, stage } = view
  
  // new logic - based on game context 
  if (stage === 'reference' && role === 'curator'){
    return <Navigate to={'/curator'} /> 
  }

  if (stage === 'reference' && role === 'artist'){
    return <Navigate to={'/game'} />
  }

  if (stage === 'judging'){
    return <Navigate to={'/judging'} /> 
  }

  if (stage === 'gallery'){
    return <Navigate to={'/gallery'} />
  }

  if (stage === 'lobby'){
    return <Navigate to={'/game-settings'} />
  }

};

export default SwitchView;