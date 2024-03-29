import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import styled from "styled-components";
import { Link,useNavigate } from "react-router-dom"
import axios from "axios"
import { useState,useEffect } from "react"
import logo from "../assets/logo.svg"
import { registerRoute } from "../utils/APIRoutes";

function Register() {
    const navigateTo = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const toastOptions = {
        positon: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }

    useEffect(() => {
        if(localStorage.getItem('chat-app-user')){
            navigateTo("/")
        }
    },[navigateTo])


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(handleValidation()){
            const { password, username, email } = values;
            const { data } = await axios.post(registerRoute, {
                username,
                email,
                password
            })
            if(data.status === false) {
                toast.error(data.msg, toastOptions)
            }if(data.status === true) {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user))
                navigateTo("/")
            }
        }
    };

    const handleValidation = () => {
        console.log("Hello")
        const { password, confirmPassword, username, email } = values;
        if (confirmPassword !== password) {
            toast.error("Password and confirm password should be same", toastOptions);
            return false;
        } else if(username.length < 3) {
            toast.error("Username should be greater than 3 characters",toastOptions)
            return false;
        } else if(password.length < 6) {
            toast.error("Password should be greater than 6 characters",toastOptions)
            return false;
        } else if(email === "") {
            toast.error("Email is Required",toastOptions)
            return false;
        }
        return true;
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    return (
        <>
            <FormContainer>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="brand">
                        <img src={logo} alt="Snappy logo" />
                        <h1>Snappy</h1>
                    </div>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        onChange={(e) => handleChange(e)}
                    />
                    <button type="submit">Create User</button>
                    <span>already have an account? <Link to="/login">Login</Link></span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    );
}

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
  }
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
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
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
`;
export default Register;
