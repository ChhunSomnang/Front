export default function Footer() {
  return (
    <>
      <div className="bg-black max-w-full flex flex-col md:flex-row justify-center items-start text-white gap-12 md:gap-32 p-8 md:p-16">
        <div className="w-full md:w-1/2 flex justify-center md:justify-start items-start flex-col gap-3">
          <h2 className="text-xl font-bold text-red-600">SUPER SPORT</h2>
          <h3 className="font-semibold">Subscribe</h3>
          <p className="text-sm">Get 10% off your first order</p>
          <form className="flex max-w-sm mx-auto">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <input
                type="text"
                id="simple-search"
                className="bg-black border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <i className="fa-solid fa-envelope text-white"></i>
              </div>
            </div>
          </form>
        </div>

        <div className="w-full md:w-1/2 flex justify-center md:justify-start items-start flex-col gap-3">
          <h2 className="text-xl font-bold">Support</h2>
          <h3>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</h3>
          <p>ElectronicShop12@gmail.com</p>
          <p>+88015-88888-9999</p>
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-start items-start flex-col gap-3">
          <h2 className="text-xl font-bold">Account</h2>
          <h3>Login / Register</h3>
          <p>Cart</p>
          <p>Shop</p>
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-start items-start flex-col gap-3">
          <h2 className="text-xl font-bold">Quick Link</h2>
          <h3>Privacy Policy</h3>
          <p>Terms Of Use</p>
          <p>FAQ</p>
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-start items-start flex-col gap-3">
          <h2 className="text-xl font-bold">Social Contact</h2>
          <div className="flex justify-start items-start gap-4">
            <i className="fa-brands fa-facebook text-4xl cursor-pointer"></i>
            <i className="fa-brands fa-instagram text-4xl cursor-pointer"></i>
          </div>
        </div>
      </div>
    </>
  );
}