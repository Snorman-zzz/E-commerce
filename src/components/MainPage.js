import './MainPage.scss'
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Filter from "./Filter";
import PictureShow from "./PictureShow/PictureShow";
import ItemList from "./ItemList";
import Feedback from "./Feedback/Feedback";
import axios from "axios";
import {fetchFilterDataFailure, fetchFilterDataSuccess} from "../actions/productAction";
import {BrowserRouter, Link, Route, Routes, useNavigate} from "react-router-dom";
import ProductDetailsIndex from "./ProductDetailsIndex";
import PopupWindow from "./AddToBag/PopupWindow";
import Checkout from "./AddToBag/Checkout";
import NoItemInBag from "./AddToBag/NoItemInBag";



const MainPage = () => {
    const [selectedFilters, setSelectedFilters] = useState({});
    const dispatch = useDispatch();
    const filterData = useSelector((state) => state.productReducer.filters) || {};
    const navigate = useNavigate();
    const fetchFilterData = () => {
        return async (dispatch) => {
            try {
                const response = await axios.get('http://api-lulu.hibitbyte.com/product/filter?mykey=CgGV3Yu3/6w47TkWoHc2k2gl1GXFq5xFGERYFjSdzAIOf6xqA8gAFdjnWR7Hx/xdUmqNvEOdffny%2Bn9bGtt6vQ==');

                // Modify the response data as needed
                const filterData = response.data;

                // Dispatch the action to update the Redux store with the fetched filter data
                dispatch(fetchFilterDataSuccess(filterData));
            } catch (error) {
                // Handle any errors that occur during the API call
                dispatch(fetchFilterDataFailure(error.message));
            }
        };
    };
    useEffect(() => {
        // Fetch filter data when the component mounts
        dispatch(fetchFilterData());
    }, [dispatch]);

    const handleProductDetailsClick = (productId, colorId) => {
        // navigate(`http://api-lulu.hibitbyte.com/product/${productId}/${colorId}`);
        navigate(`/product/${productId}`);
    };

    console.log('MainPage - selectedFilters:', selectedFilters);
    return (<>

        <div className="container">
            <Header/>
            <div className='home'>
                <Filter selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters}  />
                <div className= 'secondary'>
                    <PictureShow/>
                    <ItemList selectedFilters={selectedFilters} onProductDetailsClick={handleProductDetailsClick}/> {/* Pass selectedFilters as a prop */}
                    <Feedback/>
                </div>
            </div>
            <Footer/>
        </div>
    </>)
}

export default MainPage;