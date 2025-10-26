// Reference image that will show on artist view and curator view after a reference is picked from reference search

import React from "react";
import { Image, Card } from "../antdComponents";
import { useGameContext } from "../context";

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
    image =
      "https://www.farmersalmanac.com/wp-content/uploads/2020/11/Starry-Night-Van-Gogh-Which-Stars-GoogleArtProject-1536x817.jpg";
    description = "Weird Al!";
  }
  title = game?.reference?.title ?? title;
  image = game?.reference?.src ?? image;
  return (
    <Card title={title} >
      <Image src={image} style={{maxHeight: "40vh"}}/>
    </Card>
  );
};

export default Reference;
