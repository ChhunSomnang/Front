import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';



const DeleteOrder = ({ updateProduct, closeModal, id }) => {

  let token = localStorage.getItem('token') ?? '';
  token = token.replace(/"/g, '');
  
  const handleDeleteOrder = async (id) => {
    try {
      const deleteBrand = await axios.delete(
        `http://127.0.0.1:8000/api/order/${id}/delete`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(deleteBrand.data);
      closeModal();
      updateProduct();
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
      <div className="absolute z-20 w-full flex items-center justify-center mt-12">
        <div className="bg-white w-1/2 p-6 h-1/2 rounded shadow-md">
          <div className="flex justify-center items-center">
            <h1>Confirmation</h1>
            <button
              type="button"
              onClick={() => closeModal(false)}
              className="text-slate-100 hover:bg-slate-200 hover:text-slate-200 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center mb-4">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-black"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
          <hr className="h-0.5 border-t-0 bg-neutral-100" />
          <div className="p-2 overflow-y-auto">
            <p className="mt-1 text-gray-800">
              Do you want to delete this Order?
            </p>
          </div>
          <hr className="mt-2 h-0.5 border-t-0 bg-neutral-100" />
          <div className="flex justify-end items-center gap-x-2 py-3 px-4">
            <button
              onClick={() => closeModal(false)}
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
              data-hs-overlay="#hs-basic-modal">
              Close
            </button>
            <button
              onClick={() => handleDeleteOrder(id)}
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white     disabled:opacity-50 disabled:pointer-events-none">
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const ApproveOrder = () => {
  let token = localStorage.getItem('token') ?? '';
  token = token.replace(/"/g, '');
  const dispatch = useDispatch();
  const [order, setOrder] = useState([]);
  const [approvedOrders, setApprovedOrders] = useState([]);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [getID, setGetID] = useState(null);

  useEffect(() => {
    fetchOrder();
    // Retrieve approved orders from local storage on component mount
    const storedApprovedOrders = JSON.parse(localStorage.getItem('approvedOrders')) || [];
    setApprovedOrders(storedApprovedOrders);
  }, []);

  useEffect(() => {
    // Save approved orders to local storage whenever it changes
    localStorage.setItem('approvedOrders', JSON.stringify(approvedOrders));
  }, [approvedOrders]);

  const fetchOrder = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/order');
      setOrder(response.data.orders); // Assuming the response contains a list of orders
    } catch (error) {
      console.error('Failed to fetch orders', error);
    }
  };

  const handleApprove = async (id) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/order/${id}/approve`,
        {},
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Order approved successfully');
      setApprovedOrders([...approvedOrders, id]); // Mark the order as approved
      fetchOrder(); // Refresh the list of orders
    } catch (error) {
      console.error('Failed to approve order', error);
      toast.error('Failed to approve order');
    }
  };

  const handleDelete = async (id) => {
    const config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `http://127.0.0.1:8000/api/order/${id}/delete`,
      headers: {
        Accept: `application/json`,
        Authorization: `Bearer ${token}`
      }
    };

    try {
      const response = await axios.request(config);
      setMessage(response.data.message);
      fetchOrder(); // Refresh the list of orders
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred while deleting the order.');
      }
    }
  };
  return (
    <>
    {isOpenDelete&& (
        <DeleteOrder
          closeModal={setIsOpenDelete}
          id={getID}
          updateProduct={fetchOrder} // Get category immediately
        />
      )}
      <table className="min-w-full divide-y divide-gray-200 overflow-x-auto mt-12">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Role
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Product
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Quantity
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Total Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {order.length > 0 ? (
            order.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full"
                        src="https://iconape.com/wp-content/png_logo_vector/avatar-4.png"
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {item.user.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.user.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.product_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  $ {item.total_price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {!approvedOrders.includes(item.id) ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleApprove(item.id)}
                        className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setGetID(item.id);
                          setIsOpenDelete(true);
                        }}
                        className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <p className="text-sm text-green-500">Order Approved</p>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="px-6 py-4 whitespace-nowrap">
                <p className="text-black font-bold p-1">No Orders in the list</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default ApproveOrder;