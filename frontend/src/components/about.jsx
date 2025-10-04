import logo from '../assets/logo.png'
import landingPageImage from '../assets/bg2.jpg'
import { useNavigate } from 'react-router-dom';

function About() {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col font-instrument gap-1 relative h-screen '>
            <img src={landingPageImage} alt="Image BG" className='absolute w-screen h-screen object-cover -z-100' />
            <nav className='relative z-10 bg-white/10 backdrop-blur-sm border-b border-white/20 px-8 py-4 font-instrument border border-b-black'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-1'>
                        <img src={logo} alt="" className='h-8 hover:cursor-arrow' onClick={()=>{navigate('/')}} />
                        <h1 className='text-2xl font-semibold text-gray-800 hover:cursor-pointer' onClick={()=>{navigate('/')}}>Quizzy</h1>
                    </div>
                    <div className='flex gap-4'>
                        <button className='text-gray-700 hover:text-gray-900'>About</button>
                        <button className='text-gray-700 hover:text-gray-900'>Contact</button>
                    </div>
                </div>
            </nav>
            <div className='relative flex items-center justify-center'>
            <div className='bg-white/60 backdrop-blur-md border rounded-lg flex w-xl flex-col justify-center  shadow-2xl p-6 m-12'>
                <h1 className='text-5xl'>
                    Quizzy. <br />built like a pr<span className='italic'>oduct</span> <br />not just a p<span className='italic'>roject</span>!
                </h1>
                <h1 className='text-2xl mt-12 '>
                    Most personal projects end up quick, functional, maybe even a little rough. But why stop at “just working”?
                    <br /> <br />Quizzy started as a full-stack portfolio project. It could have been basic pages and tables, but I wanted more. I wanted it to feel real. Polished, intentional, with a story, as if it were ready to launch.
                    <br /><br /> <span className='font-instrument text-3xl '>"because learning and curiosity deserve more than half-baked interfaces." </span> <br />
                    <br />Even one-person projects can respect the user. They can have flow, clarity, and purpose.
                </h1>
                <h1 className='mt-12 text-xl'>
                    - aditya sumesh
                </h1>
                <h1 className='pl-2 text-sm'> twitter | linkedin | github</h1>
            </div>
            </div>
        </div>
        
    );
}

export default About;