import * as React from "react";
import { connect } from "dva";
import styles from './Panel.less'
// import { ModelState } from "../../models/todo";
import Temp from './Temp'
// interface IAppProps {
//     temp: number;
//     todos: ModelState;
//     showTemp: object;
// }
// const showTemp = document.querySelector('#show')

const Panel= ({temp , todos ,showTemp}) => {
    const {data} = todos
    let isDoneArr = data.filter((item) => item.status === true);
   
  return (
        <div className={styles.wrapper}>
          <div className={styles.kt} style={{margin: isDoneArr.length > 2 ? '10px 10px' : '10px 200px'}}>
            <div className={styles.body}>
              <div className={styles.logo}>MI</div>
              <div className={styles.screen}>
                <div className={styles.number} style={{opacity:showTemp.flag? showTemp.open : showTemp.off}}>
                {/* <div className={styles.ktNumber}> */}
                    <Temp temp={temp}></Temp>
                  <span className={styles.numberspan}>℃</span>
                </div>
              </div>
            </div>
            <div className={styles.bottom}>
              <div className={styles.bottommain}>
                <div id="outlet" className={styles.bottomoutlet}></div>
              </div>
            </div>
          </div>
        </div>
  );
};
const mapStateToProps = (state) => {
    return {
      todos: state.todos,
    };
  };
export default connect(mapStateToProps)(Panel);
