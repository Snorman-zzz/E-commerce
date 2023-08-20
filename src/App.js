import './App.scss'

import MainPage from "./components/MainPage";
import {BrowserRouter, Link, Outlet, Route, Router, Routes, useLocation} from "react-router-dom";
import React from 'react';
import ProductDetailsIndex from "./components/ProductDetailsIndex";
import {Switch} from "@mui/material";
import {useSelector} from "react-redux";
import PopupWindow from "./components/AddToBag/PopupWindow";
import Checkout from "./components/AddToBag/Checkout";
import NoItemInBag from "./components/AddToBag/NoItemInBag";
import Pay from "./components/Checkout/Pay";
import Payment from "./components/Checkout/Payment";
import ThankYou from "./components/Checkout/ThankYou";

function App() {
    const NoMatch = () => {
        return (
            <div>
                <h2>Nothing to see here!</h2>
                <p><Link to='/'>Go to Home</Link></p>
            </div>
        )
    }
    const SharedLayout = () => {
        const selectedPicture = useSelector(state => state.productReducer.selectedPicture);

        const location = useLocation()
        console.log('location ==>', location)
        return (
            <>
                <nav>
                    <Link to={`/selected-page/${selectedPicture}`}></Link>

                </nav>
                <Outlet/>
            </>

        )
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SharedLayout/>}>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/product/:productId/:colorId" element={<ProductDetailsIndex/>}/>
                    <Route path="/popup" element={<PopupWindow/>}/>
                    <Route path="/shop/myBag" element={<Checkout/>}/>
                    <Route path="/remove" element={<NoItemInBag/>}/>
                    <Route path="/checkout" element={<Pay/>}/>
                    <Route path="/payment" element={<Payment/>}/>
                    <Route path="/thank-you" element={<ThankYou/>}/>
                    <Route path='*' element={<NoMatch/>}/>
                </Route>
            </Routes>
        </BrowserRouter>

    )
        ;
}

export default App