// Canvas for artists to draw on during the game

import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import {
  Divider,
  Col,
  Row,
  Flex,
  FlexProps,
  Segmented,
  Button,
  Tooltip
} from '../antdComponents';

import { IoArrowUndoSharp, IoArrowRedoSharp } from "react-icons/io5";
import { FaPenNib, FaEraser, FaRegSave, FaDownload } from 'react-icons/fa';

import { useGameContext } from '../context';

import { Stage, Layer, Line, Text, Rect } from 'react-konva';

// -------------------[COMPONENTS]------------------

import CanvasTools from './CanvasTools';
import SubmitArtwork from './SubmitArtwork';
import CanvasColorPicker from './ColorPicker';

// ---------------------[TYPES]---------------------

import { Canvas as CanvasPropTypes } from './types';

// ---------------------[STYLE]---------------------

const boxStyle: React.CSSProperties = {
  width: 900,
  //height: 550,
  height: 500,
  borderRadius: 6,
};

const canvasBoxStyle: React.CSSProperties = {
  width: '100%',
  //height: 550,
  height: '100%',
  // borderRadius: 6,
  // border: '3px solid #3B262C',
};

// -------------------[COMPONENT]-------------------

const Canvas = ({ handleDone }: CanvasPropTypes) => {

  const { code } = useGameContext().game;

  // --------------------[STATES]---------------------

  // reference to canvas container
  const containerRef = useRef(null);

  // lines of current canvas
  const [lines, setLines] = React.useState([]);

  // tools for canvas and line color state
  const [tool, setTool] = React.useState('pen');
  const [lineColor, setLineColor] = React.useState("#000000");

  // history for undo/redo
  const [history, setHistory] = useState([])

  // export
  const stageRef = React.useRef(null);

  // -------------------[HANDLERS]--------------------

  const isDrawing = React.useRef(false);

  // drawing
  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y], stroke: lineColor }]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = (e) => {
    isDrawing.current = false;
  };

  // undo and redo
  const handleUndo = () => {

    // remove last line
    let lastLine = lines.pop();

    // update state without the last line & add last line to history
    setLines([...lines]);
    setHistory([...history, lastLine])
  };

  const handleRedo = () => {

    if (history.length !== 0) {

      // remove last line from the history
      let lastLine = history.pop()

      // update history without the last line
      setHistory([...history]);

      // add last line back to lines
      if (lines.length === 0) {
        setLines([...lastLine]);
      } else {
        setLines([...lines, lastLine]);
      }
    }
  };

  // save image to user's profile [currently disabled]
  const handleSaveToProfile = () => {

    let imageUrl = '';

    const uri = stageRef.current.toDataURL();

    // make request to server to send the URI to our cloud storage
    axios.get('/s3Url').then((res) => {

      imageUrl = res.data.split('?')[0];

      // make PUT request to the s3 bucket with url from request
      axios.put(res.data, {
        'Content-Type': "image/png",
        body: uri
      })
        .then(() => {
          console.log('Successful PUT request to s3Url: CLIENT');

        })
        .catch((err) => {
          console.error('Failed PUT request to s3 bucket: CLIENT:', err);
        })

    }).catch((err) => {
      console.error('Failed GET request to s3Url: CLIENT:', err);
    })
  };

  // save image from canvas locally
  const handleDownload = () => {

    const uri = stageRef.current.toDataURL('image/png');

    function downloadURI(uri, name) {
      var link = document.createElement('a');
      link.download = name;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    downloadURI(uri, 'artwork.png');
  };

  // submits image for that round and adds to DB
  const handleSubmitImage = () => {

    // later sets to the link provided from the S3 request to have accessible in outer scope
    let imageUrl = '';

    // converts canvas image to a URI to save to the S3 bucket
    const uri = stageRef.current.toDataURL();

    // make request to server to send the URI to our cloud storage
    axios.get('/s3Url').then((res) => {

      imageUrl = res.data.split('?')[0];

      // make PUT request to the s3 bucket with url from request
      axios.put(res.data, {
        'Content-Type': "image/png",
        body: uri
      })
        .then(() => {
          console.log('Successful PUT request to s3Url: CLIENT:');

          axios.post('/artworks', {
            gameCode: code,
            imageUrl: imageUrl
          })
            .then(() => {
              console.log('Successfully posted artwork URL to server: CLIENT')
            })
            .catch((err) => {
              console.error('Failed to post artwork URL to server: CLIENT:', err);
            })
        })
        .catch((err) => {
          console.error('Failed PUT request to s3 bucket: CLIENT:', err);
        })
    })
      .catch((err) => {
        console.error('Failed GET request to s3Url: CLIENT:', err);
      })
  }

  // --------------------[RENDER]---------------------

  return (
    <div>
      <Divider variant="dotted" style={{ borderColor: '#3B262C' }}>
        Canvas
      </Divider>
      <Flex gap="middle" align="center" vertical>
        <Flex style={boxStyle} justify='space-evenly' align='center'>
          <Col>
            <CanvasTools
              tool={tool}
              setTool={setTool}
              handleUndo={handleUndo}
              handleRedo={handleRedo}
            />
          </Col>
          <Col>
            <br />
          </Col>
          <Col>
            <div ref={containerRef} style={canvasBoxStyle}>
              <Stage
                width={900}
                height={500}
                ref={stageRef}
                onMouseDown={handleMouseDown}
                onMousemove={handleMouseMove}
                onMouseup={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchMove={handleMouseMove}
                onTouchEnd={handleMouseUp}
              >
                <Layer>
                  <Rect x={0} y={0} width={900} height={500} fill="white" />
                </Layer>
                <Layer>
                  {lines.map((line, i) => (
                    <Line
                      key={i}
                      points={line.points}
                      stroke={line.stroke}
                      strokeWidth={5}
                      tension={0.5}
                      lineCap="round"
                      lineJoin="round"
                      globalCompositeOperation={
                        line.tool === 'eraser' ? 'destination-out' : 'source-over'
                      }
                    />
                  ))}
                </Layer>
              </Stage>
            </div>
          </Col>
          <Col>
            <br />
          </Col>
          <Col>
            <Row>
              <Tooltip title="Save to profile">
                <Button onClick={handleSaveToProfile} disabled>
                  <FaRegSave />
                </Button>
              </Tooltip>
            </Row>
            <p />
            <Row>
              <Tooltip title="Download">
                <Button onClick={handleDownload}>
                  <FaDownload />
                </Button>
              </Tooltip>
            </Row>
            <br />
            <br />
            <br />
            <br />
            <Row>
              <CanvasColorPicker changeColor={setLineColor} />
            </Row>
            <br />
            <br />
            <br />
            <br />
            <Row>
              <SubmitArtwork handleSubmitImage={handleSubmitImage} handleDone={handleDone} />
            </Row>
          </Col>
        </Flex>
      </Flex>
    </div>
  );
};

export default Canvas;
