import * as React from 'react';
import Todo from '../../components/todo/Todo';
import Air from '../../components/Air/Air'
import AsideNav from '../../components/AsideNav/AsideNav'
// import Footer from '../../components/Footer/Footer';
const Home = () => {
  return (
    <div>
      <Todo></Todo>
      <Air></Air>
      <AsideNav></AsideNav>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default Home;
