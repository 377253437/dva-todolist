import * as React from "react";
import { useState, useCallback } from "react";
import Panel from "./Panel";
import Button from "./Button";

const Air: React.FC = () => {
  const [temp, setTemp] = useState(26);
  const [showTemp, setShowTemp] = useState({ open: '1', off: '0', flag: false })
// 调高温度
  const up = useCallback(() => {
    const result = temp + 1;
    if (result > 31) {
      return false;
    }
    setTemp(result);
  }, [temp]);
// 调低温度
  const down = useCallback(() => {
    const result = temp - 1;
    if (result < 16) {
      return false;
    }
    setTemp(result);
  }, [temp]);
// 开关按钮
  const isShowTemp = () => {
    setShowTemp({ ...showTemp, flag: !showTemp.flag })
  }

  return (
    <div>
      <Panel temp={temp} showTemp={showTemp}></Panel>  
      <Button up={up} down={down} isShowTemp={isShowTemp}></Button>
    </div>
  );
};

export default Air;
