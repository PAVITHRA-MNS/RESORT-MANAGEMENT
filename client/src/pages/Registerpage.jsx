import { useState } from "react";
import {Link} from "react-router-dom";
import axios from "axios";

export default function Registerpage(){

    const [name,setName]=useState("");
    const [mail,setMail]=useState("");
    const [password,setPassword]=useState("");

    async function handleRegister(e){
        e.preventDefault();
        try{
        await axios.post("/register",{
            name,mail,password
        });
        alert("Registration Successful")
    }catch(error){
        alert("Registration Failed")
    }
    }

    return (
        <div className="grow flex items-center justify-around">
        <div className="mb-40">
            <h1 className="text-blue-800 text-3xl font-semibold text-center">Register</h1>
            <form onSubmit={handleRegister} action="" className="max-w-md mx-auto">
                <input type="text" placeholder="Enter Username" value={name} onChange={e=>setName(e.target.value)} />
                <input type="text" placeholder="Enter mail id" value={mail} onChange={e=>setMail(e.target.value)} /> 
                <input type="password" placeholder="Enter password" value={password} onChange={e=>setPassword(e.target.value)} />
                <button className="bg-blue-800 text-white w-full m-2 p-2 rounded-full">Register</button>
                <div className="text-center text-gray-500 p-2">
                    Already have an account?     <Link to={"/login"} className=" underline font-semibold text-black">Login</Link>
                </div>
            </form>
        </div>
        </div>
    );
}