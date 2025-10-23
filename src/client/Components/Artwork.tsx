// iterable component that renders only one artwork

import React, { useEffect } from "react";
import { useState } from 'react';

import { useGameContext } from '../context';

import { Artwork as ArtworkTypes } from './types'
import { useDraggable } from "@dnd-kit/core";

type StylingTypes = {
  width: number;
}

type ArtworkCardProps = {
  artwork: ArtworkTypes;
  size: StylingTypes;
}

const Artwork: React.FC = ({ artwork, size }: ArtworkCardProps) => {

  const { role } = useGameContext().game;

  const [isDisabled, setIsDisabled] = useState(false);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: artwork.id,
    disabled: isDisabled
  })

  const style = transform ? {
    transform: `translate(${transform.x}px, ${transform.y}px)`
  } : undefined

  useEffect(() => {
    if (role === 'artist') {
      setIsDisabled(true);
    }
  }, [])

  // destructure props
  return (
    <>
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
      >
        <img
          src={artwork.source}
          style={size}
        />
      </div>
    </>
  );
}

export default Artwork;
