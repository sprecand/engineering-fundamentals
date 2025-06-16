import "./App.css";
import Logo from "./Logo";
import Counter from "./Counter";

function App() {

  // @ts-ignore
  const redundantData = "This variable is here for no good reason.";

  return (
    <>
      <Logo />
      <Counter />
    </>
  );
}

export default App;
