// Displays 3 random ribbons pulled from the database. One blue, one red, one white.

import React, { useEffect } from 'react';

import { useDroppable } from '@dnd-kit/core';

import Artwork from './Artwork';

import {
  Flex,
  FlexProps,
  Col,
  Row,
} from '../antdComponents'

import { Ribbon as RibbonType, Artwork as ArtworkTypes} from './types'

const ribbonsStyle: React.CSSProperties = {
  width: 450,
  height: 350,
};

type RibbonProps = {
  ribbon: RibbonType;
  artworks: ArtworkTypes[];
}

export function Ribbon({ribbon, artworks}: RibbonProps) {


  // -------------------[HANDLERS]--------------------

  const { setNodeRef } =useDroppable({
    id: ribbon.color
  })

  // --------------------[RENDER]---------------------

  return (
    <>
    <div ref={setNodeRef}>
      <Flex gap="middle" align="center" style={{marginTop: 40}} vertical>
        <Flex style={ribbonsStyle} justify='space-between' align='flex-start'>
          <Col>
            <Row>
              <img src={ribbon.source} style={{ width: 100 }}/>
              <h2>{ribbon.description}</h2>
            </Row>
            <Row>
              {artworks.map(artwork => {
                return <Artwork key={artwork.id} artwork={artwork} size={{ width: 350 }} />
              })}
            </Row>
          </Col>
        </Flex>
      </Flex>
    </div>
    </>
  )
};

export default Ribbon;
