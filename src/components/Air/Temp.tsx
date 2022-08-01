import * as React from "react";

interface IAppProps {
  temp: number;
}

const Temp: React.FC<IAppProps> = ({ temp }) => {
  return (
    <>
      <span>{temp}</span>
    </>
  );
};

export default Temp;
