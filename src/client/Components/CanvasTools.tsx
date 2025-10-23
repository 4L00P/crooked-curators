// Tools for the canvas, such as undo, redo, brush, eraser, etc

import React from 'react';
import { useState } from 'react';

// ui
import { Col, Row, Button, Tooltip } from '../antdComponents';

// icons
import { IoArrowUndoSharp, IoArrowRedoSharp } from "react-icons/io5";
import { FaPenNib, FaEraser, FaRegSave, FaDownload } from 'react-icons/fa';

// COMPONENTS
import CanvasColorPicker from './ColorPicker';

// types
type propsTypes = {
  handleSave: () => void;
  handleDownload: () => void;
  handleUndo: () => void;
  handleRedo: () => void;
  setTool: (string) => void;
  changeColor: () => void;
}

const CanvasTools: React.FC = (props: propsTypes) => {

  const {
    handleSave, handleDownload,
    handleUndo, handleRedo,
    setTool,
    changeColor,
  } = props;

  // --------------------[STATES]---------------------

  const [penSelected, setPenSelected] = useState("solid");
  const [eraserSelected, setEraserSelected] = useState("dashed")

  // --------------------[HELPERS]--------------------

  const handlePen = () => {
    setTool("pen")

    setPenSelected("solid")
    setEraserSelected("dashed")
  }

  const handleEraser = () => {
    setTool("eraser")
    setEraserSelected("solid")
    setPenSelected("dashed")
  }

  // --------------------[RENDER]---------------------

  return(
    <Col>
      <Row>
        <Tooltip title="Undo">
          <Button onClick={handleUndo}>
            <IoArrowUndoSharp />
          </Button>
        </Tooltip>
      </Row>
      <p />
      <Row>
        <Tooltip title="Redo">
          <Button onClick={handleRedo}>
            <IoArrowRedoSharp />
          </Button>
        </Tooltip>
      </Row>
      <p />
      <Row>
        <Tooltip title="Pen">
          <Button
            color="default"
            variant={penSelected}
            onClick={handlePen}
          >
            <FaPenNib />
          </Button>
        </Tooltip>
      </Row>
      <p />
      <Row>
        <Tooltip title="Eraser">
          <Button
            color="default"
            variant={eraserSelected}
            onClick={handleEraser}
          >
            <FaEraser />
          </Button>
        </Tooltip>
      </Row>
      <br />
      <br />
      <Row>
        <CanvasColorPicker changeColor={changeColor} />
      </Row>
    </Col>
  )
}

export default CanvasTools;
