import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import React, { useState,useEffect } from 'react';
import Link from 'next/link'
//import styles from '../../styles/ProductListing.module.css'

export default function ProductListing() {
const pageTitle = "Product Listing Page";
const [productList, setProductList] = useState([]);
const [tempProductList, setTempProductList] = useState([]);
const [categoryList, setCategoryList]= useState([]);
const [activeItem, setActiveItem]= useState('all');

useEffect(() => {
  // Update the document title using the browser API
  
  getCategory();
  getProduct();

},[]);


async function getProduct(){

  const res = await axios.get(`https://fakestoreapi.com/products`)
  setProductList(res.data);
  setTempProductList(res.data);

}

async function getCategory(){

  const res = await axios.get(`https://fakestoreapi.com/products/categories`)
  setCategoryList(res.data);

}


function filterProducts(categoryName){

  if(categoryName == 'all'){
    setTempProductList(productList);
    setActiveItem('all');
    return;
  }
  let res = productList.filter(function(record){

    return record.category === categoryName;
  })

  setActiveItem(categoryName);
  setTempProductList(res);

}


  return (
    <div className="container">
    <Head>
      <title>{pageTitle} </title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="sidebar">
        {/* <a className="active" href="#home">Home</a>
        <a href="#news">News</a>
        <a href="#contact">Contact</a>
        <a href="#about">About</a> */}

      <Link href="#" key="all">  
        <a className={'all' == activeItem ? 'active':''} onClick={event => filterProducts('all')} >All</a>
      </Link>

     {categoryList.map((item,index)=>{

         return <Link href="#" key={index} >
              <a  className={item == activeItem ? 'active':''} onClick={event =>filterProducts(item)}>{item}
              </a>
            </Link>
     })}
      

    </div>
    <div className="content">
      <div className="listing-section">
        {tempProductList.map((item,index)=>{
                return <div className="product" key={index}>
                <div className="image-box">
                  <div className="images">
                    <Image src={item.image} alt={item.title} layout="fill" />
                  </div>
                </div>
                <div className="text-box">
                  <h2 className="item set-product-content" title={item.title}>{item.title}</h2>
                  <h3 className="price">{item.price}</h3>
                  <h3 className="price">{item.category}</h3>
                  <p className="description set-product-content" title={item.description}>{item.description}</p>
                  
                  <button type="button" name="item-2-button" id="item-2-button">Add to Cart</button>
                </div>
              </div>    
            })}
      
      </div>
  </div> 
</div>
    
    
    )    
}
