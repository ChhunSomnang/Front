import React from 'react'
import axios from "axios";
import { useEffect, useState , useCallback} from "react"
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { getCurrentUser } from "./../api/slice";
import { Link } from "react-router-dom";
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

function Shop() {
         // Fetch Product Items
        // const [items, setItems] = useState([]);
        // const fetchProduct = async () => {
        //   try {
        //     const fetchProductResult = await axios.get(
        //       `${import.meta.env.VITE_API_URL}/products`
        //     );
        //     setItems(fetchProductResult.data.products);
        //   } catch (e) {
        //     console.log(e.message);
        //   }
        // };
        // useEffect(() => {
        //   fetchProduct();
        // }, []);

        //Add to cart
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

        const [products, setProducts] = useState([]);
        const [categories, setCategories] = useState([]);
        const [brands, setBrands] = useState([]);
        const [selectedCategories, setSelectedCategories] = useState([]);
        const [selectedBrands, setSelectedBrands] = useState([]);
        const [selectedPriceAbove, setSelectedPriceAbove] = useState(false);
        const [selectedPriceBelow, setSelectedPriceBelow] = useState(false);
        const [minPrice, setMinPrice] = useState(0);
        const [maxPrice, setMaxPrice] = useState(0);
        const [loading, setLoading] = useState(false);


        const handleCategoryChange = useCallback((categoryID) => {
          setSelectedCategories((prev) =>
            prev.includes(categoryID)
              ? prev.filter((id) => id !== categoryID)
              : [...prev, categoryID]
          );
        }, []);
      
        const handleBrandChange = useCallback((brandID) => {
          setSelectedBrands((prev) =>
            prev.includes(brandID)
              ? prev.filter((id) => id !== brandID)
              : [...prev, brandID]
          );
        }, []);

        //* Fetch Categories and Brand
        const fetchCategoriesAndBrands = useCallback(async () => {
          try {
            const [categoriesResponse, brandsResponse] = await Promise.all([
              axios.get(`${import.meta.env.VITE_API_URL}/categories`),
              axios.get(`${import.meta.env.VITE_API_URL}/brand`),
            ]);

            setCategories(categoriesResponse.data.category);
            setBrands(brandsResponse.data.brands);
          } catch (e) {
            console.error("Error fetching categories and brands:", e.message);
          }
        }, []);

        useEffect(() => {
          fetchCategoriesAndBrands();
        }, [fetchCategoriesAndBrands]);

        //* Fetch Products by selected categories and brands
   //* Fetch Products by selected categories and brands
   const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      //* Base URL for fetching products
      let url = `${import.meta.env.VITE_API_URL}/products`;
      const params = {};

      //* Update URL and params if any filter is applied
      const filtersApplied =
      selectedCategories.length ||
      selectedBrands.length ||
      minPrice ||
      maxPrice ||
      selectedPriceAbove ||
      selectedPriceBelow;

      if (filtersApplied) {
        url = `${import.meta.env.VITE_API_URL}/query-multiple-categories`;

        if (selectedCategories.length) {
          params.category_id = selectedCategories.join(",");
        }
        if (selectedBrands.length) {
          params.brand_id = selectedBrands.join(",");
        }
        if (minPrice) {
          params.price_min = minPrice;
        }
        if (maxPrice) {
          params.price_max = maxPrice;
        }
        if (selectedPriceBelow) {
          params.price_condition = "under_300";
        }
        if (selectedPriceAbove) {
          params.price_condition = "above_300";
        }
      }

          //* Fetch products from the determined URL with the parameters
          const response = await axios.get(url, { params });
          //* Set products based on whether filters were applied
          setProducts(
            filtersApplied ? response.data.product_filter : response.data.products
          );
        } catch (error) {
          console.error("Error fetching products:", error.message);
        } finally {
          setLoading(false);
        }
      }, [
        selectedCategories,
        selectedBrands,
        minPrice,
        maxPrice,
        selectedPriceBelow,
        selectedPriceAbove,
      ]);

      useEffect(() => {
        fetchProducts();
      }, [fetchProducts]);
      

  return (
    <div className='flex gap-8 ml-28'>
        <div className='flex-col'>
            <div className="shadow-2xl gap-8 p-4 w-full">
          <div className='w-80 mx-auto  p-6 rounded-xl '>
            <div >
                <p className="font-semibold text-xl mb-3">Sport Categories</p>
                {categories &&
                categories.map((dataCategory, key) => (
                  <div key={key}>
                    <input
                      id="default-radio-1"
                      type="checkbox"
                      value={dataCategory.id}
                      onChange={() => handleCategoryChange(dataCategory.id)}
                      name="default-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
                    />
                    <label
                      htmlFor="default-radio-1"
                      className="ms-2 text-sm font-medium text-black">
                      {dataCategory.name}
                    </label>
                  </div>
                ))}
              </div>
                
          </div>
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
        <div className='w-80 mx-auto  p-6 rounded-xl '>
        <div >
            <p className="font-semibold text-xl mb-3">Price</p>
            <input
              id="default-radio-1"
              type="checkbox"
              value=""
              checked={selectedPriceBelow}
              onChange={() => setSelectedPriceBelow(!selectedPriceBelow)}
              name="default-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 "
            />
            <label
              htmlFor="default-radio-1"
              className="ms-2 text-md font-medium text-black">
              Below $50
            </label>
          </div>

          <div>
            <input
              id="default-radio-1"
              type="checkbox"
              value=""
              name="default-radio"
              checked={selectedPriceAbove}
              onChange={() => setSelectedPriceAbove(!selectedPriceAbove)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 "
            />
            <label
              htmlFor="default-radio-1"
              className="ms-2 text-md font-medium text-black">
             $50 - Above
            </label>
          </div>

          <div>
            <input
              id="default-radio-1"
              type="checkbox"
              value=""
              name="default-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 "
            />
            <label
              htmlFor="default-radio-1"
              className="ms-2 text-md font-medium text-black">
              $50-100$
            </label>
          </div>
          
          <div className="flex justify-start items-start mt-2 ">
            <div className="flex justify-start items-start w-full h-8">
              <input
                type="text"
                id="min-price"
                onChange={(e) => setMinPrice(e.target.value)}
                className=" p-1.5  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500  w-3/4  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Min Price"
                required
              />
            </div>
            <div className="flex justify-start items-start w-full h-8">
              <input
                type="text"
                id="max-price"
                onChange={(e) => setMaxPrice(e.target.value)}
                className="p-1.5  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500  w-3/4  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Max Price"
                required
              />
            </div>
          </div>
        </div>
            </div>
        </div>

        <div className='my-14 grid gap-8 grid-cols-3 grid-rows-3'>
            {products && 
            products.map((data, key) => (   
              <div key={data.id} className="w-72">   
                <div className="bg-white rounded-lg overflow-hidden shadow-lg ring-4 ring-red-500 ring-opacity-40 m  ">
                  <div className="relative">
                      <img className="w-72 h-64 p-4 shadow-md hover-scale transition-transform duration-200" src={data.images} />
                      <div className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">SALE
                      </div>
                  </div>
                  <div className="p-4">
                      <div className='flex items-center justify-between'>
                          <h3 className="text-lg font-medium mb-2">{data.name}</h3>
                          <span className="font-bold text-lg mb-2">${data.price}</span>                      
                      </div>
                      <h6 className="font-light mb-2 text-gray-600">{data.brand.name}</h6>
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

export default Shop
