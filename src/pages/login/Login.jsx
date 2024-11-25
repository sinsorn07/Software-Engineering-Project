import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Meetro from '../../assets/MeetroLogo2.png'; 


const Login = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });
    const [err, setErr] = useState(null);
    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(inputs);
            navigate("/");
        } catch (err) {
            setErr(err.response?.data || "An error occurred");
        }
    };

    return (
        <div className="h-screen bg-gradient-to-r from-[#EEEEEE] via-[#508C9B] to-[#134B70] flex items-center justify-center">
            <div className="w-3/5 bg-white rounded-lg shadow-lg overflow-hidden flex min-h-[400px]">
                {/* Left Section */}
                <div className="flex-1 relative bg-cover bg-center flex flex-col items-start justify-center gap-6 p-6 bg-[url('https://images.pexels.com/photos/3491940/pexels-photo-3491940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]">
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
                    <div className="relative z-10 w-full">
                        {/* Logo and Text in same line */}
                        <div className="flex items-center gap-2 mb-6">
                            <img src={Meetro} alt="Meetro Logo" className="w-[60px] h-[60px] object-contain" />
                            <h1 className="text-5xl font-semibold leading-tight text-white">Meetro Social</h1>
                        </div>
                        <p className="text-xl text-justify leading-snug mb-6 text-center text-white">
                            "Capture the Vibe, <br /> Relive the Moments"
                        </p>
                        <div className="text-sm text-white">
                            <span>Don't have an account? </span>
                            <Link to="/register">
                                <button className="text-[#508C9B] font-bold cursor-pointer hover:text-white hover:underline">Register</button>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Right Section */}
                <div className="flex-1 p-6 flex flex-col gap-6 justify-center">
                    <h1 className="text-3xl text-gray-600">Login</h1>
                    <form className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            onChange={handleChange}
                            className="border-b-2 border-gray-300 p-3 focus:outline-none focus:border-[#508C9B]"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            className="border-b-2 border-gray-300 p-3 focus:outline-none focus:border-[#508C9B]"
                        />
                        {err && <span className="text-red-500">{typeof err === "string" ? err : "An error occurred"}</span>}
                        <button onClick={handleLogin} className="w-28 p-2 bg-[#508C9B] text-white font-bold rounded-md hover:bg-[#134B70] mx-auto">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
