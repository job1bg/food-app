import { useContext, useState } from "react";
import Modal from "./UI/Modal";
import { CartContext } from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { UserProgressContext } from "../store/UserProgressContext";
import Error from "./UI/Error";

const Checkout = () => {
  const cartCtx = useContext(CartContext);
  const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [formKey, setFormKey] = useState<number>(0);

  const userProgressCtx = useContext(UserProgressContext);

  function handleClose() {
    userProgressCtx.hideCheckout();
    setError(false);
    setSuccess(false);
    setFormKey((prevKey) => prevKey + 1);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    const form = event.target as HTMLFormElement;

    const formData = new FormData(form);
    const customerData = Object.fromEntries(formData.entries());
    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      }),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          setError(true);
        } else {
          setSuccess(true);
          cartCtx.clearCart();
        }
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit} key={formKey}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title="Failed to submit order" />}
        {success && <p style={{ color: "green" }}>Success!</p>}
        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleClose}>
            Close
          </Button>
          {!success && <Button>Submit Order</Button>}
        </p>
      </form>
    </Modal>
  );
};

export default Checkout;
