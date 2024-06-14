import CardProduct from "../../Component/CardProduct";

const TopProduct = () => {
    return (
      <>
        <div className="flex justify-center items-center mt-8 text-4xl font-bold gap-4">
          <i className="fa-solid fa-fire text-orange-700"></i>Top Products
        </div>
        <CardProduct/>
   
      </>
    );
  };
  export default TopProduct;