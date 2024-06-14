import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from "./../../api/slice";


const EditCategoryModal = ({ closeModal, id, updateProduct }) => {

  let token = localStorage.getItem("token") ?? "";
  token = token.replace(/"/g, "");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  
  //* Access currentUser from the auth slice
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  console.log(currentUser);

    const [editCategory, setEditCategory] = useState("");
  
    useEffect(() => {
      const getCategory = async () => {
        try {
          const categoryList = await axios.get(
            `${import.meta.env.VITE_API_URL}/categories/${id}/find`
          );
          setEditCategory(categoryList.data.category.name);
        } catch (e) {
          console.log(e.message);
        }
      };
      getCategory();
    }, [id]);
  
    const handleCategoryItem = async (e) => {
      e.preventDefault();
      try {
        const editProducts = await axios.put(
          `${import.meta.env.VITE_API_URL}/categories/${id}/update`,
          {
            name: editCategory,
          },
          {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        closeModal(false);
        updateProduct();
        console.log(editProducts.data.category);
      } catch (err) {
        console.log(err.message);
      }
    };
  
    return (
      <>
        <div className="absolute z-20 w-full flex items-center justify-center mt-12">
          <div className="bg-white w-1/2 p-6 h-1/2 rounded shadow-md">
            <div className="flex justify-center items-center">
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
            <div className="p-2 overflow-y-auto">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2">
                Edit Category
              </label>
              <input
                onChange={(e) => setEditCategory(e.target.value)}
                type="text"
                value={editCategory}
                name="category"
                placeholder="Add a Brand"
                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
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
                type="button"
                onClick={handleCategoryItem}
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white     disabled:opacity-50 disabled:pointer-events-none">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </>
    );
};

const DeleteModalCategory = ({ updateProduct, closeModal, id }) => {

  let token = localStorage.getItem("token") ?? "";
  token = token.replace(/"/g, "");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  
  //* Access currentUser from the auth slice
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  console.log(currentUser);

    const  handleDeleteCategory = async () => {
        try {
          const deleteProducts = await axios.delete(
              `${import.meta.env.VITE_API_URL}/categories/${id}/destory`,
              {
                headers: {
                  Accept: 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              }
          );
          console.log(deleteProducts.data);
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
              Do you want to delete this product?
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
              onClick={handleDeleteCategory}
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

const CategoryCurd = () => {

  let token = localStorage.getItem("token") ?? "";
  token = token.replace(/"/g, "");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  
  //* Access currentUser from the auth slice
  useEffect(() => {
    if (token) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, token]);
  console.log(currentUser);

  // Check if current user is an admin
  const isAdmin = currentUser?.role === 'admin';

    const [category, setGetCategory] = useState([]);
    const [inputCategory, setInputCategory] = useState("");
    const [getID, setGetID] = useState(null);

    //*  Modal
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [isOpenDeleteCategory, setIsOpenDeleteCategory] = useState(false);
  
     // Fetch categories
  const fetchCategory = async () => {
    try {
      const fetchCategoryResult = await axios.get(
        `${import.meta.env.VITE_API_URL}/categories`
      );
      setGetCategory(fetchCategoryResult.data.category);
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);
   //* handling Posting Category
   const handlePostingCategory = async (e) => {
    e.preventDefault();

    try {
      const postCategoryResult = await axios.post(
        `${import.meta.env.VITE_API_URL}/categories`,
        { name: inputCategory },
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Append the new category to the existing categories
      setGetCategory((prevCategories) => [
        ...prevCategories,
        postCategoryResult.data.category,
      ]);
      // Clear the input field after successful submission
      setInputCategory("");
    } catch (e) {
      console.error("Error posting category:", e.message);
    }
  }
  return (
    <>
    {isAdmin ? (
        <>
           {isOpenCategory && (
        <EditCategoryModal
          closeModal={setIsOpenCategory}
          id={getID}
          updateProduct={fetchCategory} // Get category immediately
        />
      )}
       {isOpenDeleteCategory && (
        <DeleteModalCategory
          closeModal={setIsOpenDeleteCategory}
          id={getID}
          updateProduct={fetchCategory} // Get category immediately
        />
      )}
        </>
      ) : (
        <div>You do not have permission to perform this action. Please log in as an admin.</div>
      )}  
   
    <div className="flex justify-start items-start flex-col">
        <section className="bg-white mt-12">
          <div className="mx-auto max-w-xl">
            <form onSubmit={handlePostingCategory}>
              <div className="p-2 mb-4 w-full flex justify-center items-center flex-col gap-4">
                <label
                  htmlFor="category"
                  className="w-full text-gray-700 text-xl font-bold mb-2">
                  Adding Category
                </label>
                <div className="flex justify-center items-center gap-4">
                  <input
                    type="text"
                    name="name"
                    value={inputCategory}
                    onChange={(e) => setInputCategory(e.target.value)}
                    placeholder="Add a category"
                    className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 w-1/2 text-white py-2 px-2 rounded hover:bg-blue-700">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>

        <div className="w-full h-64 overflow-y-auto p-2">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-4 px-6 text-left text-gray-600 font-bold uppercase">
                  Category Name
                </th>
                <th className="py-4 px-6 text-center text-gray-600 font-bold uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
            {category &&
                category.map((categories, key) => (
                  <tr key={key}>
                    <td className="py-4 px-6 border-b border-gray-200">
                      {categories.name}
                    </td>
                    <td className="mt-12 p-4 border-b border-gray-200">
                      <div className="flex justify-center items-center">
                        <button
                          onClick={() => {
                            setGetID(categories.id);
                            setIsOpenCategory(true);
                          }}
                          type="button"
                          className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setGetID(categories.id);
                            setIsOpenDeleteCategory(true);
                          }}
                          className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                    
            </tbody>
          </table>
        </div>
    </div>
    </>
  )
}

export default CategoryCurd