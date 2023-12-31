import React,{useEffect,useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../assets/logo.svg"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";


import { loginRoute } from '../utils/APIRoutes';
import { useNavigate } from 'react-router-dom';


// user login function

function Login() {
   const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        password:"",
    });


    // after submitting user detail

    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(handleValidation()){
          // console.log("api is called",loginRoute)
         const {password,username} = values;
         const {data} = await axios.post(loginRoute,{
            username,
            password,
         });

         if(data.status === false){
          toast.error(data.msg ,toastOption);
         }

         if(data.status === true){
          localStorage.setItem('chat-app-user', JSON.stringify(data.user));
         }
          navigate("/");
         
        }

     
    };

    // to give user alert

    const toastOption = {
            position:"bottom-right",
            autoClose: 8000,
            pauseOnHover:true,
            theme: "dark"
    }

    // if user is already login

    useEffect(()=>{
      if(localStorage.getItem('chat-app-user')){
        navigate('/');
      }
    },[]);

// if user detail is not valid

    const handleValidation = ()=>{
        const {password,username} = values;

        if(password === ""){
            toast.error(" incorrect username or password " ,toastOption);
            return false;
        }else if(username.length === "" ){
            toast.error("incorrect username or password" , toastOption);
            return false;
        }
        return true;
    }

    // updating states

    const handleChange =(event)=>{
        setValues({ ...values, [event.target.name]: event.target.value });
    };
  return (
    <>
    <FormContainer> 
        <form onSubmit={(event)=>handleSubmit(event)}>
            <div className="brand">
                <img src= {Logo} alt= "Logo"/>
                <h1>Snappy</h1>
            </div>
            <input type="text" placeholder='username' name='username' onChange={(e)=>handleChange(e)} min= "3"/>
            <input type="password" placeholder='password' name='password' onChange={(e)=>handleChange(e)}/>
            <button type='submit'>Login</button>
            <span>Don't have an account a user ? <Link to  = "/register"> Login</Link></span>
        </form>

        
    </FormContainer>
    <ToastContainer/> 
    </>
  )
}

//login component style

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 5rem;
    }

    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;

    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;

      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
      
    }
    button {
        background-color: #997af0;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        text-transform: uppercase; 
        transition: 0.5s ease-in-out; 
        &:hover {
          background-color: #4e0eff; 
        }
      } 
      span {
        color: white;
        text-transform: uppercase;
        
        a {
          color: #4e0eff;
          text-decoration: none;
          font-weight: bold; 
        }
      }
      
  }
`;


export default Login;
