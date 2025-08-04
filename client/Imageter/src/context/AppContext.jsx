
import { createContext } from "react";
import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";




export const AppContext = createContext();

const AppContextProvider = (props)=> {
    const [user, setUser] = useState(localStorage.getItem('user')||null);
    const[token, setToken] = useState(localStorage.getItem('token') || null);
  const [showLogin, setShowLogin] = React.useState(false);
    const navigate = useNavigate();

    console.log(user, "contextUser")

    const [credit, setCredit] = useState(5);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const getCredits=async()=>{
        try{
            const {data}=await axios.get(backendUrl + '/api/user/credits', {
                headers:{token}
                
            });
            if(data.success){
                setCredit(data.credits);
                // setUser(data.user);
                return data.credits;
            }
        }
        catch (error) {
            console.error("Error fetching credits:", error);
            return false;
        }
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setCredit(0);
        setShowLogin(false);
        navigate('/');
    }
    const generateImage = async (prompt) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/image/generate-image', { prompt}, {
                headers: { token }
            });
            if (data.success) {
                getCredits();
                return data.imageUrl;
            }  else {
                toast.error("Error generating image:", data.message);
                const credit = await getCredits();
                if (credit <= 0) {
                    toast.error("Insufficient credits");
                    navigate('/buy')
                }
                return null;
            }
        } catch (error) {
            toast.error("Error generating image:", error);
            return null;
        }
    }
    useEffect(() => {
        if(token){
            getCredits();
        }
    }, [token]);

    
    const value = {
        user,
        setUser,
        backendUrl,
        token,
        setToken,
        credit,
        setCredit,
        getCredits,
        logout,
        showLogin,
        setShowLogin,
        generateImage
    };
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;