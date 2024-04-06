import React, { useState, useEffect } from 'react'
import axios from "axios"
import "./Home.css"
export default function Home() {
  const [books, setBooks] = useState([]);
  const [sbook, setSbook] = useState(null);
  const [selectedBookId, setSelectedBookId] = useState(null);


  async function fetchData() {
    try {
      const url = `https://www.googleapis.com/books/v1/volumes?q=harry+potter`;
      const url1=`https://www.googleapis.com/books/v1/volumes?q=Sherlock+Holmes`;
      const response = await axios.get(url);
      const res=await axios.get(url1);
      setBooks([...response.data.items, ...res.data.items]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function handleClick(book){
    setSbook(book);
    setSelectedBookId(book.id);
  }

   useEffect(()=>{fetchData()}
   ,[])

    return (
        <div className="Book-container">
          {
            books && books.map(elem=>(
            <div key={elem.id} className={`book-item ${selectedBookId === elem.id ? 'clicked' : ''}`}>
                {elem.volumeInfo.imageLinks && (
                  <img src={elem.volumeInfo.imageLinks.thumbnail} alt='book-thumbnail' onClick={()=>handleClick(elem)}/>
                )}
                <div className="buttons">
              <h3>{elem.volumeInfo.title}</h3>
              <a href={elem.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer">
                Read Now
              </a>&nbsp;
              <a href={elem.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">
                More Info
              </a>
            </div>
              <div id='desc'></div>
            </div>
            ))
          }
          {
             sbook && (document.getElementById("desc").innerHTML=`<div className="selected-book">
            <h2>${sbook.volumeInfo.title}</h2>
            <p>${sbook.volumeInfo.description}</p>
            <div className="options">
            <a href=${sbook.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">More Info</a>
            <a href=${sbook.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer">Preview</a>
          </div>
            </div>`)
          }
        </div> 
    );
}
