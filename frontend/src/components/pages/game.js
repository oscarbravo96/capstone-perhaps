import React, { Component } from 'react';
import Snake from './Snake';
import Food from './Food';
import jake from "./cartoon-snake.png"

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y =  Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y]
}

const initialState = {
  food: getRandomCoordinates(),
  speed: 100,
  direction: 'RIGHT',
  snakeDots: [
    [0,0],
    [2,0]
  ],
  gameOver: false,
  snakeChange: 0,
  gameState: "Start Game"
}

let interval;

class Game extends Component {

  state = initialState;

  componentDidMount() {
    // setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.snakeChange!==this.state.snakeChange) {
      this.checkIfCollapsed();
      this.checkIfOutOfBorders();
      this.checkIfEat();
    }
    // this.checkIfOutOfBorders();
    // this.checkIfCollapsed();
    // this.checkIfEat();
  }

  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({direction: 'UP'});
        break;
      case 40:
        this.setState({direction: 'DOWN'});
        break;
      case 37:
        this.setState({direction: 'LEFT'});
        break;
      case 39:
        this.setState({direction: 'RIGHT'});
        break;
    }
  }

  startGame = () => {
    interval = setInterval(this.moveSnake, this.state.speed);
    this.setState({gameState:"Start Game"})
  }

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
    }
    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots: dots,
      snakeChange: this.state.snakeChange +1
    })
  }

  checkIfOutOfBorders() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  checkIfCollapsed() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        this.onGameOver();
      }
    })
  }

  checkIfEat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] == food[0] && head[1] == food[1]) {
      this.setState({
        food: getRandomCoordinates()
      })
      this.enlargeSnake();
      this.increaseSpeed();
    }
  }

  enlargeSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([])
    this.setState({
      snakeDots: newSnake,
      snakeChange: this.state.snakeChange +1
    })
  }

  increaseSpeed = () => {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10
      })
    }
  }

  playAgain = () => {
    this.setState(initialState)
  }

  onGameOver() {
    // alert(`Game Over. Snake length is ${this.state.snakeDots.length}`);
    // this.setState(initialState)
    clearInterval(interval)
    this.setState({gameOver:true, gameState:"Play Again"})
  }

  setButtonClick() {
    switch(this.state.gameState) {
      case "Start Game":
        return this.startGame
      // case "Increase Speed":
      //   return this.increaseSpeed
      case "Play Again":
        return this.playAgain
      default:
        return
    }
  }

  render() {
    return (
      <div className='game-container'>
        <div className="game-area">
          <Snake snakeDots={this.state.snakeDots}/>
          {this.state.gameOver &&<h1 className='game-over'>Game Over!
          Score: {this.state.snakeDots.length}</h1>}
          <Food dot={this.state.food}/>
        </div>
        <button className='btn' onClick={this.setButtonClick()}>{this.state.gameState}</button>
        <img src={jake} />
      </div>
    );
  }
}

export default Game;