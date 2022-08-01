import React, { Component } from "react";
import { connect } from "dva";
import { Snake } from "./Snake";
import { Food } from "./Food";
import styles from "./snake.less";
import { Button } from "sensd";
import {ModelState} from '../../../models/todo'

// 随机获取食物位置
let timer
const getRandomFood = () => {
  let max = 95;
  let min = 2;
  let x = Math.floor((Math.random() * max + min) / 2) * 2;
  let y = Math.floor((Math.random() * max + min) / 2) * 2;
  console.log("food-position", x, y);
  return [x, y];
};
// 另存state以便重新初始化
const initState = {
  //位置
  snakeDots: [
    [0, 0],
    [2, 0],
  ],
  //运动的方向
  direction: "RIGHT",
  //运动的速度
  speed: 200,
  //获取随机食物的方法
  food: getRandomFood(),
};
interface IProps {
  todos:ModelState
}

class SnakeBox extends Component<IProps> {
  // constructor(props: {} ){
  //   super(props)
  //   }
  // isDoneArr = this.props.todos.data.filter((item) => item.status === true);
  // isDoneArr = this.props.todos.data
 
  state = initState;
  // 监听与计时器
  componentDidMount() {
    document.onkeydown = this.onkeydown;
    // const timer = setInterval(this.onMove, this.state.speed)

    // setInterval(this.onMove, this.state.speed);
  }
  // 更新时检测是否出界或吃到食物
  componentDidUpdate() {
    this.checkIfBordered();
    this.checkIfEated();
  }
  // 判断键盘按键，更新direction
  onkeydown = (e: { keyCode: any; }) => {
    switch (e.keyCode) {
      case 37:
        this.setState({ direction: "LEFT" });
        break;
      case 38:
        this.setState({ direction: "UP" });
        break;
      case 39:
        this.setState({ direction: "RIGHT" });
        break;
      case 40:
        this.setState({ direction: "DOWN" });
        break;
      default:
        this.setState({ direction: "RIGHT" });
    }
  };
  // 根据direction移动
  onMove = () => {
    let newSnakeDots = [...this.state.snakeDots];
    let header = newSnakeDots[newSnakeDots.length - 1];
    switch (this.state.direction) {
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
    this.setState({ snakeDots: newSnakeDots });
    // console.log(this.state.snakeDots)
  };

  handleOnclick = () => {
    if (timer) {
      clearInterval(timer);
    } else {
      timer = setInterval(this.onMove, this.state.speed);
    }
    console.log("aaaaaa");
    console.log(this.props.todos.data);
    // console.log(this.isDoneArr);
    // console.log(this.props.todos.data);
    
  };
  // 判断是否出界
  checkIfBordered = () => {
    let newSnakeDots = [...this.state.snakeDots];
    let header = newSnakeDots[newSnakeDots.length - 1];
    if (header[0] < 0 || header[0] > 98 || header[1] < 0 || header[1] > 98) {
      alert(`游戏结束，你的得分是：${newSnakeDots.length - 2}`);
      this.setState(initState);
      clearInterval(timer);
    }
  };
  // 判断是否吃到食物
  checkIfEated = () => {
    let newSnakeDots = [...this.state.snakeDots];
    let header = newSnakeDots[newSnakeDots.length - 1];
    if (header[0] == this.state.food[0] && header[1] == this.state.food[1]) {
      newSnakeDots.unshift([]);
      this.setState({ snakeDots: newSnakeDots });
      this.setState({ food: getRandomFood() });
    }
  };
  render() {
    return (
      <div className={styles.snakeBox}>
        <Button  disabled={this.props.todos.data.filter((item) => item.status === true).length > 4 ? false : true} className={styles.button} onClick={this.handleOnclick}>
          开始游戏
        </Button>
        <span className={styles.note}>至少完成5个任务才能开始游戏哦</span>
        <Snake snakeDots={this.state.snakeDots} />
        <Food food={this.state.food} />
      </div>
    );
  }
}

const mapStateToProps = (state: { todos: ModelState; }) => {
  return {
    todos: state.todos,
  };
};

export default connect(mapStateToProps)(SnakeBox);
