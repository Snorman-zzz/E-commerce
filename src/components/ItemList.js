import React, { useEffect, useState } from "react";
import axios from "axios";
import { access_key } from "../helper";
import "./ItemList.scss";
import AddIcon from "@mui/icons-material/Add";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {connect, useDispatch, useSelector} from "react-redux"; // Import the 'connect' function from react-redux
import {updateFilters, fetchFilterDataSuccess, fetchFilterDataFailure, fetchPicture} from "../actions/productAction";
import { setProductId, setColorId } from "../actions/productAction";
import {Link} from "react-router-dom";


const ItemList = () => {
    const selectedFilters = useSelector(state => state.productReducer.filters);

    const [itemsData, setItemsData] = useState(null);
    const [showingProducts, setShowingProducts] = useState(60);
    const productsPerPage = 60;
    const [selectedColorID, setSelectedColorID] = useState(null);
    const [productColorPickerOffsets, setProductColorPickerOffsets] = useState({});
    const dispatch = useDispatch()
    const selectedPicture = useSelector(state => state.productReducer.selectedPicture);

    const fetchData = async () => {
        try {
            const response = await axios.get(access_key);
            setItemsData(response.data);
        } catch (error) {
            console.error("Error fetching Data: ", error);
        }
    };

    useEffect(() => {
        fetchData(); // Call the fetchData function to fetch the items data
    }, [selectedFilters]);

    // console.log("Selected Filters:", selectedFilters);
    // console.log("Items Data:", itemsData);

    const [selectedSortOption, setSelectedSortOption] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [id,setId] = useState(null);

    const sortOptions = [
        "Featured",
        "New Arrivals",
        "Top Rated",
        "Price: High to Low",
        "Price: Low to High",
    ];
    if (!itemsData) {
        return <div>Loading...</div>;
    }

    // const updateId = (productId, colorId) => {
    //     dispatch(fetchPicture(productId, colorId));
    // };

    const items = Array.isArray(itemsData.rs.products) ? itemsData.rs.products : [];

    const filteredItems = items.filter((item) => {
        if (selectedFilters.Gender && !selectedFilters.Gender.some((filter) => filter.isChecked && filter.name === item.gender)) {
            return false;
        }

        if (selectedFilters.Category && !selectedFilters.Category.some((filter) => filter.isChecked && filter.name === item.category.name)) {
            return false;
        }

        if (selectedFilters.Type && !selectedFilters.Type.some((filter) => filter.isChecked && filter.name === item.type.name)) {
            return false;
        }

        if (selectedFilters.Activity && !selectedFilters.Activity.some((filter) => filter.isChecked && filter.name === item.activity.name)) {
            return false;
        }

        if (selectedFilters.Size && !selectedFilters.Size.some((filter) => filter.isChecked && filter.name === item.size.name)) {
            return false;
        }

        if (selectedFilters.SizeType && !selectedFilters.SizeType.some((filter) => filter.isChecked && filter.name === item.sizeType.name)) {
            return false;
        }

        if (selectedFilters.Colour && !selectedFilters.Colour.some((filter) => filter.isChecked && filter.alt === item.colour.alt)) {
            return false;
        }

        if (selectedFilters.Collection && !selectedFilters.Collection.some((filter) => filter.isChecked && filter.name === item.collection.name)) {
            return false;
        }

        if (selectedFilters.Features && !selectedFilters.Features.some((filter) => filter.isChecked && filter.name === item.features.name)) {
            return false;
        }

        if (selectedFilters.Climate && !selectedFilters.Climate.some((filter) => filter.isChecked && filter.name === item.climate.name)) {
            return false;
        }

        if (selectedFilters.Fabric && !selectedFilters.Fabric.some((filter) => filter.isChecked && filter.name === item.fabric.name)) {
            return false;
        }
        return true;
    
    });

    // console.log("Filtered Items:", filteredItems);
    const handleSortOptionChange = (option) => {
        setSelectedSortOption(option);
    };

    const handleTagClick = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((t) => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleColorSelect = (colorId, productId) => {
        setSelectedColorID(colorId);
        updateProductColor(productId, colorId);
    };

    const updateProductColor = (productId, colorId) => {
        setItemsData((prevItemsData) => {
            const updatedProducts = prevItemsData.rs.products.map((product) =>
                product.productId === productId
                    ? { ...product, selectedColorID: colorId }
                    : product
            );
            return { ...prevItemsData, rs: { ...prevItemsData.rs, products: updatedProducts } };
        });
    };

    const handleViewMoreProducts = () => {
        setShowingProducts((prev) => prev + productsPerPage);
    };

    const handleNextColorPicker = (productId) => {
        setProductColorPickerOffsets((prevOffsets) => ({
            ...prevOffsets,
            [productId]: (prevOffsets[productId] || 0) + 1,
        }));
    };

    const handlePrevColorPicker = (productId) => {
        setProductColorPickerOffsets((prevOffsets) => ({
            ...prevOffsets,
            [productId]: (prevOffsets[productId] || 0) - 1,
        }));
    };


    const handleImageClick = async (productId, colorId) =>{
        try {
            // dispatch(setProductId(productId));
            // dispatch(setColorId(colorId));
            // await dispatch(fetchPicture(productId,colorId));
            dispatch(fetchPicture(productId,colorId))
            console.log('Clicked product id is ===> ', productId);
            console.log('Clicked color id is======> ', colorId);
        }catch (error){
            console.log('Error handling image click: ', error);

        }
        //dispatch(selectedPicture)
        // dispatch(fetchPicture(productId,colorId))
        // dispatch(setProductId(productId));
        // dispatch(setColorId(colorId));


    }



    return (
        <div className="row">
            <div className="top">
                <div className="top-bar">
                    <div className="left-buttons">
                        <button className="primary-button">All Items ({items.length})</button>
                        <button className="secondary-button">
                            Available Near You <span className="chevron-left">></span>
                        </button>
                    </div>
                    <div className="sort-button">
                        <button className="no-underline-button">
                            Sorted by{" "}
                            {selectedSortOption ? (
                                <span>
                                    {selectedSortOption} <span className="chevron-down">&#8249;</span>
                                </span>
                            ) : (
                                "Featured"
                            )}
                            <ExpandMoreIcon />
                        </button>
                        <ul className="sort-options">
                            {sortOptions.map((option, index) => (
                                <li
                                    key={option.id}
                                    className={selectedSortOption === option ? "selected" : ""}
                                    onClick={() => handleSortOptionChange(option)}
                                >
                                    {option}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <hr className="divider" />
                <div className="tags">
                    <button
                        className={`tag-button ${selectedTags.includes("Women") ? "selected" : ""}`}
                        onClick={() => handleTagClick("Women")}
                    >
                        Women <span className="close-icon">&#10006;</span>
                    </button>
                    <button
                        className={`tag-button ${selectedTags.includes("Casual") ? "selected" : ""}`}
                        onClick={() => handleTagClick("Casual")}
                    >
                        Casual <span className="close-icon">&#10006;</span>
                    </button>
                    <button
                        className={`tag-button ${selectedTags.includes("Beanies") ? "selected" : ""}`}
                        onClick={() => handleTagClick("Beanies")}
                    >
                        Beanies <span className="close-icon">&#10006;</span>
                    </button>
                </div>
            </div>
            <div className="item-container">
                {items.slice(0, showingProducts).map((product, index) => {
                    const selectedImage = product.images.find(
                        (image) => image.colorId === (product.selectedColorID || product.swatches[0]?.colorId)
                    );

                    const productColorOffset = productColorPickerOffsets[product.productId] || 0;

                    return (
                        <div key={product.productId} className="item">
                            {selectedImage ? (
                                <Link to={`/product/${product.productId}/${selectedImage.colorId}`}>
                                <img
                                    src={selectedImage.mainCarousel.media.split("|")[0].trim()}
                                    alt={`Product Image ${product.name}`}
                                    onError={(e) => (e.target.style.display = "none")}
                                    onLoad={(e) => (e.target.style.display = "block")}
                                    style={{ display: "none" }}
                                    onClick={()=>handleImageClick(product.productId,selectedImage.colorId)}
                                />
                                </Link>
                            ) : (
                                <p>Loading...</p>
                            )}

                            <div className="color-picker-container">
                                {product.swatches && product.swatches.length > 0 ? (
                                    <React.Fragment>
                                        {productColorOffset > 0 && (
                                            <div
                                                className="color-picker-arrow color-picker-prev"
                                                onClick={() =>
                                                    handlePrevColorPicker(product.productId)
                                            }
                                            >
                                                <NavigateBeforeIcon />
                                            </div>
                                        )}
                                        {product.swatches.slice(productColorOffset, productColorOffset + 7).map(
                                            (swatch, index) => (
                                                <img
                                                    key={swatch.id}
                                                    className={`color-picker ${
                                                        product.selectedColorID === swatch.colorId ? "selected" : ""
                                                    }`}
                                                    src={swatch.swatch.split("|")[0].trim()}
                                                    alt={`Product Image ${index}`}
                                                    onClick={() => handleColorSelect(swatch.colorId, product.productId)}
                                                />
                                            )
                                        )}
                                        {productColorOffset + 7 < product.swatches.length && (
                                            <div
                                                className="color-picker-arrow color-picker-next"
                                                onClick={() => handleNextColorPicker(product.productId)}
                                            >
                                                <NavigateNextIcon />
                                            </div>
                                        )}
                                    </React.Fragment>
                                ) : (
                                    <span>No Color Options Available</span>
                                )}
                            </div>

                            <div className="item-details">
                                <p>{product.name}</p>
                                {product.price && product.price ? (
                                    <p>{product.price}</p>
                                ) : (
                                    <p>Price Not Available</p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            {showingProducts < items.length && (
                <div className="viewMoreProduct">
                    <div className="viewing-info">
                        <p>Viewing {showingProducts} of {items.length}</p>
                    </div>
                    <div className="view-more-button">
                        <button onClick={handleViewMoreProducts}>
                            <AddIcon style={{ color: 'red' }} /> VIEW MORE PRODUCTS
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({
    filterData: state.productReducer.filters, // Change this to match the actual state path containing filter data
});

// Map Redux actions to component props
const mapDispatchToProps = {
    fetchFilterDataSuccess,
    fetchFilterDataFailure,
    updateFilters,
};

// Connect the component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(ItemList);