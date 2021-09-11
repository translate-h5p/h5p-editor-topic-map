import * as React from "react";
import { hot } from "react-hot-loader/root";

type AppProps = {
  adjective: string;
  setValue: (value: any) => void;
};

const App = ({ adjective, setValue }: AppProps): JSX.Element => {
  return (
    <>
      <h1>Hi, you&apos;re {adjective}</h1>
    </>
  );
};

export default hot(App);
