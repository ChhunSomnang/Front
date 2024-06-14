
const Advertisment = () => {
    return (
      <>
        <p className="mt-16 flex justify-center items-center text-4xl font-bold ">
          Advertisment
        </p>
        <div className="flex justify-center items-center w-full gap-8 px-28 mt-8">
          <div className="flex justify-start items-center gap-4"></div>
          <div className="w-1/2">
            <img
              src="https://marketplace.canva.com/EAFED0hv9G0/1/0/1600w/canva-blue-pink-modern-special-offer-sale-banner-J5VkNReQ8WA.jpg"
              alt="#"
              className="max-w-full h-full rounded-lg hover:scale-105"
            />
          </div>
          <div className="flex flex-col w-1/2 gap-8">
            <div className="w-full h-full">
              <img
                src="https://t4.ftcdn.net/jpg/04/89/28/05/360_F_489280525_nISHfaWCctYBFlyYkTQUkzQwVOPWmyvp.jpg"
                alt="#"
                className="max-w-full rounded-lg hover:scale-105"
              />
            </div>
            <div className="flex justify-center items-center gap-8">
              <div className="w-1/2 ">
                <img
                  src="https://i.pinimg.com/736x/f0/f9/e4/f0f9e45724771f16745ad3f6f640d3ce.jpg"
                  alt="#"
                  className="max-w-full rounded-lg hover:scale-105"
                />
              </div>
              <div className="w-1/2">
                <img
                  src="https://s.tmimgcdn.com/scr/1200x750/375400/special-sale-on-electronic-devices-banner-design-template-2_375421-original.jpg"
                  alt="#"
                  className="max-w-full rounded-lg hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="cotainer my-12 mx-28 h-0.5 border-t-0 bg-zinc-300" />
  
      </>
    );
  };

  export default Advertisment;




