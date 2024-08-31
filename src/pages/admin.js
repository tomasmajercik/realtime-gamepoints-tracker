import { useEffect, useState, useRef } from 'react';
import './admin.css';
import { database } from '../config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

//imgs

function Admin() 
{
  

  // Variables
  const [code, setCode] = useState("");
  const submitButtonRef = useRef(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Functions
  const handleSubmit = (event) =>
  {
    event.preventDefault();
    if(code === "hdq4583qrs")
    {
      localStorage.setItem('preventFromReturn', 'false');
        navigate("/redirect");
        localStorage.setItem('autentif', 'true');
    }
    else if(code === "hdq4583qro")
    {
      localStorage.setItem('preventFromReturn', 'false');
        navigate("/shop");
        localStorage.setItem('autentif', 'true');
    }
    else
    {
        setError("zadali ste nesprávny kód");
    }
  }

  const changeCode = (event) =>
  {
    setCode(event.target.value);
  }

  const handleKeyDown = (event) => 
  {
    if (event.key === 'Enter') 
    {
      event.preventDefault();
      submitButtonRef.current?.click();
    }
  };

  // Layout
  return (
    <>
      <div className='autentif'>
        <h1 className='adminH1'>Zadaj kód a heslo:</h1>
        <form method='post' onSubmit={handleSubmit}>
          <input 
            className='inputField' 
            type='password' 
            id='code' 
            name='code' 
            required 
            placeholder='kód' 
            value={code} 
            onChange={changeCode} 
            onKeyDown={handleKeyDown}
            maxLength="10"
          />
          <br/>
          <button 
            className='autentifSubmitBtn' 
            type='submit' 
            ref={submitButtonRef}
          >
            Prihlásiť sa!
          </button>
        </form>
        <h1 className='error'>{error}</h1>
      </div>
    </>
  );
}

export default Admin;