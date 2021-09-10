import * as React from "react";
import { hot } from "react-hot-loader/root";

type Props = {
  adjective: string;
};

const App = ({ adjective }: Props): JSX.Element => {
  return (
    <>
      <h1>Hi, you&apos;re {adjective}</h1>
    </>
  );
};

export default hot(App);
