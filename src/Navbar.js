import React, { useState, useEffect} from 'react'
import "./Navbar.css"
import { BiSolidBookHeart } from "react-icons/bi";
import { FaBell } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import axios  from 'axios';
import Home from './Home';
export default function Navbar() {
 const [books,setBooks]=useState([]);
 const [searchQuery, setSearchQuery] = useState('');
 const [searchClicked, setSearchClicked] = useState(false);


 useEffect(() => {
  if (searchClicked) {
    fetchBooks(searchQuery);
  }
}, [searchClicked]);

  const fetchBooks = async (query) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
      setBooks(response.data.items);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSearchClicked(true);
    } else {
      setBooks([]);
    }
  };
  return (
    <div>
        <h3 className='title'>BookStore
            <span><input type='text' placeholder='Search ' className='search'  onChange={(e)=>setSearchQuery(e.target.value)}/></span>
            <button className='SearchBtn' onClick={handleSearch}>Search</button>&nbsp;&nbsp;
            <div id='icons'><BiSolidBookHeart/>&nbsp;&nbsp;<FaBell/>&nbsp;&nbsp;<IoDiamond/>&nbsp;&nbsp;<CgProfile/></div>
        </h3>
        <div className='book-container'>
        { 
        searchClicked && books.map((book) => (
          <div key={book.id} className="book-card">
            {book.volumeInfo.imageLinks && (
              <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
            )}           
            <div className="buttons">
              <h3>{book.volumeInfo.title}</h3>
              <a href={book.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer">
                Read Now
              </a>&nbsp;
              <a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">
                More Info
              </a>
            </div>
          </div>
        ))}
</div>
    </div>
    
  )
}
