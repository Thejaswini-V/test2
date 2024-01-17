import React, { useState, useEffect } from 'react';
import './Web.css';

function Web() {
  const [submittedData, setSubmittedData] = useState([]);
  const [name, setName] = useState('');
  const [options, setOptions] = useState('');

  const handleChange = (event) => {
    const { id, value } = event.target;
    if (id === 'name') {
      setName(value);
    }
    if (id === 'options') {
      setOptions(value);
    }
  };

  const fetchEmployeeList = async () => {
    try {
      const response = await fetch('http://localhost:3001/forms');
      const newData = await response.json();

      if (newData !== null) {
        setSubmittedData(newData);
      }
    } catch (error) {
      console.error('Error fetching employee list:', error);
    }
  };

  const handleSubmit = async (event) => {
    console.log('Submitting form');
    event.preventDefault();

    try {
      const reqData = {
        name,
        options,
      };

      const response = await fetch('http://localhost:3001/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log(result.message);
        alert('REGISTRATION COMPLETE');
        setSubmittedData((prevData) => [...prevData, reqData]);
        setName('');
        setOptions('');
        fetchEmployeeList();
      } else {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        const errorText = await response.text();
        console.error(`Response: ${errorText}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  useEffect(() => {
    fetchEmployeeList();
  }, []);

  return (
    <div className='body'>
      <div className='box'>
        <input type='text' name='name' onChange={handleChange} minLength={3} maxLength={10} />
        <input type="radio" onChange={handleChange} name="option" value="option1" />
        <input type="radio" onChange={handleChange} name="option" value="option2" />
        <input type="radio" onChange={handleChange} name="option" value="option3" />
        <button type="button" onClick={handleSubmit}>Submit</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {submittedData.map((data, index) => (
            <tr key={index}>
              <td>{data.name}</td>
              <td>{data.option}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Web;
