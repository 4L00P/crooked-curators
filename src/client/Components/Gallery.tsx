// Gallery that shows all round winners and their ribbons after the last round in a carousel

import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Carousel,
  Col,
  Row,
  Flex,
  Button,
  Image,
  Card,
} from "../antdComponents";

const { Meta } = Card;

import Artwork from "./Artwork";
import Players from "./Players";

import { useGameContext } from "../context";

import { Artwork as ArtworkTypes } from "./types";
import axios from "axios";

// flex styling
const galleryStyle: React.CSSProperties = {
  width: "100%",
  //height: 550,
  height: "100%",
  borderRadius: 6,
};

type ArtworkCardProps = {
  artwork: ArtworkTypes;
  size: number;
};

const Gallery: React.FC = ({ artwork, size }: ArtworkCardProps) => {
  const [galleryArtworks, setGalleryArtworks] = useState([]);

  const { code } = useGameContext().game;

  const onChange = (currentSlide: number) => {
    // console.log(currentSlide);
  };

  const handleGameArtworks = () => {
    // request artworks from server
    axios
      .get(`/artworks/gallery/${code}`)
      .then(({ data }) => {
        setGalleryArtworks(data);
      })
      .catch((err: Error) => {
        console.error("Failed to GET all artworks for Gallery: CLIENT:", err);
      });
  };

  useEffect(() => {
    handleGameArtworks();
  }, []);

  return (
    <>
      <Flex gap="middle" align="center" vertical>
        <Flex style={galleryStyle} justify="space-evenly" align="center">
          <Col>
            <Row justify="space-evenly" gutter={16}>
              <Col>
                <Flex justify="center" vertical>
                  <h2 style={{textAlign:"center"}}>Ribbon Winners:</h2>
                  <Players />
                </Flex>
              </Col>
              <Col>
                <Carousel
                  arrows
                  infinite={true}
                  draggable={true}
                  style={{ width: 1024, height: 576 }}
                  autoplay
                >
                  {galleryArtworks.map((artwork) => {
                    return (
                      <Artwork
                        key={artwork.id.toString()}
                        artwork={artwork}
                        size={{ width: 1024, height: 576 }}
                      />
                    );
                  })}
                </Carousel>
              </Col>
            </Row>
            <br />
            <Row justify="space-evenly">
              {galleryArtworks.map((artwork) => {
                return (
                  <Image
                    width={250}
                    src={artwork.source}
                    key={artwork.id.toString()}
                  ></Image>
                );
              })}
            </Row>

            <Row style={{marginTop: 50}}>
              <Link to="/" className="site-title" reloadDocument={true}>
                <Button
                  variant="solid"
                  color="primary"
                  style={{
                    backgroundColor: "var(--nav)",
                    borderRadius: 8,
                    paddingBlock: 20,
                    paddingInline: 30,
                  }}
                >
                  <h3>Exit to Homepage</h3>
                </Button>
              </Link>
            </Row>
          </Col>
        </Flex>
      </Flex>
    </>
  );
};

export default Gallery;
