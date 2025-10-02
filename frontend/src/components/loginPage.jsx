import landingPageImage from '../assets/landingPage-bg.jpg'
function Login(){
    return(
        <div className='relative flex items-center justify-center w-screen h-screen font-dmsans '>
            <img src={landingPageImage} alt="Image BG" className='absolute w-screen h-screen object-cover -z-1' />
            

            <div className='bg-white/20 backdrop-blur-md border rounded-lg flex flex-col justify-center w-sm shadow-2xl'>
                <h1 className='pl-4 font-dmsans font-medium text-gray-600 border- border-b-1 p-1.5'>Log in or sign up</h1>
                <div className='pl-10 pt-10 pr-10 pb-10 gap-2 flex flex-col'>
                    <h1 className= 'text-3xl font-dmsans font-medium'>Welcome to Quizzy</h1>
                    <h1 className='text-sm text-gray-700 font-dmsans'>Email Address</h1>
                    <input type="text" className='border rounded-sm px-3 py-0.25'/>
                    <h1 className='text-sm text-gray-700 font-dmsans'>Password</h1>
                    <input type="password" className='border rounded-sm px-3 py-0.25'/>
                </div>

            </div>


        </div>
    )
    
};

export default Login;