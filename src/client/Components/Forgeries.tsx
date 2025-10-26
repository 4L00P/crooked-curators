// Displays all artworks as forgeries

import React from 'react';
import { useState } from 'react';

import { useDroppable } from '@dnd-kit/core';

import Artwork from './Artwork';

import {
  Flex,
  FlexProps,
  Row,
  Col
} from '../antdComponents'

import { Ribbon as RibbonType, Artwork as ArtworkTypes } from './types'

const ribbonsStyle: React.CSSProperties = {
  minWidth: 1000,
  minHeight: 500,
};

type ArtworkStatusProps = {
  status: RibbonType;
  artworks: ArtworkTypes[];
}

export function Forgeries({ status, artworks }: ArtworkStatusProps) {

  // -------------------[HANDLERS]--------------------

  const { setNodeRef } = useDroppable({
    id: status.id
  })

  // --------------------[RENDER]---------------------

  return (
    <>
      <div ref={setNodeRef}>
      <Flex gap="middle" align="center" vertical>
        <Flex style={ribbonsStyle} justify='space-evenly' align='flex-start'>
          <Col>
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

export default Forgeries;
