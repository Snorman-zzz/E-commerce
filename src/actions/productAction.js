import {SELECTED_IMAGE} from "../helper";
import {actionType} from "../helper";
import axios from "axios";

// export const fetchImageReal = () => dispatch => {
//     console.log('====> from realCity action')
//     // fetch(`http://api-lulu.hibitbyte.com/product/allProducts?mykey=g8TU78EbYNFjmlj9%2BXdgqwPpV9bftaLIA4%2Bs3%2B26rHNhEOf4j3ha0kW80xReJP8r47tbjYjRs5cqonQD8HK4CA==`)
//     fetch(`http://api-lulu.hibitbyte.com/product/allProducts?mykey=F02KJGLBsVabYYx9ERXsA2/OcdWz9JnamlZ%2BOLnnMAEq%2BMEwvj8qszKXR2j0XfJvvhyL8VY7AFDotu8ibhKlYw==`)
//
//         .then(res => res.json())
//         .then(({results}) => {
//             console.log(results)
//             //sanitize/re-organize my data
//             const sanitizedRes = results.map(item=>({
//                 img: item.mainCarousel['media'],
//                 des: item.alt,
//             }))
//             console.log('===>', sanitizedRes)
//             dispatch({
//                 type: 'fetchImageReal',
//                 payload: sanitizedRes
//             })
//         })
//         .catch(err => {
//             console.log(err)
//             // dispatch({
//             //     type: LOADING,
//             //     payload: false
//             // })
//         })
// }

export const fetchPicture = (productId,colorId)=> {
    return async (dispatch)=>{
        try{
            const response = await axios.get(`http://api-lulu.hibitbyte.com/product/${productId}?mykey=CgGV3Yu3/6w47TkWoHc2k2gl1GXFq5xFGERYFjSdzAIOf6xqA8gAFdjnWR7Hx/xdUmqNvEOdffny%2Bn9bGtt6vQ==`)
            const pictureData = response.data;


            dispatch(setSelectedPicture(pictureData));
        }catch (error){
            console.log('Error fetch picture: ', error);
        }
    }
}

export const selectImg = (selectedIndex) => dispatch => {
    dispatch(
        {
            type: SELECTED_IMAGE,
            payload: selectedIndex
        }
    )
}

export const updateFilters = (filters) => ({
    type: 'UPDATE_FILTERS',
    payload: filters
});

export const fetchFilterDataSuccess = (filterData) => ({
    type: 'FETCH_FILTER_DATA_SUCCESS',
    payload: filterData,
});

// Action creator for failed filter data fetching
export const fetchFilterDataFailure = (error) => ({
    type: 'FETCH_FILTER_DATA_FAILURE',
    payload: error,
});

export const setProductId = (productId) => ({
    type: 'SET_PRODUCT_ID',
    payload: productId,
});

export const setColorId = (colorId) => ({
    type: 'SET_COLOR_ID',
    payload: colorId,
});



export const setSelectedPicture = (pictureData)=>{
    return {
        type:'SET_SELECTED_PICTURE',
        payload: pictureData,
    }
}








