import React, { useEffect, useState } from 'react'
import axios from "axios";
import { v4 } from "uuid";
import { storage } from "../../firebase/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from "./../../api/slice";

const EditBrandModal = ({ closeModal, id, updateProduct }) => {

  let token = localStorage.getItem("token") ?? "";
  token = token.replace(/"/g, "");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  
  //* Access currentUser from the auth slice
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  console.log(currentUser);

  const [name, setName] = useState("");
  const [logoUrl, setLogoUrl] = useState(null);

  const [photoURL, setPhotoURL] = useState(null);
  const metadata = {
    contentType: "image/*",
  };

  const [file, setFile] = useState(null);

  useEffect(() => {
    const getBrand = async () => {
      try {
        const brandList = await axios.get(`${import.meta.env.VITE_API_URL}/brand/${id}/find`);
        setName(brandList.data.brand.name); 
        setFile(brandList.data.brand.logo_url); 
      } catch (e) {
        console.log(e.message);
      }
    };
    getBrand();
  }, [id]);

  

  const handleBrandItem = async (e) => {
    e.preventDefault();
    if (!logoUrl) return;
    const imageID = v4();
    const imageFormat = logoUrl.type.split("/")[1];
    const imgRef = ref(storage, `posting_image/${imageID}.${imageFormat}`);
    const uploadTask = uploadBytesResumable(imgRef, logoUrl, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Error uploading image:", error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setPhotoURL(downloadURL);
          const editProducts = await axios.put(
            `${import.meta.env.VITE_API_URL}/brand/${id}/update`,
            {
              name: name,
              logo_url: downloadURL,
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
          console.log(editProducts.data.brand);
        } catch (err) {
          console.log(err.message);
        }
      }
    );
  };
  return (
    <>
      <div className="absolute z-20 w-full flex items-center justify-center mt-24">
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
              Edit Brand
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              value={name}
              name="name"
              placeholder="Edit Brand Name"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <label
              htmlFor="logoUrl"
              className="block text-gray-700 text-sm font-bold mt-4 mb-2">
              Edit Logo URL
            </label>
            <input
              type="file"
              onChange={(e) => {
                setLogoUrl(e.target.files[0]);
                setFile(URL.createObjectURL(e.target.files[0]));
              }}
              name="images"
              accept="image/*"
              className="w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  dark:text-neutral-400
                            file:bg-gray-50 file:border-0
                              file:me-4
                              file:py-3 file:px-4
                              dark:file:text-neutral-400"
            />
            <div className="flex justify-start items-center gap-4">
              {file && (
                <>
                  <img
                    loading="lazy"
                    className="mt-2 w-12 h-12 rounded-md"
                    src={file}
                    alt="Select a file"
                  />
                  <i className="fa-solid fa-x text-sm"></i>
                </>
              )}
            </div>
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
              onClick={handleBrandItem}
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white     disabled:opacity-50 disabled:pointer-events-none">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const DeleteModalBrand = ({ updateProduct, closeModal, id }) => {

  let token = localStorage.getItem("token") ?? "";
  token = token.replace(/"/g, "");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  
  //* Access currentUser from the auth slice
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  console.log(currentUser);
  
  const handleDeleteBrand = async (id) => {
    try {
      const deleteBrand = await axios.delete(
        `${import.meta.env.VITE_API_URL}/brand/${id}/destroy`,
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
              Do you want to delete this brand?
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
              onClick={() => handleDeleteBrand(id)}
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

const BrandCrud = () => {

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

  const [brand, setBrand] = useState([]);
  const [inputBrand, setInputBrand] = useState("");
  const [getID, setGetID] = useState(null);

  const [isOpenBrand, setIsOpenBrand] = useState(false);
  const [isOpenDeleteBrand, setIsOpenDeleteBrand] = useState(false);
  //* Image State
  const [productImages, setProductImages] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [file, setFile] = useState(null);
  const metadata = {
    contentType: "image/*",
  };

  // Fetch brands
  const fetchBrand = async () => {
    try {
      const fetchCategoryResult = await axios.get(`${import.meta.env.VITE_API_URL}/brand`);
      setBrand(fetchCategoryResult.data.brands); // Use 'brands' instead of 'brand'
    } catch (e) {
      console.log(e.message);
    }
  };
  
  useEffect(() => {
    fetchBrand();
  }, []);
  
  console.log(brand);

  const handlePostingBrand = async (e) => {
    e.preventDefault();

    if (!productImages) return;

    // Generate a unique image ID and format
    const imageID = v4();
    const imageFormat = productImages.type.split("/")[1];
    const imgRef = ref(storage, `brand_image/${imageID}.${imageFormat}`);
    const uploadTask = uploadBytesResumable(imgRef, productImages, metadata);

    // Handle the upload process
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error("Error uploading image:", error.message);
      },
      async () => {
        try {
          // Get the download URL after the upload is complete
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setPhotoURL(downloadURL);
        
          // Post the brand data to your API
          const postBrandResult = await axios.post(
            `${import.meta.env.VITE_API_URL}/brand`,
            { name: inputBrand, logo_url: downloadURL },
            {
              headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          );
        
          // Append the new brand to the existing brands
          setBrand((prevBrands) => [...prevBrands, postBrandResult.data.brand]);
        
          // Clear the input field and image after successful submission
          setInputBrand("");
          setProductImages(null);
          setFile(null);
        } catch (e) {
          console.error("Error posting brand:", e.message);
        }
      }
    );
  };
  return (
    <> 
    {isAdmin ? (
        <>
          {isOpenBrand && (
        <EditBrandModal
          closeModal={setIsOpenBrand}
          id={getID}
          updateProduct={fetchBrand} // Get category immediately
        />
      )}
      {isOpenDeleteBrand && (
        <DeleteModalBrand
          closeModal={setIsOpenDeleteBrand}
          id={getID}
          updateProduct={fetchBrand} // Get category immediately
        />
      )}
        </>
      ) : (
        <div>You do not have permission to perform this action. Please log in as an admin.</div>
      )}     
    
    <div className="flex justify-start items-start flex-col">
      <section className="bg-white mt-12">
          <div className="mx-auto max-w-xl">
            <form action="#" onSubmit={handlePostingBrand}>
              <div className="p-2 mb-4 w-full flex justify-start items-start flex-col gap-4">
                <label
                  htmlFor="category"
                  className="w-full text-gray-700 text-xl font-bold mb-2">
                  Adding Brand
                </label>
                <div className="flex justify-center items-center gap-4">
                  <input
                    type="text"
                    name="name"
                    value={inputBrand}
                    onChange={(e) => setInputBrand(e.target.value)}
                    placeholder="Add a Brand"
                    className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />

                  <div className=" flex w-full p-2 justify-center items-center gap-4 rounded-md focus:outline-none focus:border-blue-500">
                    <input
                      type="file"
                      onChange={(e) => {
                        setProductImages(e.target.files[0]);
                        setFile(URL.createObjectURL(e.target.files[0]));
                      }}
                      name="images"
                      accept="image/*"
                      className="w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  dark:text-neutral-400
                            file:bg-gray-50 file:border-0
                              file:me-4
                              file:py-3 file:px-4
                              dark:file:text-neutral-400"
                    />
                    <div className="flex justify-center  items-center gap-4">
                      {file && (
                        <>
                          <img
                            loading="lazy"
                            className="mt-2 w-8 h-8 rounded-md"
                            src={file}
                            alt="Select a file"
                          />
                          <i
                            className="fa-solid fa-x text-sm"
                            onClick={() => setFile(null)}></i>
                        </>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 w-1/4 text-white py-2 px-2 rounded hover:bg-blue-700">
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
                  Brand Name
                </th>
                <th className="py-4 px-6 text-center text-gray-600 font-bold uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
            {brand &&
                brand.map((brands, key) => (
                  <tr key={key}>
                    <td className="mt-12  border-b border-gray-200">
                      <div className="flex items-center p-4 gap-3">
                        <img
                          src={brands.logo_url}
                          loading="lazy"
                          alt=""
                          className="inline-block relative object-center w-12 h-12 rounded-lg border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                        />
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
                          {brands.name}
                        </p>
                      </div>
                    </td>
                    <td className="mt-12 p-4 border-b border-gray-200">
                      <div className="flex justify-center items-center">
                        <button
                          onClick={() => {
                            setGetID(brands.id);
                            setIsOpenBrand(true);
                          }}
                          type="button"
                          className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setGetID(brands.id);
                            setIsOpenDeleteBrand(true);
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

export default BrandCrud