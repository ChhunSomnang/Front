import React, {Fragment, useState , useEffect } from 'react'
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { getCurrentUser } from "./../../api/slice";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';

const Notification = () => {

    const [open, setOpen] = useState(true)
    let token = localStorage.getItem("token") ?? "";
    token = token.replace(/"/g, "");
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    //* Access currentUser from the auth slice
    useEffect(() => {
        dispatch(getCurrentUser());
    }, [dispatch]);
    console.log(currentUser);
    const [notification , setNotification] = useState([])

    // Fetch Items
  const fetchNotification = async () => {
    try {
      const getNotification = await axios.get(
        `http://127.0.0.1:8000/api/admin-notifications`,
        {
          headers: {
            Accept: `application/json`,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setNotification(getNotification.data); // Assuming the response contains a list of cart items
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchNotification();
  },[currentUser,token])

  
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
                          Notifications
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
                            <ul role="list" className="divide-y divide-gray-200">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Message
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Time
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {notification.length > 0 ? (
                                        notification.map((item , key) => (
                                            <tr key={key} >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{item.message}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.created_at}</td>
                                            </tr>
                                            ))
                                        ) : (
                                        <p className="text-black font-bold p-1">
                                            No Message
                                        </p>
                                        )}
                                    </tbody>
                                </table>
                                
                            </ul>
                        </div>
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

export default Notification