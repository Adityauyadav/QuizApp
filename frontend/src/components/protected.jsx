
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

function Protected({children}){
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [isLoading, setLoading] = useState(true);
    useEffect(()=>{
        const verification = async()=>{
            const token = localStorage.getItem("token");
            if(!token){
                setAuthenticated(false);
                setLoading(false);
                return;
            }
            try {
                await axios.get('http://localhost:3000/api/users/verify', {
                    headers: {Authorization : `Bearer ${token}`},
                });
                setAuthenticated(true);
            } catch (error) {
                localStorage.removeItem("token");
                setAuthenticated(false);
                
            }finally{
                setLoading(false);
            };
        }
        verification();
    }, []);
    if(isLoading){
        return(
            <div className="min-h-screen min-w-screen bg-black font-instrument text-white justify-center items-center flex text-xl">Loading..</div>
        )
    }
    return isAuthenticated? children : <Navigate to="/error" replace/>
};


export default Protected;