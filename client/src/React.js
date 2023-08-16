import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ReactTask = () => {
  const [apiData, setApiData] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedColumn, setSortedColumn] = useState('');
  const [filter, setFilter] = useState('');

  const fetchData = async () => {
    try {
      const res = await axios.get('https://randomuser.me/api?results=30');
      setApiData(res.data.results);
      console.log(res.data.results)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSort = (column) => {
    if (sortedColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortedColumn(column);
      setSortOrder('asc');
    }

    const sortedData = [...apiData].sort((a, b) => {
      const valueA = getColumnValue(a, column);
      const valueB = getColumnValue(b, column);

      if (valueA === valueB) {
        return 0;
      }

      if (['number', 'latitude', 'longitude'].includes(column)) {
        return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
      } else {
        return sortOrder === 'asc'
          ? valueA.toString().localeCompare(valueB.toString())
          : valueB.toString().localeCompare(valueA.toString());
      }
    });

    setApiData(sortedData);
  };

  const getColumnValue = (data, column) => {
    if (column === 'name') {
      return data.name.last;
    } else if (column === 'latitude') {
      return parseFloat(data.location.coordinates.latitude);
    } else if (column === 'longitude') {
      return parseFloat(data.location.coordinates.longitude);
    } else {
      return data.location[column];
    }
  };

  const filteredData = apiData.filter((val) => {
    const filterColumns = ['city', 'state', 'country', 'cell', 'name.last', 'location.coordinates.latitude', 'location.coordinates.longitude'];

    const searchableText = filterColumns
      .map((column) => {
        const columnValue = getColumnValue(val, column);
        return columnValue !== undefined ? columnValue.toString().toLowerCase() : '';
      })
      .join(' ');

    return searchableText.includes(filter.toLowerCase());
  });

  return (
    <div>
      <div>
    <button ><Link to='/' style={{textDecoration:'none'}}> home</Link></button>
      </div>
      <div>
        <input
          type="text"
          name=""
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
          placeholder="filter data"
        />
      </div>
      <div>
        <table border="1px">
          <thead>
            <tr>
              <th onClick={() => handleSort('city')}>City</th>
              <th onClick={() => handleSort('state')}>State</th>
              <th onClick={() => handleSort('country')}>Country</th>
              <th onClick={() => handleSort('postcode')}>Postcode</th>
              <th onClick={() => handleSort('number')}>Number</th>
              <th onClick={() => handleSort('name')}>Name</th>
              <th onClick={() => handleSort('latitude')}>Latitude</th>
              <th onClick={() => handleSort('longitude')}>Longitude</th>
              <th>thumbnail</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((val, index) => (
              <tr key={index}>
                <td>{val.location.city}</td>
                <td>{val.location.state}</td>
                <td>{val.location.country}</td>
                <td>{val.location.postcode}</td>
                <td>{val.cell}</td>
                <td>{val.name.last}</td>
                <td>{val.location.coordinates.latitude}</td>
                <td>{val.location.coordinates.longitude}</td>
                <td><img src={val.picture.thumbnail} alt=""/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReactTask;
