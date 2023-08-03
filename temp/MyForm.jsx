import { useState } from 'react';

const MyForm = () => {
  const initialFormState = {
    name: '',
    email: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [reset, setReset] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here with formData
    console.log('Form submitted:', formData);
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setReset(false);
  };

  return (
    <>
        <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <br />
      <button className='btn btn-primary' type="submit">Submit</button>
      {reset && handleReset()}
    </form>
      <button className='btn btn-primary' type="button" onClick={() => setReset(true)}>Reset</button></>
  );
};

export default MyForm;
