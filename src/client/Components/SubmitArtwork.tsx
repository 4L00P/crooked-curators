import React from 'react';
import { useState } from 'react';

// ui
import { Button, Tooltip } from '../antdComponents';
import { FaCheck } from "react-icons/fa";

const SubmitArtwork = (props) => {

  const { handleSubmitImage, isCurator } = props

  // --------------------[STATES]---------------------

  // to disable button upon clicking
  const [submitted, setSubmitted] = useState(false);

  // -------------------[HANDLERS]--------------------

  const handleSubmit = () => {

    // update state to disable button
    setSubmitted(true);

    // initiate saving of the canvas to the artwork/round
    handleSubmitImage();

  }

  // --------------------[RENDER]---------------------

  if(submitted === false){
    return (
      <Tooltip title="No other changes will be saved after clicking submit.">
        <Button onClick={handleSubmit}>
          <FaCheck />
        </Button>
      </Tooltip>
    )
  } else if(isCurator === true){
    return (
      <Tooltip title="Please wait while artists complete their forgeries!">
        <Button onClick={handleSubmit} disabled>
          <FaCheck />
        </Button>
      </Tooltip>
    )

  } else {
    return (
      <Tooltip title="Please wait while other's finish their artworks!">
        <Button onClick={handleSubmit} disabled>
          <FaCheck />
        </Button>
      </Tooltip>
    )
  }
}

export default SubmitArtwork;
