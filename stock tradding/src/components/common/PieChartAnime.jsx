import React, { useRef, useEffect } from "react";
import { useState } from "react";


const PieChartAnimation = () => {
  const canvasRef = useRef(null);
  const[pct,setpct]=useState('')

  useEffect(() => {
    const canvas = canvasRef.current;
    console.log("current ref", canvas);

    function animate() {
      draw(pct);
      pct++;
      if (pct <= endingPct) {
        requestAnimationFrame(animate);
      }
      if (pct === 701) {
        pct = 0;
        draw(pct);
        pct++;
        if (pct <= endingPct) {
          requestAnimationFrame(animate);
        }
      }
    }

    function draw(pct) {
      var endRadians = -Math.PI / 2 + (Math.PI * 2 * pct) / 700;
      ctx.fillStyle = "Pink";
      ctx.fillRect(0, 0, cw, ch);
      // ctx.beginPath();
      ctx.arc(150, 125, 100, -Math.PI / 2, endRadians);
      ctx.lineTo(150, 125);
      ctx.fillStyle = "Black";
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(150, 100);
      // ctx.lineTo(175,150);
      // ctx.quadraticCurveTo(100,125,125,150);
      ctx.closePath();
      ctx.strokeStyle = "#13a8a4";
      ctx.lineJoin = "bevel";
      ctx.lineWidth = 10;
      ctx.stroke();
      ctx.fillStyle = "blue";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "18px arial";
      ctx.fillText("Infoxeron", 150, 175);
    }
    var ctx = canvas?.getContext("2d");
    var cw = canvas?.width;
    var ch = canvas?.height;

    var nextTime = 0;
    var duration = 200;
    var endingPct = 700;
    var pct = 0;
    var increment = duration / pct;
    requestAnimationFrame(animate);
  }, []);

  return (
    <div style={{position: 'relative'}}>
      <canvas width="300" height="300" ref={canvasRef}  />
      <div>{pct}</div>
    </div>
  );
};
export default PieChartAnimation;