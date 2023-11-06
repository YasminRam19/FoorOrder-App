import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import Input from "./UI/Input";
import { useContext } from "react";
import { currencyFormatted } from "../util/formatting";
import Button from "./UI/Button";

const Checkout = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtxt = useContext(UserProgressContext);
  const totalAmount = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );

  const handleClose = () => {
    userProgressCtxt.hideCheckout();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries()); //{ email: test@example.com}

    //Sending a POST Request with Order Data, order property with items and customer data.
    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      }),
    });
  };

  return (
    <Modal
      open={userProgressCtxt.progress === "checkout"}
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit}>
        <h2>Title</h2>
        <p>Total Amount: {currencyFormatted.format(totalAmount)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleClose}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
};

export default Checkout;
