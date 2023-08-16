import React, { useEffect, useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function Node() {
  const [data, setData] = useState();
  const [timer, setTimer] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:1010/api/data', {
          headers: {
            'token': 'ab4086ecd47c568d5ba5739d4078988f',
          }
        });

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const dataIntervalId = setInterval(fetchData, 60000);

    const timerIntervalId = setInterval(() => {
      const date = new Date();
      setTimer(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
    }, 1000);

    return () => {
      clearInterval(dataIntervalId);
      clearInterval(timerIntervalId);
    };
  }, []);

  return (
    <div className="App">
            <button ><Link to='/' style={{textDecoration:'none'}}> home</Link></button>

      <h1>{timer}</h1>
      <header className="">
        <h1>Bitcoin Price Data</h1>
        {data && (
          <div>
            <p>Bid Price: {data.bidPrice}</p>
            <p>Bid Quantity: {data.bidQty}</p>
            <p>Ask Price: {data.askPrice}</p>
            <p>Ask Quantity: {data.askQty}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default Node;
