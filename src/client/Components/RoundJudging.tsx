// At the end of a round, all artworks are displayed here for judging

import React, { useEffect } from 'react';
import { useGameContext, useSocketContext } from '../context';

import {
  Divider,
  Flex,
} from '../antdComponents';

import { DndContext, DragEndEvent } from '@dnd-kit/core';

// -------------------[COMPONENTS]------------------

import Ribbon from './Ribbon';
import Forgeries from './Forgeries';
import LockInJudging from './LockInJudging';

// ---------------------[TYPES]---------------------

import { Artwork as ArtworkTypes, Ribbon as RibbonTypes } from './types';

// ---------------------[STYLE]---------------------

const ribbonsStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  marginTop: 10
};

// --------------------[STATUS]---------------------

const STATUS = [
  {
    id: 'FORGERIES',
    color: 'FORGERIES',
    title: 'Forgeries',
    points: 0
  },
]

// -------------------[COMPONENT]-------------------

const RoundJudging: React.FC = () => {

  // -------------------[CONTEXT]---------------------

  const { ribbons, playerArtworks } = useGameContext().game;
  const { socket } = useSocketContext();
 
  
  // -------------------[HANDLERS]--------------------


  // handles changing artwork's status upon dropping it in a container
  const handleDragEnd = (e: DragEndEvent) => {

    const { active, over } = e;

    if (!over) return;

    // grabs artwork's id for reference to change
    const artworkId = active.id as string;
    // grabs the STATUS/RIBBON color for dropped column
    const newStatus = over.id as ArtworkTypes['status'];


    // function that updates the artwork status with RED, WHITE, or BLUE
    const mapArtworks = () => {
      // update the status of the artwork for drag
      return playerArtworks.map(artwork => artwork.id === artworkId ? { ...artwork, status: newStatus } : artwork)
    }

    // dragArtwork sends the artworks with updated status 
    // the socket emits back 'artworkContext' which updates for everyone in the room
    socket?.emit('dragArtwork', mapArtworks());

  }


 
  // --------------------[RENDER]---------------------

  return (
    <>
      <Flex gap="middle" align="center" vertical>
        <Flex style={ribbonsStyle} justify='space-evenly' align='center'>
          <LockInJudging />
        </Flex>
      </Flex>
      <br />
      <DndContext onDragEnd={handleDragEnd}>
        <Flex gap="middle" align="center" vertical>
          <Flex style={ribbonsStyle} justify='space-evenly' align='center' gap="middle" wrap={true}>
            {ribbons.map((ribbon) => {
              return (
                <Ribbon
                  key={ribbon.color}
                  ribbon={ribbon}
                  artworks={playerArtworks.filter(artwork => artwork.status === ribbon.color)} 
                />
              )
            })}
          </Flex>
        </Flex>
        <Divider variant="dotted" style={{ borderColor: '#3B262C' }}>
          Forgeries
        </Divider>
        <Flex gap="middle" align="center" vertical>
          <Flex wrap style={ribbonsStyle} justify='space-evenly' align='center'>
            {STATUS.map((status) => {
              return (
                <Forgeries
                  key={status.id}
                  status={status}
                  artworks={playerArtworks.filter(artwork => artwork.status === status.color)} />
              )
            })}
          </Flex>
        </Flex>
      </DndContext>
    </>
  )
}

export default RoundJudging;
