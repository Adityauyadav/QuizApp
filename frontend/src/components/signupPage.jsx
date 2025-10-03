import axios from "axios";
import { useState } from "react";
import { z } from "zod";

const registerSchema = z.object({
    userName: z.string().nonempty("Invalid Name"),
    userEmail: z.email("Invalid Email"),
    userPassword: z.string().min(8, "Password must be atleast 8 characters long"),
});

function SignUp(props) {
    const [userName, setUserName] = useState('');
    const [userPassword, setPassword] = useState('');
    const [userPassword2, setPassword2] = useState('');
    const [userEmail, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [preError, setPreError] = useState(false);
    const isFormValid = userName && userEmail && userPassword && userPassword2;

    const handleRegistration = async (userName, userEmail, userPassword) => {
        try {
            const validation = registerSchema.safeParse({
                userName: userName,
                userEmail: userEmail,
                userPassword: userPassword
            })
            if (!validation.success) {
                const message = validation.error.issues[0].message;
                setErrorMessage(message);
                return;
            }
            const response = await axios.post('http://localhost:3000/api/users/register', {
                userName,
                userEmail,
                userPassword,
            })
            localStorage.setItem("token", response.data.token);
            setErrorMessage("");
        }
        catch (error) {
            setErrorMessage(error.response?.data?.message || "Internal Server Error")
        };
    };

    return (
        <div className='pl-10 pt-10 pr-10 pb-10 gap-2 flex flex-col'>
            {preError && <p className="text-red-600 text-sm">Error in One or More fields</p>}
            <h1 className='text-3xl font-medium'>Welcome to Quizzy</h1>
            <h1 className='text-md text-gray-700 '>Name</h1>
            <input type="text" value={userName} onChange={
                (e) => (
                    setUserName(e.target.value),
                    setErrorMessage(''),
                    setPreError(false)
                )} className='border rounded-sm px-3 py-0.25' />
            <h1 className='text-md text-gray-700 '>Email Address</h1>
            <input type="text" value={userEmail} onChange={(e) => (
                setEmail(e.target.value),
                setErrorMessage(''),
                setPreError(false)
            )} className='border rounded-sm px-3 py-0.25' />
            <h1 className='text-md text-gray-700 '>Password</h1>
            <div className='relative'>
                <input
                    type={showPassword ? "text" : "password"}
                    value={userPassword}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setErrorMessage('');
                        setPreError(false);
                    }}
                    className='border rounded-sm px-3 py-0.25 w-full pr-10'
                />
                {userPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 text-sm'
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                )}
            </div>
            <h1 className='text-md text-gray-700 '>Confirm Password</h1>
            <div className='relative'>
                <input
                    type="password"
                    value={userPassword2}
                    onChange={(e) => {
                        setPassword2(e.target.value);
                        setErrorMessage('');
                        setPreError(false);
                    }}
                    className='border rounded-sm px-3 py-0.25 w-full pr-10'
                />
            </div>
            {errorMessage.length > 0 && <p className='text-red-500 text-sm'>{errorMessage}</p>}
            {(userPassword2.length > 0 && userPassword != userPassword2) && <p className='text-red-500 text-sm'>Passwords didn't match</p>}
            <div className='flex justify-between mt-3 items-end'>
                <button
                    disabled={!isFormValid}
                    className='bg-blue-700 hover:bg-black hover:text-white text-white font-medium py-2 px-4 rounded border-1 hover:cursor-pointer '
                    onClick={() => {
                        userPassword == userPassword2 && userPassword2.length > 0 ? handleRegistration(userName, userEmail, userPassword) : setPreError(true);
                    }}>
                    Create Account
                </button>
                <h1 className="text-gray-500 text-sm text-right hover:underline hover:cursor-pointer" onClick={props.goToLogin}>take me to login page</h1>
            </div>
        </div>
    )
}

export default SignUp;