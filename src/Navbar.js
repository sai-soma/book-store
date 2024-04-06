import React, { useState } from 'react'
import "./Navbar.css"
import { BiSolidBookHeart } from "react-icons/bi";
import { FaBell } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import axios  from 'axios';
import Home from './Home';
export default function Navbar() {
 const [flag,setFlag]=useState([]);
  async function fetchData() {
    try {
      let q=document.querySelector(".search").value;
      const url = `https://www.googleapis.com/books/v1/volumes?q=${q}`;
      const response = await axios.get(url);
      setFlag(response.data.items);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  fetchData();
  return (
    <div>
        <h3 className='title'>BookStore
            <span><input type='text' placeholder='Search ' className='search'/></span>
            <button className='SearchBtn' onClick={()=>fetchData()}>Search</button>&nbsp;&nbsp;
            <div id='icons'><BiSolidBookHeart/>&nbsp;&nbsp;<FaBell/>&nbsp;&nbsp;<IoDiamond/>&nbsp;&nbsp;<CgProfile/></div>
        </h3>
    </div>
  )
}
