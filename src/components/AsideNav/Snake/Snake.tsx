import * as React from 'react';
import styles from  './snake.less'


export const Snake = ({snakeDots}) => {
    return (
        <>
            {
                snakeDots.map((dot, index)=>{
                    let dotStyle = {
                        left:`${dot[0]}%`,
                        top:`${dot[1]}%`
                    }
                    return (
                        <div className={styles.snakeDot} key={index} style={dotStyle}></div>
                    )
                })
            }
        </>
    )
}

