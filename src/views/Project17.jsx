import React, { useEffect, useState } from "react"
import "../styles/project17.scss"

import { paddleFunction,ballFunction,brickInfoFunction } from "../components/Project17Help";

export default function Project17(){  
  
  const brickRowCount = 9;
  const brickColumnCount = 5;
  const delay = 500; //delay to reset the game

  const [canvas,setCanvas]=useState("")
  const [canvasContext,setCanvasContext]=useState("")
  
  const [ball,setBall]=useState({})
  const [paddle,setPaddle]=useState({})
  const [brickInfo,setBrickInfo]=useState({})

  const [bricks,setBricks]=useState([])

  let score=0

  useEffect(() => {
    if(canvas===""){
      setCanvas(document.getElementById('canvas'))
      setCanvasContext(document.getElementById('canvas').getContext("2d"))
    }else{
      setBall(
        ballFunction()
      )
      setPaddle(
        paddleFunction()
      )
      setBrickInfo(
        brickInfoFunction()
      )
    }
  }, [canvas]);

  useEffect(() => {
    if(brickInfo.visible!==undefined){
      let newArray=[]
      for (let i = 0; i < brickRowCount; i++) {
        newArray[i] = [];
        for (let j = 0; j < brickColumnCount; j++) {
          const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
          const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
          newArray[i][j] = { x, y, ...brickInfo };
        }
      }
      setBricks(newArray)
    }
  }, [brickInfo]);

  useEffect(() => {
    if(bricks.length!==0){
      if(window.location.pathname==="/project17"){
        update();
      }
    }
  }, [bricks]);

  function update() {
    movePaddle();
    moveBall();

    draw();

    requestAnimationFrame(update);
  }

// Draw ball on canvas
  function drawBall() {
    canvasContext.beginPath();
    canvasContext.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    canvasContext.fillStyle = ball.visible ? '#0095dd' : 'transparent';
    canvasContext.fill();
    canvasContext.closePath();
  }

  // Draw paddle on canvas
  function drawPaddle() {
    canvasContext.beginPath();
    canvasContext.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    canvasContext.fillStyle = paddle.visible ? '#0095dd' : 'transparent';
    canvasContext.fill();
    canvasContext.closePath();
  }

  // Draw score on canvas
  function drawScore() {
    canvasContext.font = '20px Arial';
    canvasContext.fillText(`Score: ${score}`, canvas.width - 100, 30);
  }

  // Draw bricks on canvas
  function drawBricks() {
    bricks.forEach(column => {
      column.forEach(brick => {
        canvasContext.beginPath();
        canvasContext.rect(brick.x, brick.y, brick.w, brick.h);
        canvasContext.fillStyle = brick.visible ? '#0095dd' : 'transparent';
        canvasContext.fill();
        canvasContext.closePath();
      });
    });
  }

  // Move paddle on canvas
  function movePaddle() {
    paddle.x += paddle.dx;

    // Wall detection
    if (paddle.x + paddle.w > canvas.width) {
      paddle.x = canvas.width - paddle.w;
    }

    if (paddle.x < 0) {
      paddle.x = 0;
      }
  }

  // Move ball on canvas
  function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Wall collision (right/left)
    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
      ball.dx *= -1; // ball.dx = ball.dx * -1
    }

    // Wall collision (top/bottom)
    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
      ball.dy *= -1;
    }

    // Paddle collision
    if (
      ball.x - ball.size > paddle.x &&
      ball.x + ball.size < paddle.x + paddle.w &&
      ball.y + ball.size > paddle.y
    ) {
      ball.dy = -ball.speed;
    }

    // Brick collision
    bricks.forEach(column => {
      column.forEach(brick => {
        if (brick.visible) {
          if (
            ball.x - ball.size > brick.x && // left brick side check
            ball.x + ball.size < brick.x + brick.w && // right brick side check
            ball.y + ball.size > brick.y && // top brick side check
            ball.y - ball.size < brick.y + brick.h // bottom brick side check
          ) {
            ball.dy *= -1;
            brick.visible = false;

            increaseScore();
          }
        }
      });
    });

    // Hit bottom wall - Lose
    if (ball.y + ball.size > canvas.height) {
      if(window.location.pathname==="/project17"){
        alert("PERDISTE")
        showAllBricks();
        score=0
      }else{
        alert("VAMOS A RECARGAR LA PAGINA PARA MEJORAR SU USO")
        window.location.reload()
      }
    }
  }

  // Increase score
  function increaseScore() {
    score=score+1
    if (score % (brickRowCount * brickColumnCount) === 0 || score===45) {
      if(score===45){
        alert("GANASTE!! \n PREMIO: Un besito :3")
      }
      ball.visible = false;
      paddle.visible = false;

      //After 0.5 sec restart the game
      setTimeout(function () {
          showAllBricks();
          score=0
          paddle.x = canvas.width / 2 - 40;
          paddle.y = canvas.height - 20;
          ball.x = canvas.width / 2;
          ball.y = canvas.height / 2;
          ball.visible = true;
          paddle.visible = true;
      },delay)
    }
  }

  // Make all bricks appear
  function showAllBricks() {
    bricks.forEach(column => {
      column.forEach(brick => (brick.visible = true));
    });
  }

  // Draw everything
  function draw() {
    // clear canvas
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
  }

  // Keydown event
  function keyDown(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      paddle.dx = paddle.speed;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      paddle.dx = -paddle.speed;
    }
  }

  // Keyup event
  function keyUp(e) {
    if (
      e.key === 'Right' ||
      e.key === 'ArrowRight' ||
      e.key === 'Left' ||
      e.key === 'ArrowLeft'
    ) {
      paddle.dx = 0;
    }
  }

  // Keyboard event handlers
  document.addEventListener('keydown', keyDown);
  document.addEventListener('keyup', keyUp);

  return(
    <div className="project17">
      <h1>Breakout!</h1>
      <canvas id="canvas" width="800" height="600"></canvas>
    </div>
  )}