// Page that holds the choose avatar, join game, create a game menu

import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import crookedCuratorsTitle from "../../assets/images/Crooked_Curators_Title.png";
import monaLoser from "../../assets/images/Mona_Loser_Frame.png";

import { Flex, Row, Col } from "../antdComponents";

import HomepageSignInToPlay from "../Components/HomepageSignInToPlay";
import HomepageCreateJoin from "../Components/HomepageCreateJoin";
import HomepageName from "../Components/HomepageName";
import HowToPlay from "../Components/HowToPlay";

// styling

const largeStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  borderRadius: 6,
};

const titleStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  borderRadius: 6,
};

const Homepage: React.FC = () => {
  // --------------------[STATES]---------------------

  const [randomName, setRandomName] = useState("");

  // --------------------[HANDLERS]--------------------

  const handleRandomizeName = () => {
    axios.get("/name-randomizer").then((res) => {
      setRandomName(res.data);
    });
  };

  useEffect(() => {
    handleRandomizeName();
  }, []);

  // --------------------[RENDER]---------------------

  return (
    
      <Flex justify="space-evenly" align="center">
        <Row gutter={[16, 16]} justify="space-evenly">
          <Col >
          <Flex align="center" vertical>
            <img
              src={crookedCuratorsTitle}
              alt="Crooked Curators"
              width={320}
              style={{
                marginBottom: 10,
              }}
            />
            <img src={monaLoser} alt="Mona Loser" width={300} />
          </Flex>
          </Col>

          <Col >
            <HomepageName
              randomName={randomName}
              handleRandomizeName={handleRandomizeName}
            />

            <HomepageCreateJoin randomName={randomName} />
            <HomepageSignInToPlay />
          </Col>

        </Row>

        <Row  >
         <Flex vertical>
            <HowToPlay />

         </Flex>
        </Row>

      </Flex>
    
  );
};

export default Homepage;
