import React from 'react'


const SportCategory = () => {
  return (
    <div className='w-80 mx-auto  p-6 rounded-xl '>
        <div >
            <p className="font-semibold text-xl mb-3">Sport Categories</p>
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
              VolleyBall
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
              FootBall
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
              BasketBall
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
              Camping and Hiding
            </label>
          </div>
             
      </div>
  )
};


const Brands = () => {
    return (
      <div className='w-80 mx-auto  p-6 rounded-xl '>
      <div >
          <p className="font-semibold text-xl mb-3">Brands</p>
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
            Nike
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
            Adidas
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
            Puma
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
            Mikasa
          </label>
        </div>
       
          
    </div>
      )
}
const Price = () => {
  return (
      <div className='w-80 mx-auto  p-6 rounded-xl '>
        <div >
            <p className="font-semibold text-xl mb-3">Price</p>
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
              Under $20
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
              $20-$40
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
              Over $100
            </label>
          </div>
          <div className="flex justify-start items-start mt-2 ">
            <div className="flex justify-start items-start w-full h-8">
              <input
                type="text"
                id="min-price"
                className=" p-1.5  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500  w-3/4  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Min Price"
                required
              />
            </div>
            <div className="flex justify-start items-start w-full h-8">
              <input
                type="text"
                id="max-price"
                className="p-1.5  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500  w-3/4  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Max Price"
                required
              />
            </div>
          </div>
      </div>
    )
}

function Sidebar() {
  return (
    <>
    <div className="shadow-2xl gap-8 p-4 w-full">
        <div className='w-80 mx-auto  p-6 rounded-xl '>
          <div >
              <p className="font-semibold text-xl mb-3">Sport Categories</p>
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
                VolleyBall
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
                FootBall
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
                BasketBall
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
                Camping and Hiding
              </label>
            </div>
              
        </div>
        <div className='w-80 mx-auto  p-6 rounded-xl '>
      <div >
          <p className="font-semibold text-xl mb-3">Brands</p>
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
            Nike
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
            Adidas
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
            Puma
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
            Mikasa
          </label>
        </div>
       
          
        </div>
        <div className='w-80 mx-auto  p-6 rounded-xl '>
        <div >
            <p className="font-semibold text-xl mb-3">Price</p>
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
              Under $20
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
              $20-$40
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
              Over $100
            </label>
          </div>
          <div className="flex justify-start items-start mt-2 ">
            <div className="flex justify-start items-start w-full h-8">
              <input
                type="text"
                id="min-price"
                className=" p-1.5  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500  w-3/4  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Min Price"
                required
              />
            </div>
            <div className="flex justify-start items-start w-full h-8">
              <input
                type="text"
                id="max-price"
                className="p-1.5  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500  w-3/4  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Max Price"
                required
              />
            </div>
          </div>
        </div>
      </div>
     </>  
  )
}

export default Sidebar