import "./navbar.scss";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import Meetro from '../../assets/MeetroLogo.png';

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="left flex items-center">
                <Link to="/" style={{ textDecoration: "none" }} className="flex items-center">
                    <img src={Meetro} alt="Meetro Logo" className="h-9 w-auto mr-2" />
                    <span className="text-white text-xl font-semibold">Meetro</span>
                </Link>
                <HomeOutlinedIcon />
                <DarkModeOutlinedIcon />
                <GridViewOutlinedIcon />
                <div className="search">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="Search..." />
                </div>
            </div>
            <div className="right flex items-center">
                <PersonOutlinedIcon />
                <EmailOutlinedIcon />
                <NotificationsOutlinedIcon />
                <div className="user flex items-center">
                    <img src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" className="w-10 h-10 rounded-full object-cover mr-2" />
                    <span className="text-white">Lapat Chai</span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
