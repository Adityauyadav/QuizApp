import { useState } from 'react';
import landingPageImage from '../assets/landingPage-bg.jpg'
import axios from 'axios';
import {z} from 'zod';
import SignUp from './signupPage';

const loginSchema = z.object({
    userEmail : z.email("Invalid email"),
    userPassword : z.string().min(8, "Invalid Password"),
})

function Login(){
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(true);
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showSignUp, setShowSignup] = useState(false);

    const handleSubmit = async (userEmail, userPassword)=>{
        try {
            const validation = loginSchema.safeParse({userEmail:userEmail, userPassword:userPassword});
            if(!validation.success){
                const message = validation.error.issues[0].message;
                setErrorMessage(message);
                return
            }
            const response = await axios.post('http://localhost:3000/api/users/login', {
                userEmail, userPassword
            })
            localStorage.setItem("token", response.data.token);
            setErrorMessage(""); 
        } catch (error) {
            console.error(error);
            setErrorMessage(error.response?.data?.message || "Internal Server Error")
            
        }
    }
    return(
        <div className='relative flex flex-col w-screen h-screen font-instrument'>
            <img src={landingPageImage} alt="Image BG" className='absolute w-screen h-screen object-cover -z-1' />
            <nav className='relative z-10 bg-white/10 backdrop-blur-sm border-b border-white/20 px-8 py-4'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-2xl font-semibold text-gray-800'>Quizzy</h1>
                    <div className='flex gap-4'>
                        <button className='text-gray-700 hover:text-gray-900'>About</button>
                        <button className='text-gray-700 hover:text-gray-900'>Contact</button>
                    </div>
                </div>
            </nav>

            <div className='relative flex items-center justify-center flex-1'>
                {isVisible && (
                    <div className='bg-white/90 backdrop-blur-md border rounded-lg flex flex-col justify-center w-sm shadow-2xl'>
                        <div className='flex items-center justify-between pl-4 pr-4 border-b-1 p-1.5'>
                            <h1 className='font-medium text-gray-600'>Log in or sign up</h1>
                            <button 
                                onClick={() => setIsVisible(false)}
                                className='text-gray-600 hover:text-gray-800 text-xl font-bold'
                            >
                                ×
                            </button>
                        </div>
                        {showSignUp && (<SignUp goToLogin={()=>setShowSignup(false)} />)};
                        {!showSignUp && (
                            <div className='pl-10 pt-10 pr-10 pb-10 gap-2 flex flex-col'>
                                <h1 className= 'text-3xl font-medium'>Welcome to Quizzy</h1>
                                <h1 className='text-md text-gray-700 '>Email Address</h1>
                                <input type="text" value={email} onChange={(e)=>(setEmail(e.target.value))} className='border rounded-sm px-3 py-0.25'/>
                                <h1 className='text-md text-gray-700 '>Password</h1>
                                <div className='relative'>
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className='border rounded-sm px-3 py-0.25 w-full pr-10'
                                    />
                                    {password && (
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 text-sm'
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </button>
                                    )}
                                </div>
                                <div className='text-left'>
                                    <button className='text-sm text-gray-500 hover:text-blue-800 hover:underline'>
                                        Forgot password?
                                    </button>
                                </div>
                                {errorMessage.length > 0 && <p className='text-red-500 text-sm'>{errorMessage}</p>}
                                <div className='flex justify-between mt-4 items-end'>
                                    <button className='bg-blue-700 hover:bg-black text-white font-medium py-2 px-4 rounded' onClick={()=>{handleSubmit(email,password)}}>
                                        Login
                                    </button>
                                    <h1 className=' text-gray-500 text-sm font-medium hover:cursor-pointer hover:underline' onClick={()=>setShowSignup(!showSignUp)}>
                                        I don't have an account.
                                    </h1>
                                </div>
                            </div>
                        )}
                        
                    </div>
                )}
              
            </div>
            <footer className='relative z-10 bg-white/10 backdrop-blur-sm border-t border-white/20 px-8 py-4'>
                <div className='text-center text-gray-700 text-sm'>
                    <p>a personal project</p>
                </div>
            </footer>
        </div>
    )
};

export default Login;