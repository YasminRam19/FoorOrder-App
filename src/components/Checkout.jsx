import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import Input from "./UI/Input";
import { useContext } from "react";
import { currencyFormatted } from "../util/formatting";
import Button from "./UI/Button";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-type": "application/json",
  },
};

const Checkout = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtxt = useContext(UserProgressContext);

  const {
    data,
    isLoadin: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orderss", requestConfig);

  const totalAmount = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );

  const handleClose = () => {
    userProgressCtxt.hideCheckout();
  };

  const handleFinish = () => {
    userProgressCtxt.hideCheckout();
    cartCtx.clearCart();
    clearData();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries()); //{ email: test@example.com}

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );

    /*
    //Replaced by useHttp hook - senRequest
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
  };*/
  };

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    console.log("Inside sending");
    actions = <span>Sending order data...</span>;
  }

  //No error
  if (data && !error) {
    return (
      <Modal
        open={userProgressCtxt.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the nect
          few minutes.
        </p>
        <p className="actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

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
        {error && <Error title="Failed to submit order" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
};

export default Checkout;
