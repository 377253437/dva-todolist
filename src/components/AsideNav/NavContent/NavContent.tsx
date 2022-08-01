import * as React from "react";
import styles from "./NavContent.less";
import { connect } from "dva";

const NavContent = ({ todos }) => {
  const { data } = todos;
  const listDom = data.map((item) => (
    <li className={styles.li} key={item.id}>
      {item.title}
      <ul>
        <li>{item.detail}</li>
      </ul>
    </li>
  ));

  return (
    <div className={styles.wraper}>
      <nav className={styles.shell}>
        <ul className={styles.buttons}>{listDom}</ul>
      </nav>
    </div>
    
  );
};
const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  };
};
export default connect(mapStateToProps)(NavContent);
