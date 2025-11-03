import React from 'react';
import { Navigate } from 'react-router-dom';

import { useGameContext } from './context';

const SwitchView: React.FC = ({ view }) => {
  // the view prop is just for the state change to activate the component
  // the actual served views are coming from the game context

  const { role, stage } = useGameContext().game;
  
  // when the stage is reference, there will be a diverging curator and artist view
  if (stage === 'reference' && role === 'curator'){
    return <Navigate to={'/curator'} /> 
  }

  if (stage === 'reference' && role === 'artist'){
    return <Navigate to={'/game'} />
  }

  // on the judging and gallery views, everyone is seeing the same thing
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
