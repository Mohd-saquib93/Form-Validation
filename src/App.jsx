import React, { useState } from 'react';

const App = () => {
  const defaultValues = {
    firstName: {
      id: 'firstName',
      label: 'First Name',
      type: 'text',
      placeholder: 'First Name...',
      value: '',
      isError: false,
      errorMsg: 'First Name cannot be empty',
    },
    lastName: {
      id: 'lastName',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Last Name...',
      value: '',
      isError: false,
      errorMsg: 'Last Name cannot be empty',
    },
    email: {
      id: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Email...',
      value: '',
      isError: false,
      errorMsg: 'Email cannot be empty',
    },
    password: {
      id: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Password...',
      value: '',
      isError: false,
      errorMsg: 'Password cannot be empty',
    },
    confirmPassword: {
      id: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Confirm Password...',
      value: '',
      isError: false,
      errorMsg: 'Confirm Password cannot be empty',
    },
  };

  const [formData, setFormData] = useState(defaultValues);
  const [isPassMatch, setIsPassMatch] = useState(true);

  const handleInput = (e) => {
    const key = e.target.id;
    const value = e.target.value;

    const copyFormData = { ...formData };
    copyFormData[key].value = value;
    setFormData(copyFormData);

    isValidForm()
  };

  const isValidForm = () => {
    const copyFormData = { ...formData };

    // Check for empty fields
    Object.keys(copyFormData).forEach((key) => {
      const obj = copyFormData[key];
      obj.isError = !obj.value ? true : false;
    });

    // ✅ Check if passwords match
    const pass = copyFormData.password.value;
    const cPass = copyFormData.confirmPassword.value;
    setIsPassMatch(pass === cPass);

    setFormData(copyFormData);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    isValidForm();
  };

  return (
    <div className="App">
      <div className="container mt-[40px] flex justify-center items-center">
        <form onSubmit={handleFormSubmit}>
          {Object.keys(formData).map((key) => {
            const { id, label, type, placeholder, value, isError, errorMsg } = formData[key];

            return (
              <div key={id} className="form-item mt-7 w-[300px] flex flex-col">
                <label className="font-bold">{label}</label>
                <input
                  onChange={handleInput}
                  id={id}
                  placeholder={placeholder}
                  type={type}
                  value={value}
                  className={`${isError ? 'border-red-500' : 'border-gray-300'} border mt-[6px] p-[8px] text-[18px] rounded`}
                />
                {isError && <span className="error text-red-400">{errorMsg}</span>}

                {key === 'confirmPassword' && !isPassMatch && (
                  <span className="error text-red-400">Passwords do not match</span>
                )}
              </div>
            );
          })}
          <div className="form-item2 flex justify-center">
            <button
              type="submit"
              className="cursor-pointer bg-blue-200 rounded-[5px] mt-6 w-[150px] h-[40px]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
