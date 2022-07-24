import * as React from 'react';
import style from '../styles/home.less';
import Todo from '../components/todo';
const Home: React.FC = (): React.ReactElement => {
  return (
    <div>
      <header className={style.header}> Todo List</header>
      <Todo></Todo>
    </div>
  );
};

export default Home;
