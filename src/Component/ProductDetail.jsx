import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import RelatedProduct from './RelatedProduct';


const ProductDetail = () => {
  
 //* Set for related products
 const [brandID, setBrandID] = useState(null);
 const [categoryID, setCategoryID] = useState(null);

   //* Using this usaParams to get the specific id of product
   const { productID } = useParams();
   const [getProductId, setGetProductId] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   const [itemsQuantity, setItemsQuantity] = useState(0);

  //* Handling quantity of products before adding to cart
  const handleIncrease = () => {
    setItemsQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setItemsQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0)); // Ensure quantity doesn't go below 0
  };
  
   const fetchProductById = useCallback(async () => {
    try {
      const getProduct = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/${productID}/find`
      );
      setGetProductId(getProduct.data.products);
      setCategoryID(getProduct.data.products.category.id);
      setBrandID(getProduct.data.products.brand.id)
      console.log("fetch product data successfully!");
    } catch (error) {
      console.log("Failed to fetch product data");
    }
  }, [productID]);

  useEffect(() => {
    fetchProductById();
  }, [fetchProductById]);
  
  console.log(getProductId)
  console.log(productID)
  console.log(categoryID)
  console.log(brandID)
  
  return (
  
  <>
      <section className="flex justify-center items-center text-gray-700 body-font flex-col bg-white">
        <nav className="flex justify-center items-center ml-12 p-4">
          <ol className="flex items-center">
            <li className="text-left">
              <div className="-m-1">
                <Link
                  to={"/"}
                  className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800">
                  Home
                </Link>
              </div>
            </li>

            <li className="text-left">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <div className="-m-1">
                  <Link
                    to={"/shop"}
                    className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800">
                    Shop
                  </Link>
                </div>
              </div>
            </li>

            <li className="text-left">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <div className="-m-1">
                  <a
                    href="#"
                    className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
                    aria-current="page">
                    {getProductId?.name}
                  </a>
                </div>
              </div>
            </li>
          </ol>
        </nav>
        <div class='flex justify-center items-center '>
      <section class="text-gray-700 body-font overflow-hidden bg-white ">
        <div class="container px-5 py-12 mx-auto ml-24">
          <div class="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="ecommerce" class="w-2/5 object-cover object-center rounded border border-gray-200" 
            src={getProductId?.images}/>
            <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 class="text-sm title-font text-gray-500 tracking-widest">{getProductId?.brand.name}</h2>
              <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{getProductId?.name}</h1>
              <h2 class="text-sm title-font text-gray-500 tracking-widest">{getProductId?.category.name}</h2>
              <p class="leading-relaxed">{getProductId?.description}</p>

              <div className="flex gap-8  mt-8 flex-col">
                <div className="flex items-center gap-4">
                  <p className="text-xl title-font text-gray-500 tracking-widest">
                    Quantity
                  </p>

                  <button
                    onClick={handleDecrease}
                    className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300">
                    <svg
                      className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <line
                        x1="4.75"
                        y1="9.51562"
                        x2="13.25"
                        y2="9.51562"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  <input
                    type="text"
                    id="number"
                    className="border border-gray-200 rounded-full w-10 aspect-square outline-none text-gray-900 font-semibold text-sm py-1.5 px-3 bg-gray-100 text-center"
                    value={itemsQuantity}
                    onChange={(e) =>
                      setItemsQuantity(parseInt(e.target.value) ?? 0)
                    }
                  />
                  {/** Arrow Right */}
                  <button
                    onClick={handleIncrease}
                    className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300">
                    <svg
                      className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <line
                        x1="9.5"
                        y1="5.01562"
                        x2="9.5"
                        y2="14.0156"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                      <line
                        x1="4.75"
                        y1="9.51562"
                        x2="13.25"
                        y2="9.51562"
                        strokeWidth="1.6"
                        strokeLinecap="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <span class="title-font font-medium text-2xl text-gray-900">${getProductId?.price}</span>
              
              <div class="flex mt-12">                
                <button class="flex  text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Add To Cart</button>
                <div>
                <Link to={'/payment'}
                  class="flex  text-black bg-gray-300  border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded ml-1">
                    Buy Now
                  
                </Link>
                </div>
                <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
         
      </section>

      <div className="flex px-20 flex-col mb-8 ">
        <div className="flex justify-start items-start gap-4">
          <div className="bg-red-600 w-4 h-8 rounded-sm"></div>
          <p className="font-semibold ">Related</p>
        </div>
        <p className="font-bold text-3xl mt-4">Related Products</p>

        <div className="container  flex gap-8 flex-wrap max-w-2xl lg:max-w-7xl">
          <div className="flex h-max mt-12  justify-start items-start gap-16 flex-wrap">
            <RelatedProduct
              categoryID={categoryID}
              brandID={brandID}
              existingID={productID}
            />
          </div>
        </div>
      </div>

      </>
      
  )
}

export default ProductDetail