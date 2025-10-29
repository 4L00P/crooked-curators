// Contains the Reference and ReferenceSearch components

import React, { useState, useContext } from "react";
import { Flex, Button, Popconfirm, ReloadOutlined } from "../antdComponents";

import ReferenceSearch from "./ReferenceSearch";
import Reference from "./Reference";
import ArtSubmitCount from "./ArtSubmitCount";
import { SocketContext, GameContext } from "../context";
import axios from "axios";

const CuratorSearch = () => {
  const [selected, setSelected] = useState(0);
  const [results, setResults] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const { socket } = useContext(SocketContext);
  const { game } = useContext(GameContext);

  const nextResult = () => {
    setSelected(selected + 1);
  };

  const handleSearch = function (query) {
    //api call, update state
    if (query.trim().length === 0) return;
    axios
      .get(`/curator/${query}`)
      .then(({ data }) => {
        console.log(data);
        if (data) {
          setResults(data);
          setDisabled(true);
          setSelected(0);
          setConfirmed(false);
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
    <Flex className="judging-container" gap="middle" align="center" vertical>

      <Flex>
        <div style={{textAlign:"center", marginBottom: 7}}>
          <h3>You are the curator!</h3>
          <h3>Type a keyword to find art for your gallery</h3>
          <ReferenceSearch handleSearch={handleSearch} disabled={disabled} />
        </div>
        <div className="to-judging-button" style={{marginBottom: 7}}>
          <ArtSubmitCount />
        </div>
      </Flex>

      <Reference {...results[selected]} />

      <Flex style={{ gap: 20 }}>
        <Button
          type="primary"
          disabled={selected >= results.length - 1}
          onClick={nextResult}
          variant="solid"
          color="primary"
          icon={<ReloadOutlined style={{ fontSize: 20 }} />}
          iconPosition="end"
          style={{
            paddingBlock: 20,
            paddingInline: 17,
          }}
        >
          {results.length === 0 ? (
            ""
          ) : (
            <h4>
              {" "}
              Result {selected + 1} out of {results.length}{" "}
            </h4>
          )}
        </Button>
        {results.length > 0 && results.length < 4 && !confirmed ? (
          <Button
            type="primary"
            variant="solid"
            color="primary"
            icon={<ReloadOutlined style={{ fontSize: 20 }} />}
            iconPosition="end"
            style={{
              paddingBlock: 20,
              paddingInline: 17,
            }}
            onClick={() => {
              setResults([]);
              setSelected(0);
              setDisabled(false);
            }}
          ><h3>Try Another Search?</h3></Button>
        ) : null}
        <Popconfirm
          title="Are you sure to select this reference?"
          onConfirm={selectReference}
          onCancel={() => {}}
          okText="Yes"
          cancelText="No"
        >
          <Button
            type="primary"
            disabled={confirmed || results.length === 0}
            variant="solid"
            color="primary"
            style={{
              paddingBlock: 20,
              paddingInline: 30,
            }}
          >
            {confirmed ? (
              <h3>Reference Selected!</h3>
            ) : (
              <h3>Choose this Piece</h3>
            )}
          </Button>
        </Popconfirm>
      </Flex>

      {/* <div style={{marginTop: 16}}>
        <ArtSubmitCount />
      </div> */}

    </Flex>
  );
};

export default CuratorSearch;
