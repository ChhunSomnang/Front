import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { getCurrentUser } from "./../../api/slice";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddToCart = async (product_id, quantity) =>{
  let token = localStorage.getItem("token") ?? "";
  token = token.replace(/"/g, "");
  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/api/add-to-cart',
      { product_id, quantity },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error adding to cart', error);
    throw error;
  }

}

const ShopByCategory = () => {

        const dispatch = useDispatch();
        const currentUser = useSelector((state) => state.user.currentUser);
        const [cartItems, setCartItems] = useState([]);
        useEffect(() => {
          dispatch(getCurrentUser());
        }, [dispatch]);
        console.log(currentUser);

        const handleAddToCart = async (product_id, quantity) => {
          try {
            const response = await AddToCart(product_id, quantity);
            console.log('Item added to cart', response);
            toast("Product add to cart Successfully")
            // Optionally update cart items state or handle UI changes
            setCartItems(prevItems => [...prevItems, response.cartItem]);
          } catch (error) {
            console.error('Failed to add item to cart', error);
            toast("Failed to add item! Please login before add to card")
          }
        };
    
    //Fetch Brnad
  const fetchBrand = async () => {
    try {
      const fetchCategoryResult = await axios.get(`${import.meta.env.VITE_API_URL}/brand`);
      setBrands(fetchCategoryResult.data.brands); // Use 'brands' instead of 'brand'
    } catch (e) {
      console.log(e.message);
    }
  };
  
  useEffect(() => {
    fetchBrand();
  }, []);

  const { categoryID } = useParams();
  // Storing Items
  const [products, setProducts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [brands, setBrands] = useState([]);

  const handleBrandChange = useCallback((brandID) => {
    setSelectedBrands((prev) =>
      prev.includes(brandID)
        ? prev.filter((id) => id !== brandID)
        : [...prev, brandID]
    );
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      //* Set default route where they get all the product from this route
      let url = `${import.meta.env.VITE_API_URL}/categories/${categoryID}/find`;
      const params = {};
  
      //* Condition Checking for filtering category, brand, latest, and discount
      if (selectedBrands.length) {
        url = `${import.meta.env.VITE_API_URL}/query-multiple-brands`;
  
        //* Always include the categoryID in the params
        params.category_id = categoryID;
  
        if (selectedBrands.length) {
          params.brand_id = selectedBrands.join(",");
        }
      }
  
      //* The URL will be changed depending on the condition above
      const response = await axios.get(url, { params });
  
      //* Determine which response key to use based on whether filters are applied
      if (selectedBrands.length) {
        setProducts(response.data.product_filter); //* If have filter value, fetch this route
      } else {
        setProducts(response.data.categories.products); //* Else get all products
      }
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  }, [categoryID, selectedBrands]);
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);


  return (
    <div className='flex gap-8 ml-28'>
        <div className='flex-col'>
            <div className="shadow-2xl gap-8 p-4 w-full">          
                <div className='w-80 mx-auto  p-6 rounded-xl '>
                <div >
                    <p className="font-semibold text-xl mb-3">Brands</p>
                    {brands &&
                      brands.map((dataBrand, key) => (
                        <div key={key}>
                          <input
                            id="default-radio-1"
                            type="checkbox"
                            value={dataBrand.id}
                            onChange={() => handleBrandChange(dataBrand.id)}
                            name="default-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
                          />
                          <label
                            htmlFor="default-radio-1"
                            className="ms-2 text-sm font-medium text-black">
                            {dataBrand.name}
                          </label>
                        </div>
                      ))}
                </div>      
          
        </div>
        
            </div>
        </div>
        <div className=' grid gap-8 grid-cols-3 grid-rows-3'>
            {products && 
            products.map((data, key) => (   
              <div key={data.id} className="w-72">   
                <div className="bg-white rounded-lg overflow-hidden shadow-lg ring-4 ring-red-500 ring-opacity-40 m  ">
                  <div className="relative">
                      <img className="w-72 h-64 p-4 shadow-md hover-scale transition-transform duration-200" src={data?.images} />
                      <div className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">SALE
                      </div>
                  </div>
                  <div className="p-4">
                      <div className='flex items-center justify-between'>
                          <h3 className="text-lg font-medium mb-2">{data?.name}</h3>
                          <span className="font-bold text-lg mb-2">${data?.price}</span>                      
                      </div>
                      <h6 className="font-light mb-2 text-gray-600">{data.brand?.name}</h6>
                      <div className="flex items-center justify-between">                  
                          <button       
                              onClick={() => handleAddToCart(data.id, 1)}                   
                              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                              Add To Cart
                          </button>
                          <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                            </svg>
                          </button>
                          <Link to={`/productdetail/${data.id}`}>
                          <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                            <i class="fa-regular fa-eye w-5 h-5 text-red-900"></i>
                          </button>
                          </Link>
                      </div>
                  </div>
              </div>
            </div>  
            ))}
            <ToastContainer />
          </div>
        </div>
  )
}

export default ShopByCategory