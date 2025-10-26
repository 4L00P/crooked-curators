// Reference image that will show on artist view and curator view after a reference is picked from reference search

import React from "react";
import { Image, Card } from "../antdComponents";
import { useGameContext } from "../context";

import Mona_Loser_Pick from "../../assets/images/Mona_Loser_Pick.png";
import Mona_Loser_Wait from "../../assets/images/Mona_Loser_Wait.png";

type props = {
  title: string;
  image: string;
  description: string;
};

const Reference = (props) => {
  const { game } = useGameContext();
  let { title, image, description } = props;
  if (!title) {
    title = game.role === 'curator' ? "No Reference Selected" : "Waiting for Curator to Select Reference...";
    image = game.role === 'curator' ? Mona_Loser_Pick : Mona_Loser_Wait;
  }
  title = game?.reference?.title ?? title;
  image = game?.reference?.src ?? image;
  return (
    <Card title={title} style={{textAlign:'center'}}>
      <Image src={image} style={{maxHeight: "40vh"}}/>
    </Card>
  );
};

export default Reference;
