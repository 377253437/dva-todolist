import * as React from 'react';
import { useState,useEffect } from 'react';
import  {Snake}  from './Snake';
import { Food } from './Food';
import styles from './snake.less'
import { Button } from "sensd";

const getRandomFood = ()=>{
    // [2, 96]: [0,95)->[2, 97)->[1, 48.5]->[1,48]->[2,96]
    let max = 95;
    let min = 2;
    let x = Math.floor((Math.random() * max + min) / 2) * 2;
    let y = Math.floor((Math.random() * max + min) / 2) * 2;
    console.log("food-position",x,y)
    return [x,y]
  }

const Snakewrap = () => {
    const initState = {
        snakeDots: [
          [0, 0],
          [2, 0]
        ],
        direction: "RIGHT",
        speed: 200,
        food: getRandomFood()
      }
      const [snakes,setSnakes] = useState(initState)
      const onkeydown = (e) => {
        switch (e.keyCode) {
          case 37:
            setSnakes({ ...snakes,direction: "LEFT" });
            break;
          case 38:
            setSnakes({ ...snakes,direction: "UP" });
            break;
          case 39:
            setSnakes({ ...snakes,direction: "RIGHT" });
            break;
          case 40:
            setSnakes({ ...snakes,direction: "DOWN" });
            break;
          default:
            setSnakes({ ...snakes,direction: "RIGHT" });
        }
    
      }
// 根据direction移动
const onMove = () => {
  let newSnakeDots = snakes.snakeDots
  let header = newSnakeDots[newSnakeDots.length - 1];
  switch (snakes.direction) {
    case "UP":
      header = [header[0], header[1] - 2];
      break;
    case "DOWN":
      header = [header[0], header[1] + 2];
      break;
    case "LEFT":
      header = [header[0] - 2, header[1]];
      break;
    case "RIGHT":
      header = [header[0] + 2, header[1]];
      break;
    default:
      header = [header[0] + 2, header[1]];
  }
  newSnakeDots.shift();
  newSnakeDots.push(header);
  setSnakes({ ...snakes,snakeDots: newSnakeDots })
  // console.log(this.state.snakeDots)
}
const checkIfBordered = () => {
    let newSnakeDots = snakes.snakeDots
    let header = newSnakeDots[newSnakeDots.length - 1];
    if (header[0] < 0 || header[0] > 98 || header[1] < 0 || header[1] > 98) {
      alert(`触碰边界,游戏结束，你的得分是：${newSnakeDots.length - 2}`);
      setSnakes(initState);
    }
  }
  const checkIfEated = ()=>{
    let newSnakeDots = snakes.snakeDots
    let header = newSnakeDots[newSnakeDots.length - 1];
    if(header[0]==snakes.food[0] && header[1]==snakes.food[1]){
      console.log("吃到了")
      newSnakeDots.unshift([]);
      setSnakes({...snakes,snakeDots:newSnakeDots});
      setSnakes({...snakes,food:getRandomFood()});
    }
  }
  //componentDidMount
  useEffect(() => {
    document.onkeydown = onkeydown;
    setInterval(onMove, snakes.speed);
    checkIfBordered();
    checkIfEated();
  }, [])
  // 更新时检测是否出界或吃到食物
 

  return (
    <div className={styles.snakeBox}>
    <Button className={styles.button}>开始游戏</Button>
    <Snake snakeDots={snakes.snakeDots} />
    <Food food={snakes.food} />
  </div>
  )
};

export default Snakewrap;
