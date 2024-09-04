import React, { useEffect, useState } from 'react';
import Cards from './Cards';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Course() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get('http://localhost:4001/book');
        console.log(res.data);
        setBooks(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    
    getBooks(); // Invoke the function here
  }, []); // Empty dependency array to run this effect only once

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl font-semibold md:text-4xl">
            We're delighted to have you <span className="text-pink-500">here!</span>
          </h1>
          <p className="mt-12">
            Where every book tells a unique story, and every reader finds their perfect match. At our bookstore, we believe in the power of stories to inspire, educate, and entertain.
          </p>
          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"> 
          {books.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Course;
