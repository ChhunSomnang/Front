import CardProduct from "../../Component/CardProduct";

const DiscountProduct = () => {
    return (
      <>
        <div className="flex justify-center items-center mt-8 text-4xl font-bold gap-4">
          <i className="text-red-500 fa-solid fa-arrow-trend-up"></i>Discount
          Product
        </div>
        <CardProduct/>  
      </>
    );
  };

  export default DiscountProduct;