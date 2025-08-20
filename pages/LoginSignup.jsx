import React from 'react'
import './css/loginsignup.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginSignup() {
  const [state, setState] = useState("login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeHandller = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
    setError("");
  }

  const login = async () => {
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.errors || "Login failed");
      }

      localStorage.setItem('auth-token', data.token);
      window.location.replace("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const SingUp = async () => {
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.errors || "Signup failed");
      }

      localStorage.setItem('auth-token', data.token);
      window.location.replace("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsign-contianer">
        <h1>{state}</h1>
        
        {error && <div style={{color: '#ff4141', marginBottom: '15px'}}>{error}</div>}
        
        <div className="loginsignupfields">
          {state==="Sign Up" && 
            <input 
              name='username' 
              value={formData.username} 
              onChange={changeHandller} 
              type="text"
              placeholder='enter your name'
            />
          }
          
          <input  
            name='email' 
            value={formData.email} 
            onChange={changeHandller}  
            type="email"
            placeholder='enter your email'
          />
          
          <input 
            name='password' 
            value={formData.password} 
            onChange={changeHandller} 
            type="password"
            placeholder='enter your password'
          />
        </div>
        
        <button onClick={() => state==="login" ? login() : SingUp()} disabled={loading}>
          {loading ? 'Loading...' : 'Continue'}
        </button>
        
        {state==="Sign Up" ? 
          <p className="loginsignup-login">
            Already have an account?
            <span onClick={() => { setState('login'); setError(""); }}>login here</span>
          </p> :
          <p className="loginsignup-login">
            create an account?
            <span onClick={() => { setState("Sign Up"); setError(""); }}> Click here</span>
          </p>
        }
        
        <div className="loginsignup-agrement">
          <input type="checkbox" name='' id='' required />
          <p>by continuing, i agree to the term of use and privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup