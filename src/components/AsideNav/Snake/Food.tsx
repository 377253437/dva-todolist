import React from 'react'
import styles from './snake.less'
export const Food = ({food}) => {
    let foodStyle = {
        left:`${food[0]}%`,
        top:`${food[1]}%`
    }
    return (
        <div className={styles.food} style={foodStyle}></div>
    )
}

