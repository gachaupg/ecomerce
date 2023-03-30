import { useDispatch, useSelector } from "react-redux";
import {FaWhatsapp,FaMoneyCheckAlt} from 'react-icons/fa'

import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";
import { useEffect, useState } from "react";
import axios from "axios";
// import { useGetAllProductsQuery } from "../slices/productsApi";

const excerpt = (str) => {
  if (str.length > 45) {
    str = str.substring(0, 45) + " ...";
  }
  return str;
};
const Home = () => {
  function compare(a,b){
    if(a._id <b._id){
      return 1
    }
    if(a._id >b._id){
      return -1
    }return 0
  }
  
  const {items: data , status } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users,setUsers]=useState([]);
  // const { data, error, isLoading } = useGetAllProductsQuery();
  const [query,setQuery]=useState('')
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };
 
  useEffect(()=>{
    async function fetchData(){
    try {
      const res= await axios.get(`http://localhost:5000/api/products`)
      
    res.data.sort(compare)
    const result = res.data.filter((_, index) => index < 30);
    setUsers(  result)
    console.log(users);
    
    } catch (error) {
      console.log(error);
      
    }
    }
    fetchData()
      },[])

  return (
    <div className="home-container">
      {status === "success" ? (
        <>
<div className='search'>      
      <input type="text" placeholder='Search by title...' onChange={(e)=>setQuery(e.target.value)} />
     
</div>
          <h3 style={{color:'blue ' ,textAlign:'center'}}>New Arrivals</h3>
          <div className="products">
            {users &&
              users.filter((user)=>user.name.toLowerCase().includes(query)).map((product) => (
                <div key={product._id} className="product">
                  <h3>{product.name}</h3>
                  <img src={product.image?.url} alt={product.name} />
                  {/* <div className="details">
                 
                    <span className="pric"><span style={{display:'flex', gap:'2rem'}}>Price</span> <span>ksh{product.price}</span> </span>
                  </div> */}
                   <div className="details">
                    <span style={{display:'flex', gap:'4rem'}} > <span> price </span> <span> ksh {product.price}</span></span>
                  </div> 
                  <div className="details">
                    
                    <span style={{display:'flex', gap:'4rem'}} > <span >location</span>   <span>{product.location}</span> </span>
                  </div>
                  <div className="details">
                    
                    <span style={{display:'flex', gap:'4rem'}} > 
                    <span>{excerpt(product.desc)}
            <Link to={`/tour/${product._id}`}>Read More</Link></span>
                     </span>
                  </div>
                  <button onClick={() => handleAddToCart(product)}>
                  Buy
                  </button>
                 
                  <a  href={`https://wa.me/${product.No}`} target="_blank" rel="noreferrer noopener" style={{color:'orangered',listStyle:'none',textDecoration:'none'}}>
                    <button style={{backgroundColor:'red'}}>get in touch <FaWhatsapp/>Whatsapp</button>
                    </a>
                </div>
              ))}
          </div>
        </>
      ) : status === "pending" ? (
        <p>Loading...</p>
      ) : (
        <p>Unexpected error occured...</p>
      )}
    </div>
  );
};

export default Home;
