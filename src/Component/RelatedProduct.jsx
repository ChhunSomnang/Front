import axios from 'axios';
import React from 'react'
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const RelatedProduct = ({ categoryID, brandID, existingID }) => {

    //* Listing Filter Product
    const [products, setProducts] = useState([]);
    const [productsByCategory, setProductsByCategory] = useState([]);
    const [productsByBrand, setProductsByBrand] = useState([]);

    //* Filter the related products by category
    const fetchRelatedProductsByCategory = async () => {
      const params = { category_id: parseInt(categoryID) };
      try {
          const response = await axios.get(
              `http://127.0.0.1:8000/api/query-multiple-categories`,
              { params }
          );
          console.log('Category Response:', response.data);
          const filteredProducts = response.data.product_filter
              ? response.data.product_filter.filter((product) => product.id !== parseInt(existingID))
              : [];
          setProductsByCategory(filteredProducts);
      } catch (err) {
          console.log('Category Error:', err.message);
      }
  };

  const fetchRelatedProductsByBrand = async () => {
      const params = { brand_id: parseInt(brandID) };
      try {
          const response = await axios.get(`http://127.0.0.1:8000/api/query-multiple-categories`, 
          { params });
          console.log('Brand Response:', response.data);
          const filteredProducts = response.data.product_filter
              ? response.data.product_filter.filter((product) => product.id !== parseInt(existingID))
              : [];
          setProductsByBrand(filteredProducts);
      } catch (err) {
          console.log('Brand Error:', err.message);
      }
  };

  useEffect(() => {
      if (categoryID) fetchRelatedProductsByCategory();
  }, [categoryID, existingID]);

  useEffect(() => {
      if (brandID) fetchRelatedProductsByBrand();
  }, [brandID, existingID]);

  useEffect(() => {
      console.log("Products by Category:", productsByCategory);
      console.log("Products by Brand:", productsByBrand);

      if (productsByCategory.length > 0 || productsByBrand.length > 0) {
          const combinedProducts = [...productsByCategory, ...productsByBrand];
          console.log("Combined Products:", combinedProducts);

          const uniqueProducts = Array.from(
              new Set(combinedProducts.map((product) => product.id))
          ).map((id) => combinedProducts.find((product) => product.id === id));
          console.log("Unique Products:", uniqueProducts);

          setProducts(shuffleArray(uniqueProducts));
      }
  }, [productsByCategory, productsByBrand]);

  const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  };

  useEffect(() => {
      console.log("Products:", products);
  }, [products]);
    
  return (
    <>
    {products && products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="w-72">   
            <div className="bg-white rounded-lg overflow-hidden shadow-lg ring-4 ring-red-500 ring-opacity-40 m  ">
              <div className="relative">
                  <img className="w-72 h-64 p-4 shadow-md hover-scale transition-transform duration-200" src={product.images} />
                  <div className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">SALE
                  </div>
              </div>
              <div className="p-4">
                  <div className='flex items-center justify-between'>
                      <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                      <span className="font-bold text-lg mb-2">${product.price}</span>                      
                  </div>
                  <h6 className="font-light mb-2 text-gray-600">{product.brand.name}</h6>
                  <div className="flex items-center justify-between">                  
                      <button                                                   
                          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                          Add To Cart
                      </button>
                      <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                        </svg>
                      </button>
                      <Link to={`/productdetail/${product.id}`}>
                      <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                        <i class="fa-regular fa-eye w-5 h-5 text-red-900"></i>
                      </button>
                      </Link>
                  </div>
              </div>
          </div>
        </div>  
        ))
    ) : (
      <p className="font-bold">There is no product to show </p>
    )}
    </>
  )
}

export default RelatedProduct