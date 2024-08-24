"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import "./container.css";

export default function Container() {
  const [leftWidth, setLeftWidth] = useState("50");
  const onMouseDown = (e) => {
    setLeftWidth(e.clientX);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = useCallback((e) => {
    setLeftWidth(e.clientX);
  });

  const onMouseUp = useCallback(() => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }, [onMouseMove]);

  return (
    <div className="container">
      <div className="questionContainer" style={{ width: leftWidth }}></div>
      <div
        className="resizer"
        onMouseDown={onMouseDown}
        style={{ width: "5px", background: "blue", cursor: "ew-resize" }}
      ></div>
      <div className="editorContainer">
        <EditAndTest></EditAndTest>
      </div>
    </div>
  );
}

function EditAndTest() {
  const resizerHeight = "5px";
  const [botHeight, setBotHeight] = useState("50");
  const onMouseDown = (e) => {
    setBotHeight(e.clientY);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = useCallback((e) => {
    setBotHeight(e.clientY);
  });

  const onMouseUp = useCallback(() => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }, [onMouseMove]);
  return (
    <div className="editandtest">
      <div className="edit" style={{ height: botHeight }}></div>
      <div
        className="resizer"
        onMouseDown={onMouseDown}
        style={{ height: "5px", background: "blue", cursor: "ns-resize" }}
      ></div>
      <div className="test"></div>
    </div>
  );
}
