import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "../src/store/CartContext";

function App() {
  return (
    <CartContextProvider>
      <Header />
      <Meals />
    </CartContextProvider>
  );
}

export default App;
