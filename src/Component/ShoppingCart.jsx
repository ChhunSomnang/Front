import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../api/slice";
import axios from "axios";
import { toast } from 'react-toastify';

const ShoppingCart = () => {
  const [open, setOpen] = useState(true)
  let token = localStorage.getItem("token") ?? "";
  token = token.replace(/"/g, "");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [cartItems, setCartItems] = useState([]);
  const [totalCartPrice , setTotalCartPrice] = useState([]);
  
  //* Access currentUser from the auth slice
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  console.log(currentUser);

  // Fetch Items
  const fetchCart = async () => {
    try {
      const getCart = await axios.get(
        `http://127.0.0.1:8000/api/cart`,
        {
          headers: {
            Accept: `application/json`,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTotalCartPrice(getCart.data.cart.totalCartPrice)
      setCartItems(getCart.data.cart.items); // Assuming the response contains a list of cart items
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchCart();
  },[currentUser,token])

  

  const handleRemoveCart = async (cartItemId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/cart/${cartItemId}/remove`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Refetch the cart data to update the state
      fetchCart();
    } catch (err) {
      console.error("Error removing item from cart:", err.message);
    }
  };


  // Handle Check out
  const [order, setOrder] = useState([]);
  
  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/checkout`,
        {},
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrder(response.data.orders);  
      toast("Order Successfully! Waiting for Admin to approve!")
    } catch (error) {
      console.error('Failed to order', error);
      toast("Failed to order")
    }
  };

//* Updating Product
const handleUpdateQuantity = async (productId, quantity) => {
  try {
    await axios.post(
      `http://127.0.0.1:8000/api/cart/update-quantity`,
      { product_id: productId, quantity },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchCart();
  } catch (err) {
    console.error("Error updating cart quantity:", err.message);
  }
};
const handleQuantityChange = (productId, change) => {
  const updatedCart = cartItems.map((item) => {
    if (item.product.id === productId) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        handleUpdateQuantity(productId, newQuantity);
      }
    }
    return item;
  });
  setCartItems(updatedCart);
};


  return (
    <>
      <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full">
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}>
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200">
                            {cartItems.length > 0 ? (
                              cartItems.map((item) => (
                                <li key={item.product.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={item.product.images}
                                      className="h-full w-full object-contain object-center"
                                    />
                                  </div>
                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>{item.product.name}</h3>
                                        <p className="ml-4 ">
                                          ${item.total_price}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <div className="flex flex-col justify-start text-xs font-semibold text-gray-500">
                                        <h3>Brand: {item.product.brand.name}</h3>
                                        <p className="text-gray-500 text-xs font-semibold">
                                          Type:
                                          {item.product.category.name}
                                        </p>
                                        <h3 className="text-red-900">Price: ${item.product.price}</h3>
                                      </div>
                                      <input
                                          type="number"
                                          value={item.quantity}
                                          className="w-1/4 border rounded-sm mt-4"
                                          onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value) - item.quantity)}
                                      />
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex">
                                        <button
                                          onClick={() => handleRemoveCart(item.id)}
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500">
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))
                            ) : (
                              <p className="text-black font-bold p-1">
                                No Items on the list
                              </p>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                     
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Total Price</p>
                        <p>$ {totalCartPrice}</p>
                      </div>
                    
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <a
                          href="#"
                          onClick={handleCheckout}
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                          Checkout
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm gap-2 text-gray-500">
                        <p>
                          or
                          <Link
                            to={"/shop"}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}>
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    </>
  )
}

export default ShoppingCart;