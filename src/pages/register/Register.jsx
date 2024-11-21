import { Link } from "react-router-dom";
import Meetro from '../../assets/MeetroLogo2.png';

const Register = () => {
    return (
        <div className="h-screen bg-gradient-to-r from-[#134B70] via-[#508C9B] to-[#EEEEEE] flex items-center justify-center">
            <div className="w-3/5 bg-white rounded-lg shadow-lg overflow-hidden flex flex-row-reverse min-h-[400px]">
                {/* Right Section */}
                <div className="flex-1 relative bg-cover bg-center flex flex-col items-start justify-center gap-6 p-6 bg-[url('https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]">
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

                    <div className="relative z-10 w-full">
                        {/* Logo and Text in same line */}
                        <div className="flex items-center gap-2 mb-6">
                            <img src={Meetro} alt="Meetro Logo" className="w-[60px] h-[60px] object-contain" />
                            <h1 className="text-5xl font-semibold leading-tight text-white">Meetro Social</h1>
                        </div>

                        <p className="text-xl text-justify leading-snug mb-6 text-center text-white">
                            Get started by creating an account and explore a world where every gathering is memorable. <br/><br/>
                            Share moments, join conversations, and keep the good times going.
                        </p>
                        <div className="text-sm text-white">
                            <span>Already have an account? </span>
                            <Link to="/login">
                                <span className="text-[#508C9B] font-bold cursor-pointer hover:text-white hover:underline">Login</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Left Section */}
                <div className="flex-1 p-6 flex flex-col gap-6 justify-center">
                    <h1 className="text-3xl text-gray-600">Register</h1>
                    <form className="flex flex-col gap-4">
                        <input 
                            type="text" 
                            placeholder="Username" 
                            className="border-b-2 border-gray-300 p-3 focus:outline-none focus:border-[#508C9B]"
                        />
                        <input 
                            type="email" 
                            placeholder="Email" 
                            className="border-b-2 border-gray-300 p-3 focus:outline-none focus:border-[#508C9B]"
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className="border-b-2 border-gray-300 p-3 focus:outline-none focus:border-[#508C9B]"
                        />
                        <input 
                            type="text" 
                            placeholder="Name" 
                            className="border-b-2 border-gray-300 p-3 focus:outline-none focus:border-[#508C9B]"
                        />
                        <button className="w-28 p-2 bg-[#508C9B] text-white font-bold rounded-md hover:bg-[#134B70] mx-auto">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
