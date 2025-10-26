// Contains the Reference and ReferenceSearch components

import React, { useState, useContext } from "react";
import { Divider, Flex, Button, Popconfirm, Row, Col } from "../antdComponents";

import ReferenceSearch from "./ReferenceSearch";
import Reference from "./Reference";
import ArtSubmitCount from "./ArtSubmitCount";
import { SocketContext, GameContext } from "../context";
import axios from "axios";

const CuratorSearch = () => {
  const [selected, setSelected] = useState(0);
  const [results, setResults] = useState([]);
  const [confirmed, setConfirmed] = useState(false);
  const { socket } = useContext(SocketContext);
  const { game } = useContext(GameContext);

  const nextResult = () => {
    setSelected(selected + 1);
  };

  const handleSearch = function (query) {
    //api call, update state
    axios
      .get(`/curator/${query}`)
      .then(({ data }) => {
        console.log(data);
        if (data) {
          setResults(data);
        } else {
          console.log("no results :/");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const selectReference = function () {
    socket?.emit("curatorSelect", results[selected]);
    setConfirmed(true);
  };
  return (
    <Flex gap="middle" align="center" vertical>

        <div>
        <ReferenceSearch handleSearch={handleSearch} disabled={results.length}/>
        <p>{(results.length > 0 && results.length < 4) ? `That search didn't get enough results, you can try again` : `Choose a Reference!`}</p>
        </div>
        <ArtSubmitCount />


        <Reference {...results[selected]} />
        <Button onClick={nextResult} disabled={selected >= results.length - 1}>
          {results.length === 0
            ? "Search For Some Inspiration!"
            : `Result ${selected + 1} out of ${results.length}`}
        </Button>
        <Popconfirm
          title="Are you sure to select this reference?"
          onConfirm={selectReference}
          onCancel={() => {}}
          okText="Yes"
          cancelText="No"
        >
        <Button disabled={confirmed || results.length === 0}>{confirmed ? `Reference Selected!` : `Choose this Piece`}</Button>
        </Popconfirm>

    </Flex>
  );
  // return (
  //   <>
  //     <Row gutter={2}>
  //       <Col span={18}>
  //         <Flex gap="middle" align="center" vertical>
  //           <Flex style={{ width: 500 }} justify="space-evenly" align="center">
  //             <ReferenceSearch
  //               handleSearch={handleSearch}
  //               disabled={results.length}
  //             />
  //             <p>
  //               {results.length > 0 && results.length < 4
  //                 ? `That search didn't get enough results, you can try again`
  //                 : `Choose a Reference!`}
  //             </p>
  //           </Flex>
  //         </Flex>
  //         <Divider>
  //           <Reference {...results[selected]} />
  //           <Button
  //             onClick={nextResult}
  //             disabled={selected >= results.length - 1}
  //           >
  //             {results.length === 0
  //               ? "Search For Some Inspiration!"
  //               : `Result ${selected + 1} out of ${results.length}`}
  //           </Button>
  //           <Popconfirm
  //             title="Are you sure to select this reference?"
  //             onConfirm={selectReference}
  //             onCancel={() => {}}
  //             okText="Yes"
  //             cancelText="No"
  //           >
  //             <Button disabled={confirmed || results.length === 0}>
  //               {confirmed ? `Reference Selected!` : `Choose this Piece`}
  //             </Button>
  //           </Popconfirm>
  //         </Divider>
  //       </Col>

  //       <Col span={3}>
  //         <ArtSubmitCount />
  //       </Col>
  //     </Row>
  //   </>
  // );
};

export default CuratorSearch;
