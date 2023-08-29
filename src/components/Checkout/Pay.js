import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import "./Pay.scss"
import {getCookie, setCookie} from "../../cookies";
import axios from "axios";
import Payment from "./Payment";

const Pay = () => {
    const shoppingCart = getCookie('shopping_cart_info')
    // Sample bag items (you can replace this with actual data)
    const [bagItems, setBagItems] = useState(shoppingCart ? JSON.parse(shoppingCart) : [])
    const sizeList = [1, 2, 3, 4, 5]

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true)
    const [password, setPassword] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [token, setToken] = useState("");
    const [isPlaceOrder, setIsPlaceOrder] = useState(false)
    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
    const [logInSmg,setLogInSmg] = useState(false);
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form submission and page reload
        try {
            // const axios = require('axios');
            let data = JSON.stringify({
                "email": email,
                "password": password
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://api-lulu.hibitbyte.com/auth/login?mykey=dg8ZUvBV5kMOS08YVkvawZ0utoOA287Dia%2BNd/rkw9lMTXJV2EIdKzrccbx%2Bk/I5VztUKLMBYzAhbeBPSXJiRg==',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const response = await axios.request(config);
            if (response.status === 200) {
                const token = response.data.data.token;
                setCookie("auth_token",token);
                setIsLoggedIn(true);
                setToken(token);
                setIsLoggedIn(true);
                setIsPasswordValid(true);
                setIsLoginButtonDisabled(true);
                setLogInSmg(true);
                console.log("log in successfully, token is: ", token);
            }
            else {
                console.log("log in failed");
                setIsLoggedIn(false)
                setToken("");
                setIsLoggedIn(false)
                setIsPasswordValid(false)
            }
            if (isLoggedIn) {
                handlePlaceOrder();
            }


        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log("Log in failed: Unauthorized");
                // Display an error message to the user or handle the token expiration
            } else {
                console.log("Error during login:", error);
            }
        }
    }

    useEffect(() => {
        const token = getCookie("auth_token");
        if(token){
            setIsLoggedIn(true);
            setToken(token);
        }else{
            setIsLoggedIn(false);
            setToken("");
        }

        if (logInSmg) {
            const timeoutId = setTimeout(() => {
                console.log("time Executed")
                setLogInSmg(false);
            }, 3000);

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [logInSmg]);
    const handlePlaceOrder = async () => {
        if (!token) {
            // User is not logged in, prompt them to log in
            alert('Your log in has expired. Please log in to proceed with the checkout.');
            return;
        }
        try {
            const orderItems = bagItems.map((item) => ({
                quantity: item.quantity,
                productId: item.productId,
                colorId: item.colorId,
                size: item.size,
            }));


            let data = JSON.stringify({
                "taxRate": 1.13,
                "isActive": true,
                "isDelete": false,
                "orderItems": orderItems,
            });

            console.log("my data: ", data)

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://api-lulu.hibitbyte.com/order?mykey=dg8ZUvBV5kMOS08YVkvawZ0utoOA287Dia%2BNd/rkw9lMTXJV2EIdKzrccbx%2Bk/I5VztUKLMBYzAhbeBPSXJiRg==',
                headers: {
                    'authorization': `bear ${token}`,
                    //'authorization': `bear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmsyd2luQGluZm8uY29tIiwiaWF0IjoxNjkyMzE0MDE5LCJleHAiOjE2OTIzMjEyMTl9.snFTrwcOlgFicCiJlSsk3gXzSAAmNNCTJSOqHC4YZwU`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const response = await axios.request(config);
            if (response.status === 200) {
                setIsPlaceOrder(true)
                console.log("place order successfully: ", JSON.stringify(response.data));
            } else {
                console.log("log in failed");
            }
        } catch (error) {
            console.log("Error during place order:", error);
        }

    }

    return (
        <div className="app">
            <div className="header">
                <Link to={`/`}>
                    <img width='34' height='34' src="https://i.imgur.com/AjtN2tW.png" alt=""/>
                    // <svg viewBox='0 0 27 27' xmlns='http://www.w3.org/2000/svg' width='34' height='34'>
                    //     <path
                    //         d='M13.499 0C20.956 0 27 6.045 27 13.5 27 20.957 20.956 27 13.499 27 6.044 27 0 20.958 0 13.5 0 6.044 6.044 0 13.499 0zm7.076 20.18c-.425 0-.825-.127-1.22-.391-2.184-1.454-1.438-3.198.053-5.897.63-1.145 1.282-2.324 1.572-3.542.311-1.31.594-3.22-.542-4.664-.534-.677-1.347-1.2-2.413-1.554-1.112-.367-2.54-.566-4.25-.589l-.118-.003-.434.003c-1.709.023-3.139.222-4.248.589-1.068.354-1.88.876-2.415 1.554-1.136 1.445-.853 3.354-.54 4.664.288 1.218.941 2.4 1.57 3.541 1.491 2.7 2.238 4.444.052 5.898-.394.264-.792.39-1.218.39-.85 0-1.83-.425-2.352-.685l.127.223c1.08 1.621 2.468 2.483 4.01 2.483.676 0 1.39-.164 2.12-.488.775-.343 1.455-.971 1.917-1.769.46-.798.643-1.657.512-2.421-.158-.685-.516-1.606-.927-2.673-1.077-2.783-2.548-6.588-1.278-8.449.536-.785 1.5-1.169 2.945-1.174 1.447.005 2.41.389 2.946 1.174 1.272 1.861-.2 5.666-1.275 8.445-.413 1.068-.77 1.99-.928 2.67-.132.771.05 1.63.512 2.428s1.142 1.426 1.917 1.77c.73.323 1.444.487 2.12.487 1.542 0 2.93-.862 4.015-2.49l.122-.216c-.52.26-1.5.686-2.352.686z'
                    //         id='Combined-Shape'
                    //         fill='#d31334'></path>
                    // </svg>
                </Link>
            </div>
            <div className="main_container">
                <div className="checkout">
                    <h1>Checkout</h1>
                </div>
                <div className='main_container_body'>

                    <div className="account">
                        {isLoggedIn ? (
                            <div>
                                {logInSmg ? (
                                    <span className="log_in_successed">
                                   <a>Login Successfully !</a>
                                </span>
                                ) : ( "" )
                                }

                                <h2>Hello Mark Xu, welcome back !</h2>
                            </div>
                        ) : (
                            <div>
                                <h2>Have an account?</h2>
                                    <span className="log_in">
                            <a>Log in </a>
                            <p> to checkout more quickly and easily</p>
                        </span>
                                <form onSubmit={handleLogin}>
                                    <div className="email_pwd">
                                        <div className="input-wrapper">
                                            <label htmlFor="email">Email Address</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                placeholder="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className={isEmailValid ? "" : "invalid"}
                                            />
                                        </div>
                                        <div className="input-wrapper">
                                            <label htmlFor="password">Password</label>
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                placeholder="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className={isPasswordValid ? "" : "invalid"}
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" disabled={isLoginButtonDisabled}>Log In</button>
                                </form>


                            </div>

                        )}

                        {isLoggedIn && (
                            <button className="checkout-button" onClick={handlePlaceOrder}>
                                // <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                //      className="iconButtonIcon-3D2lQ" focusable="false" role="img" aria-hidden="true">
                                //     <path
                                //         d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.69 19.733a3.953 3.953 0 0 1-3.947-3.96 6.2 6.2 0 0 1 .55-2.183c.19-.511.378-1.019.567-1.523.476-1.194.83-2.433 1.06-3.697.157-1 .14-2.227-.623-3-.584-.587-1.487-.703-2.297-.723s-1.713.136-2.297.726c-.763.77-.78 2-.623 3 .23 1.264.585 2.5 1.06 3.694.187.506.376 1.014.567 1.523a6.2 6.2 0 0 1 .55 2.183 3.943 3.943 0 0 1-7.61 1.474 2.573 2.573 0 0 0 3.77-.31c.532-.72.693-1.65.433-2.507-.257-.93-.82-1.667-1.27-2.547-1.463-2.5-1.403-4.37-1.403-4.37 0-3.73 3.56-4.363 6.823-4.363 3.263 0 6.823.633 6.823 4.363 0 0 .06 1.87-1.403 4.37-.45.864-1 1.617-1.27 2.547-.26.857-.1 1.787.433 2.507a2.573 2.573 0 0 0 3.77.31 3.947 3.947 0 0 1-3.663 2.486z"
                                //         fill="currentColor"></path>
                                // </svg>
                                Checkout

                            </button>
                        )}
                        {isPlaceOrder &&
                            <div className='paypal-button'>
                                <Payment/>
                            </div>
                        }

                    </div>


                    <div className="order_Summary">
                        <h2>Order Summary</h2>
                        <div className="my_bag">
                            <div className='my_bag_left'>
                                <svg
                                    height='24'
                                    width='24'
                                    viewBox='0 0 24 24'
                                    xmlns='http://www.w3.org/2000/svg'
                                    focusable='false'
                                    role='img'
                                    aria-labelledby='icon_:rf:'
                                    aria-hidden='false'>
                                    <title id='icon_:rf:'>bagIcon</title>
                                    <path
                                        d='M20 6.25h-3.25c-.68-3.62-2.53-6-4.75-6s-4.07 2.38-4.75 6H4a.76.76 0 0 0-.75.75v12A4.75 4.75 0 0 0 8 23.75h8A4.75 4.75 0 0 0 20.75 19V7a.76.76 0 0 0-.75-.75zm-8-4.5c1.38 0 2.66 1.84 3.22 4.5H8.78c.56-2.66 1.84-4.5 3.22-4.5zM19.25 19A3.26 3.26 0 0 1 16 22.25H8A3.26 3.26 0 0 1 4.75 19V7.75H7l-.24 2.16.49.06a1 1 0 0 0 1.12-.87l.17-1.35h6.92l.17 1.35a1 1 0 0 0 1.12.87l.49-.06L17 7.75h2.28L19.25 19z'
                                        fill='currentColor'></path>
                                </svg>
                                <div className="show_item_quantanty">
                                    ({bagItems.reduce((prev, next) => {
                                    prev += next.quantity;
                                    return prev
                                }, 0)} item)
                                </div>
                            </div>
                            <span
                                className="my_bag_right">${bagItems.reduce((total, item) => total + (parseFloat(item.price.replace(/[^\d]/g, '')) * item.quantity), 0).toFixed(2)}</span>

                        </div>
                        <div className="my-bag-items">
                            {bagItems.map((item, index) => (
                                <div className="checkout-item" key={index}>
                                    <img src={item.imageUrl} alt={item.name} className="item-image"/>
                                    <div className="item-detail">
                                        <div className='item-details-wrap'>
                                            <span className="name">{item.name}</span>
                                            <span className="color">{item.color}</span>
                                            <span className="size">Size: {item.size}</span>
                                            <span className="quantity_price">
                                               <span>Quantity: {item.quantity} </span>
                                                <span>${item.price.replace(/[^\d]/g, '') * item.quantity}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='text'>
                            <span className='text_layout'>
                                <span>Subtotal</span>
                                <span>${bagItems.reduce((total, item) => total + (parseFloat(item.price.replace(/[^\d]/g, '')) * item.quantity), 0).toFixed(2)}</span>

                            </span>
                            <span className='text_layout'>
                                <span>Shipping</span>
                                <span>FREE</span>
                            </span>
                            <span className='text_layout'>
                                <span>Tax</span>
                                <span>Calculated at next step</span>
                            </span>
                            <span className='order_total'>
                                <span>Order total</span>
                            <span>${bagItems.reduce((total, item) => total + (parseFloat(item.price.replace(/[^\d]/g, '')) * item.quantity), 0).toFixed(2)}</span>

                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default Pay
