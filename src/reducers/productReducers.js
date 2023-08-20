import {actionType, LOADING, SELECTED_IMAGE} from "../helper";

const initState = {

    gender:'women',
    category:[],
    type:[],
    activity:[],
    size:[],
    sizeType:[],
    color:[],
    collection:[],
    features:[],
    climate:[],
    fabric:[],
    products: [],
    filters: { 'Women': true },
    productId:null,
    colorId:null,
    selectedPicture:null

}

export const productReducer = (state = initState, action) => {


    switch (action.type) {
        case actionType.SET_GENDER_FILTER:
            console.log(`reducer: ${actionType.SET_GENDER_FILTER}`,action.payload)
            return{...state,gender: action.payload}

        case actionType.SET_TYPE_FILTER:
            console.log(`reducer: ${actionType.SET_TYPE_FILTER}`,action.payload)
            return{...state, type: action.payload}

        case actionType.SET_ACTIVITY_FILTER:
            console.log(`reducer: ${actionType.SET_ACTIVITY_FILTER}`,action.payload)
            return{...state,activity: action.payload}

        case actionType.SET_SIZE_FILTER:
            console.log(`reducer: ${actionType.SET_SIZE_FILTER}`,action.payload)
            return{...state,size: action.payload}

        case actionType.SET_SIZETYPE_FILTER:
            console.log(`reducer: ${actionType.SET_SIZETYPE_FILTER}`,action.payload)
            return{...state,sizeType: action.payload}

        case actionType.SET_COLOR_FILTER:
            console.log(`reducer: ${actionType.SET_COLOR_FILTER}`,action.payload)
            return{...state,color: action.payload}

        case actionType.SET_COLLECTION_FILTER:
            console.log(`reducer: ${actionType.SET_COLLECTION_FILTER}`,action.payload)
            return{...state,collection: action.payload}

        case 'UPDATE_FILTERS':
            return { ...state, filters: action.payload };

        case actionType.SET_PRODUCT_ID:
            console.log(`from reducer===> ${actionType.SET_PRODUCT_ID}`,action.payload)
            return{...state,productId: action.payload};

        case actionType.SET_COLOR_ID:
            console.log(`from reducer===> ${actionType.SET_COLOR_ID}`,action.payload)
            return{...state,colorId: action.payload};

        case actionType.SET_SELECTED_PICTURE:
            console.log(`from reducer===> ${actionType.SET_SELECTED_PICTURE}`,action.payload)
            return{...state,selectedPicture: action.payload};


        default:
            return state
    }
}