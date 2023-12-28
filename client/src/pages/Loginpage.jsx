import axios from "axios";
import { useContext, useState } from "react";
import {Link, Navigate} from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Loginpage(){

    const [mail,setMail]=useState("")
    const [password,setPassword]=useState("")
    const [redirect,setRedirect]=useState(false);
    const {setUser}=useContext(UserContext)

    async function handleLogin(event){
        event.preventDefault();
        try{
            const {data}=await axios.post("/login",{
                mail,password
            })
            setUser(data)
            setRedirect(true);
            
            
        }catch(err){
            console.log(err);
            
        }
    }

    if(redirect){
        return <Navigate to="/" />
    }

    return (
        <div className="grow flex items-center justify-around">
        <div className="mb-40">
            <h1 className="text-blue-800 text-3xl font-semibold text-center">Login</h1>
            <form onSubmit={handleLogin} className="max-w-md mx-auto">
                <input type="text" placeholder="Enter mail id" value={mail} onChange={e=>setMail(e.target.value)} /> 
                <input type="password" placeholder="Enter password" value={password} onChange={e=>setPassword(e.target.value)} />
                <button className="bg-blue-800 text-white w-full m-2 p-2 rounded-full">Login</button>
                <div className="text-center text-gray-500 p-2">
                    Don't have an account yet?     <Link to={"/register"} className=" underline font-semibold text-black">Register Now</Link>
                </div>
            </form>
        </div>
        </div>
    );
}