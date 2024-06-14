import React, { useEffect, useState } from 'react'
import Slider from '../Component/Slider'
import DiscountProduct from './HomePage/DiscountProduct'
import TopProduct from './HomePage/TopProduct'
import NewProduct from './HomePage/NewProduct'
import Advertisment from './HomePage/Advertisment'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Product from '../Component/Product'



const products = [


  {
    id: 1,
    name: 'VOLLEYBALL',
    href: '/volleyball',
    imageSrc: 'https://cdn.britannica.com/81/198481-050-10CED2D9/Gilberto-Godoy-Filho-ball-Brazil-Argentina-volleyball-2007.jpg',
    
  },
  {
    id: 2,
    name: 'BASKETBALL',
    href: '#',
    imageSrc: 'https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/ef694d9b-8d0b-4d92-9a6c-dbdf5db61071/nike-basketball.jpg',
    
  },
  {
    id: 3,
    name: 'FOOTBALL',
    href: '#',
    imageSrc: 'https://www.lestagelaw.com/wp-content/uploads/2023/08/2020-12-08T214604Z_1790563263_UP1EGC81OGSC6_RTRMADP_3_SOCCER-CHAMPIONS-FCB-JUV-REPORT-e1607466044149.jpg',
    
  },
  {
    id: 4,
    name: 'CAMPING',
    href: '#',
    imageSrc: 'https://static.toiimg.com/photo/100182318.cms',
    
  },
  {
    id: 5,
    name: 'TENNIS',
    href: '#',
    imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/2013_Australian_Open_-_Guillaume_Rufin.jpg/800px-2013_Australian_Open_-_Guillaume_Rufin.jpg',
    
  },
  {
    id: 6,
    name: 'RUNNING',
    href: '#',
    imageSrc: 'https://runningmagazine.ca/wp-content/uploads/2021/10/640px-DOH50265_200m_men_final_48911163797.jpg',
    
  },
]


const HomePage = () => {
  const [getCategory, setGetCategory] = useState([]);
  const fetchCategory = async () => {
    try {
      const fetchCategoryResult = await axios.get(
        `${import.meta.env.VITE_API_URL}/categories`
      );
      setGetCategory(fetchCategoryResult.data.category);
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  return (    
    <div>
      <div className="justify-center items-start mx-12 gap-4 ">        
        <div className="flex justify-center items-start mx-8 gap-4 ">
          <div className="category ml-20">
            <p className="font-bold text-xl mb-8">Shop By Category</p>
            <ul className="flex justify-start items-start flex-col gap-3 text-sm ">
              {getCategory &&
                    getCategory.map((data, key) => (                      
                      <li key={key}>
                        <Link to={`/shop-by-category/${data.id}`}>
                        {data.name}
                      </Link>
                      </li>
              ))}
            </ul>
          </div>
          <div className="inline-block h-[21rem] min-h-[1.5rem] w-px self-stretch bg-zinc-300 ml-4"></div>
          <Slider/>
        </div>
        <div className="flex px-20 flex-col mb-8 mt-12">
          <div className="flex justify-start items-start gap-4">
            <div className="bg-red-600 w-4 h-8 rounded-sm"></div>
            <p className="font-semibold "></p>
          </div>
          <p className="font-bold text-3xl mt-4">All Products</p>

          <div className="container  flex gap-8 flex-wrap max-w-2xl lg:max-w-7xl">
            <div className="flex h-max mt-12  justify-start items-start gap-9 flex-wrap">
              <Product />
            </div>
          </div>
        </div>
          <Advertisment/>
      </div>
    </div>


     



        
 
  )
}

export default HomePage