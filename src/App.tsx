import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from "./components/UI/Cart";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProivder } from "./store/UserProgressContext";

function App() {
  return (
    <UserProgressContextProivder>
      <CartContextProvider>
        <Header></Header>
        <Meals></Meals>
        <Cart></Cart>
      </CartContextProvider>
    </UserProgressContextProivder>
  );
}

export default App;
