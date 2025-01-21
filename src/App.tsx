import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from "./components/Cart";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProivder } from "./store/UserProgressContext";
import Checkout from "./components/Checkout";

function App() {
  return (
    <UserProgressContextProivder>
      <CartContextProvider>
        <Header></Header>
        <Meals></Meals>
        <Cart></Cart>
        <Checkout></Checkout>
      </CartContextProvider>
    </UserProgressContextProivder>
  );
}

export default App;
