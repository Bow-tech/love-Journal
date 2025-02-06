import React, { useEffect, useRef } from "react";

const Clock = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const radius = canvas.height / 2;
    ctx.translate(radius, radius);

    function drawClock() {
      const now = new Date();
      if (ctx && canvas) {
        ctx.clearRect(-radius, -radius, canvas.width, canvas.height);

        // Draw clock face
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.9, 0, 2 * Math.PI);
        ctx.fillStyle = "#12003b";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#EE66A6";
        ctx.fill();

        // Draw numbers
        ctx.font = "18px Arial";
        ctx.fillStyle = "#FFEB55";
        for (let num = 1; num <= 12; num++) {
          const ang = Math.PI / 6 * num;
          ctx.fillText(
            num.toString(),
            Math.sin(ang) * radius * 0.8,
            -Math.cos(ang) * radius * 0.8
          );
        }

        // Draw clock hands
        const second = now.getSeconds();
        const minute = now.getMinutes();
        const hour = now.getHours();
        drawHand(hour * 30 + minute / 2, radius * 0.5, 8, "#FFEB55");
        drawHand(minute * 6, radius * 0.8, 6, "#EE66A6");
        drawHand(second * 6, radius * 0.9, 2, "#D91656");
      }
    }

    function drawHand(angle, length, width, color) {
      if (ctx) {
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.strokeStyle = color;
        ctx.rotate((Math.PI / 180) * angle);
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -length);
        ctx.stroke();
        ctx.rotate(-(Math.PI / 180) * angle);
      }
    }

    // Start clock drawing
    drawClock();
    const interval = setInterval(drawClock, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="neon-clock"
      width="500" // Set canvas width
      height="500" // Set canvas height
      style={{ width: "100%", height: "auto" }} // Optional styling for responsiveness
    />
  );
};

export default Clock;
