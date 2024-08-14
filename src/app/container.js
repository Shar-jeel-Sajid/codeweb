"use client";
import React, { useState, useCallback, useEffect } from "react";
import "./container.css";

export default function Container() {
  const [leftWidth, setLeftWidth] = useState("50%"); // Initial width for the left box
  const [startX, setStartX] = useState(0); // Starting X position for dragging
  const [startLeftWidth, setStartLeftWidth] = useState(0); // Starting width of the left box

  // Function to handle the mouse down event on the resizer
  const onMouseDown = (e) => {
    setStartX(e.clientX);
    setStartLeftWidth(parseInt(leftWidth, 10));
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  // Function to handle the mouse move event
  const onMouseMove = useCallback(
    (e) => {
      const newWidth = startLeftWidth + (e.clientX - startX);
      const containerWidth = window.innerWidth;
      const newWidthPercent = Math.max(
        0,
        Math.min(100, (newWidth / containerWidth) * 100)
      );
      setLeftWidth(`${newWidthPercent}%`);
    },
    [startLeftWidth, startX]
  );

  // Function to handle the mouse up event
  const onMouseUp = useCallback(() => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }, [onMouseMove]);

  // Initialize ACE editor
  useEffect(() => {
    // Import ACE dynamically
    import("ace-builds/src-noconflict/ace").then((ace) => {
      const editor = ace.edit("editor");
      editor.setTheme("ace/theme/monokai");
      editor.session.setMode("ace/mode/c++");
    });
  }, []);

  return (
    <div className="container">
      <div className="box" style={{ width: leftWidth }}></div>
      <div className="resizer" onMouseDown={onMouseDown}></div>
      <div className="box box2" style={{ width: `calc(100% - ${leftWidth})` }}>
        <div id="editor" style={{ height: "100%", width: "100%" }}></div>
      </div>
    </div>
  );
}
