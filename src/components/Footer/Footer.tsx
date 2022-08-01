import * as React from "react";
import styles from "./Footer.less";
import { useState, useEffect } from "react";
const Footer = () => {
  // 获取文案
  const getContent = async () => {
    try {
      const connect = await fetch("https://v1.hitokoto.cn?c=d");
      const data = await connect.json();
      return data;
    } catch (e) {
      return false;
    }
  };

  const [text, setText] = useState({ hitokoto: "", quote: "" });
  useEffect(() => {
    const update = async () => {
      const data = await getContent();
      const fromWho = data.from_who ? data.from_who : "";
      const from = data.from ? data.from : '';
      data.quote = `——${fromWho}《${from}》` 
      setText(data);
    };
    const token = setInterval(update, 12000);
    update();
    // 组件卸载时清除定时器
    return () => clearInterval(token);
  }, []);
  return (
    <div className={styles.sentenceWraper}>
      <div className={styles.copywriting}>
        <p>{text.hitokoto}</p>
        <p>{text.quote}</p>
      </div>
    </div>
  );
};

export default Footer;
