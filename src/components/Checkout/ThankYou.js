import {Link, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import "./ThankYou.scss"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const ThankYou = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        const timeId = setTimeout(()=>{
            navigate("/");
        },3000);

        return ()=>{
            clearTimeout(timeId);
        }
    },[navigate]);

return (<div className='container'>
    <div className="top">
        <Link to={`/`}>
            <img width='34' height='34' src="https://i.imgur.com/AjtN2tW.png" alt=""/>
        </Link>
    </div>
    <div className="thank-you">
        <h1>Thank you for your purchase </h1>
        <CheckCircleIcon className="icon"/>
    </div>

</div>)


}

export default ThankYou
