// Gallery that shows all round winners and their ribbons after the last round in a carousel

import React, { useEffect } from "react";
import { useState } from 'react';

import {
  Carousel,
  Col,
  Flex,
  Button
} from "../antdComponents";

import Artwork from "./Artwork";

import { useGameContext, useSocketContext } from '../context';

import { Artwork as ArtworkTypes } from './types';
import axios from "axios";

// flex styling
const galleryStyle: React.CSSProperties = {
  width: '100%',
  //height: 550,
  height: '100%',
  borderRadius: 6,
};

const FAKE_ARTWORKS: ArtworkTypes[] = [
  {
    id: 'user_001',
    source: "https://cdnb.artstation.com/p/assets/images/images/069/944/967/large/brigid-whelan-13.jpg?1701365485",
    status: 'FORGERIES'
  },
  {
    id: 'user_002',
    source: "https://cdnb.artstation.com/p/assets/images/images/074/989/221/original/s-norris-bracken-lurk.gif?1713454142",
    status: 'FORGERIES'
  },
  {
    id: 'user_003',
    source: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyJvc2XslFHwcs2lV3EfqW0aOfLUify1cXcA&s",
    status: 'FORGERIES'
  },
  {
    id: 'user_004',
    source: "https://i.pinimg.com/736x/2f/e0/ef/2fe0efebfb8bee8a2d6e22689e2baf5b.jpg",
    status: 'FORGERIES'
  },
  {
    id: 'user_005',
    source: "https://cdna.artstation.com/p/assets/images/images/069/944/924/large/brigid-whelan-05.jpg?1701365422",
    status: 'FORGERIES'
  },
  {
    id: 'user_006',
    source: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrC8lQyW352uBDaumGVLgobnGrGt1ZIMOoKQ&s",
    status: 'FORGERIES'
  },
  {
    id: 'user_007',
    source: "https://pbs.twimg.com/media/G0lht5cWsAEE4eu.jpg",
    status: 'FORGERIES'
  },
  {
    id: 'user_008',
    source: "https://cdnb.artstation.com/p/assets/images/images/050/783/673/large/wong-le-yi-grace-image-6487327-1.jpg?1655700516&dl=1",
    status: 'FORGERIES'
  },
  {
    id: 'user_009',
    source: "https://i.ytimg.com/vi/5U_NQmpFOtI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBhJ8HuHgfqisDRHkV-LOyNU-nZAw",
    status: 'FORGERIES'
  },
  {
    id: 'user_010',
    source: "https://external-preview.redd.it/astarion-in-gartic-phone-by-me-v0-YXJ5OHU1b2ZhZWFkMcEFozTq7n1vsj0ZWIvKWj9_7TGytSR9FnVHV7IroSSq.png?format=pjpg&auto=webp&s=d40c828d8f5fffc71ae9629201991031a0a0ecf6",
    status: 'FORGERIES'
  }
];

type ArtworkCardProps = {
  artwork: ArtworkTypes;
  size: number;
}

const Gallery: React.FC = ({artwork, size}: ArtworkCardProps) => {

  const [galleryArtworks, setGalleryArtworks] = useState([])

  const { socket } = useSocketContext();
  const { code } = useGameContext().game;

  const onChange = (currentSlide: number) => {
    // console.log(currentSlide);
  };

  const toLobby = () => {
    // restarting the game brings everyone to the lobby again
    socket?.emit('toLobby');
  }

  const handleGameArtworks = () => {

    // request artworks from server
    axios.get(`/artworks/gallery/${code}`)
      .then(({ data }) => {
        setGalleryArtworks(data);
      })
      .catch((err: Error) => {
        console.error('Failed to GET all artworks for Gallery: CLIENT:', err);
      });
  }

  useEffect(() => {
    handleGameArtworks();
  }, [])

  return (
    <>
      <Flex gap="middle" align="center" vertical>
        <Flex style={galleryStyle} justify='space-evenly' align='center'>
          <Col>
            <h2>Ribbon Winners:</h2>
            List Ribbon Winners
      
            <Carousel
              arrows
              infinite={true}
              draggable={true}
              style={{ width: 1280, height: 720 }}
              autoplay>
              {
                galleryArtworks.map((artwork) => {
                  return (
                    <Artwork key={artwork.id.toString()} artwork={artwork} size={{ width: 1280, height: 720 }}/>
                  );
                })
              }
            </Carousel>
       
              <Button
                onClick={toLobby}
                variant="solid"
                color="primary"
                style={{
                  width: 200,
                  height: 50,
                  borderRadius: 8
                }}
              >
                Play Again
              </Button>
          </Col>
        </Flex>
      </Flex>
    </>
  );
}

export default Gallery;
