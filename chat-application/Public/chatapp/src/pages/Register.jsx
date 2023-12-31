import React,{useEffect,useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../assets/logo.svg"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import { registerRoute } from '../utils/APIRoutes';
import { useNavigate } from 'react-router-dom';



// register function
function Register() {
   const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email:"",
        password:"",
        confirmpassword: "",

    });

  // after submitting user detail

    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(handleValidation()){
          // console.log("api is called",registerRoute)
         const {password,username,email} = values;
         const {data} = await axios.post(registerRoute,{
            username,
            email,
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

     //if user fill incorrect detail

    const toastOption = {
            position:"bottom-right",
            autoClose: 8000,
            pauseOnHover:true,
            theme: "dark"
    }

    // if user is login

    useEffect(()=>{
      if(localStorage.getItem('chat-app-user')){
        navigate('/');
      }
    },[]);


    // if user detail is invalid

    const handleValidation = ()=>{
        const {password,confirmpassword,username,email} = values;

        if(password !== confirmpassword){
            toast.error("password and confirm password should be same" ,toastOption);
            return false;
        }else if(username.length < 3){
            toast.error("username should be greater than 3 character", toastOption);
            return false;
        }
        else if(password.length < 8){
            toast.error("password should be  equal or greater than 3 character", toastOption);
            return false;
        }
        else if(email === ""){
            toast.error("email is required", toastOption);
            return false;
        }
        return true;
    }


    // updating a state

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
            <input type="text" placeholder='username' name='username' onChange={(e)=>handleChange(e)}/>
            <input type="email" placeholder='email' name='email' onChange={(e)=>handleChange(e)}/>
            <input type="password" placeholder='password' name='password' onChange={(e)=>handleChange(e)}/>
            <input type="password" placeholder='confirm password' name='confirmpassword' onChange={(e)=>handleChange(e)}/>
            <button type='submit'>Create User</button>
            <span>already a user ? <Link to  = "/login"> Login</Link></span>
        </form>

        
    </FormContainer>
    <ToastContainer/> 
    </>
  )
}

// from style

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


export default Register;
