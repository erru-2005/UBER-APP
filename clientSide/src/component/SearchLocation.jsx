import React, { useEffect, useState } from 'react'
import axios from 'axios';

function SearchLocation(props) {
  const { inputValue, onSuggestionClick } = props;
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!inputValue) {
        setSuggestions([]);
        return;
      }
      try {
       
        const resp = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/maps/get-suggection`,
          {
            params: { address: inputValue },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}` || '' // Use the token from localStorage,
            },
          }
        );
      
        setSuggestions(resp.data || []);
      } catch (err) {
        setSuggestions([]);
      }
    };
    fetchSuggestions();
  }, [inputValue]);

  return (
    <div className='flex flex-col justify-start'>
      {suggestions.map((item, i) => (
        <div
          key={i}
          onClick={() => onSuggestionClick(item)}
          className='flex gap-2 px-1 items-center justify-start my-3 cursor-pointer'
        >
          <h3 className='bg-[#eee] h-7.5 w-9.5 flex justify-center items-center rounded-full'>
            <i className="ri-map-pin-line"></i>
          </h3>
          <h3>{item}</h3>
        </div>
      ))}
    </div>
  );
}

export default SearchLocation