import React, {useEffect, useState} from 'react';
import './Filter.scss'
import {useDispatch, useSelector} from 'react-redux';
import {updateFilters} from '../actions/productAction';
import {access_key} from "../helper";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Checkbox as MuiCheckbox,
    Box,
    Button, Divider
} from '@mui/material';

import {styled} from '@mui/system';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import axios from "axios";

const Checkbox = styled(MuiCheckbox)({
    color: "gray",
    '&:hover': {
        backgroundColor: "white",
    },
    '&.Mui-checked': {
        color: "gray",
    },
});

const Filter = ({ setSelectedFilters }) => {
        // const dispatch = useDispatch();
        const checkboxes = useSelector(state => state.productReducer.filters) || {};

        const [filterData, setFilterData] = useState(null);
        const [expanded, setExpanded] = useState({});
        const [viewMore, setViewMore] = useState(() => {
            const initialState = {};
            if (filterData && filterData.rs) {
                filterData.rs.forEach((category) => {
                    initialState[category] = false;
                });
            }
            return initialState;
        });

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get(
                        'http://api-lulu.hibitbyte.com/product/filter?mykey=CgGV3Yu3/6w47TkWoHc2k2gl1GXFq5xFGERYFjSdzAIOf6xqA8gAFdjnWR7Hx/xdUmqNvEOdffny%2Bn9bGtt6vQ=='
                    );

                    // Create a copy of the fetched data
                    const updatedData = { ...response.data };
                    console.log('filter page data: ',updatedData);

                    // Find the index of 'Women' in the Gender array
                    const womenIndex = updatedData.rs.Gender.findIndex(item => item.name === 'Women');

                    // If 'Women' is found, set its isChecked property to true
                    if (womenIndex !== -1) {
                        updatedData.rs.Gender[womenIndex].isChecked = true;
                    }

                    // Update the state with the modified data
                    setFilterData(updatedData);
                    // Initialize the expanded state with the categories
                    const initialState = {};
                    for (const category in updatedData.rs) {
                        initialState[category] = false;
                    }
                    setExpanded(initialState);

                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
        }, []);

        if (!filterData) {
            return <div>Loading...</div>;
        }



        const handleViewMore = (category) => {
            setExpanded(prevState => ({...prevState, [category]: !prevState[category]}));
        };




        const handleCheckboxChange = (category, item, index, isChecked) => {
            // Clone the filterData object to avoid directly mutating the state
            const updatedFilterData = { ...filterData };

            // Update the isChecked property of the selected item
            updatedFilterData.rs[category].forEach((itemData, itemIndex) => {
                if (itemIndex === index) {
                    updatedFilterData.rs[category][index].isChecked = isChecked;
                }
            });

            // Update the state with the new filterData
            setFilterData(updatedFilterData);
            setSelectedFilters(updatedFilterData.rs);
        };



        const handleViewMoreChange = (category) => {
            setViewMore(prevState => ({
                ...prevState,
                [category]: !prevState[category]
            }));
        };



        return (
            <div className='filter'>
                <h1 className='filter_women'>Women's What's New</h1>
                <nav className='filter_container'>
                    {/* Gender Accordion */}
                    <Accordion>
                        <AccordionSummary
                            expandIcon={expanded['Gender'] ? <RemoveOutlinedIcon/> : <AddOutlinedIcon/>}
                            onClick={() => handleViewMore('Gender')}
                            // className={selectedFilters === 'Gender' ? 'expanded' : ''}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Gender</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {(viewMore['Gender'] ? filterData.rs.Gender : filterData.rs.Gender.slice(0, 5)).map((gender, index) => (
                                <label className='details' key={gender.name}>
                                    <Checkbox
                                        checked={gender.isChecked}
                                        onChange={(event) => handleCheckboxChange('Gender', gender, index, event.target.checked)} // Change here
                                    />
                                    <Typography> {gender.name} </Typography>
                                </label>
                            ))}
                        </AccordionDetails>
                    </Accordion>



                    <Accordion>
                        <AccordionSummary
                            expandIcon={expanded['Category'] ? <RemoveOutlinedIcon/> : <AddOutlinedIcon/>}
                            onClick={() => handleViewMore('Category')}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Category</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {(viewMore['Category'] ? filterData.rs.Category : filterData.rs.Category.slice(0, 5)).map((category, index) => (
                                <label className='details' key={category.name}>
                                    <Checkbox
                                        checked={category.isChecked}
                                        onChange={() => handleCheckboxChange('Category', category, index, !category.isChecked)}
                                    />
                                    <Typography>{category.name}</Typography>
                                </label>
                            ))}
                            <div className='details'>
                                <button
                                    onClick={() => handleViewMoreChange('Category')}
                                    className="viewMoreButton"
                                >
                                    {viewMore['Category'] ? (
                                        <span className='view_container'>
                                            <span>View Less</span>
                                            <RemoveOutlinedIcon />
                                        </span>
                                    ) : (
                                        <span className='view_container'>
                                            <span>View More</span>
                                            <AddOutlinedIcon />
                                        </span>
                                    )}

                                </button>
                            </div>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary
                            expandIcon={expanded['Type'] ? <RemoveOutlinedIcon/> : <AddOutlinedIcon/>}
                            onClick={() => handleViewMore('Type')}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Type</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {(viewMore['Type'] ? filterData.rs.Type : filterData.rs.Type.slice(0, 5)).map((type, index) => (
                                <label className='details' key={type.name}>
                                    <Checkbox
                                        checked={type.isChecked}
                                        onChange={() => handleCheckboxChange('Type', type, index, !type.isChecked)}
                                    />
                                    <Typography>{type.name}</Typography>
                                </label>
                            ))}
                            <div className='details'>
                                <button
                                    onClick={() => handleViewMoreChange('Type')}
                                    className="viewMoreButton"
                                >
                                    {viewMore['Type'] ? (
                                        <span className='view_container'>
                                            <span>View Less</span>
                                            <RemoveOutlinedIcon />
                                        </span>
                                    ) : (
                                        <span className='view_container'>
                                            <span>View More</span>

                                            <AddOutlinedIcon />
                                        </span>
                                    )}
                                </button>
                            </div>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary
                            expandIcon={expanded['Activity'] ? <RemoveOutlinedIcon/> : <AddOutlinedIcon/>}
                            onClick={() => handleViewMore('Activity')}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Activity</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {(viewMore['Activity'] ? filterData.rs.Activity : filterData.rs.Activity.slice(0, 5)).map((activity, index) => (
                                <label className='details' key={activity.name}>
                                    <Checkbox
                                        checked={activity.isChecked}
                                        onChange={() => handleCheckboxChange('Activity', activity, index, !activity.isChecked)}
                                    />
                                    <Typography>{activity.name}</Typography>
                                </label>
                            ))}
                            <div className='details'>
                                <button
                                    onClick={() => handleViewMoreChange('Activity')}
                                    className="viewMoreButton"
                                >
                                    {viewMore['Activity'] ? (
                                        <span className='view_container'>
                                            <span>View Less</span>
                                            <RemoveOutlinedIcon />
                                        </span>
                                    ) : (
                                        <span className='view_container'>
                                            <span>View More</span>

                                            <AddOutlinedIcon />
                                        </span>
                                    )}
                                </button>
                            </div>
                        </AccordionDetails>
                    </Accordion>



                    <Accordion>
                        <AccordionSummary
                            expandIcon={expanded['Size'] ? <RemoveOutlinedIcon/> : <AddOutlinedIcon/>}
                            onClick={() => handleViewMore('Size')}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Size</Typography>
                        </AccordionSummary>
                        <AccordionDetails className="sizeButtonContainer">
                            {filterData.rs.Size.map((size, index) => (
                                size.name !== "sizeDivider" ? (
                                    <button
                                        key={size.name}
                                        className={`sizeButton ${size.isChecked ? 'selected' : ''}`}
                                        onClick={() => handleCheckboxChange('Size', size, index, !size.isChecked)}
                                    >
                                        <Typography>{size.name}</Typography>
                                    </button>
                                ) : (
                                    <hr style={{width: "100%"}} key={index}/>
                                )
                            ))}
                        </AccordionDetails>
                    </Accordion>


                    <Accordion>
                        <AccordionSummary
                            expandIcon={expanded['SizeType'] ? <RemoveOutlinedIcon/> : <AddOutlinedIcon/>}
                            onClick={() => handleViewMore('SizeType')}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Size Type</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {filterData.rs.SizeType.map((sizeType, index) => (
                                <label className='details' key={sizeType.name}>
                                    <Checkbox
                                        checked={sizeType.isChecked}
                                        onChange={() => handleCheckboxChange('SizeType', sizeType, index, !sizeType.isChecked)}
                                    />
                                    <Typography>{sizeType.name}</Typography>
                                </label>
                            ))}
                        </AccordionDetails>
                    </Accordion>



                    <Accordion>
                        <AccordionSummary
                            expandIcon={expanded['Color'] ? <RemoveOutlinedIcon/> : <AddOutlinedIcon/>}
                            onClick={() => handleViewMore('Color')}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Color</Typography>
                        </AccordionSummary>
                        <AccordionDetails className="colorGrid">
                            {filterData.rs.Colour.map((colour, index) => (
                                <div key={colour.alt} onClick={() => handleCheckboxChange('Colour', colour, index, !colour.isChecked)}>
                                    <img
                                        className={`roundImage ${colour.isChecked ? 'selected' : ''}`}
                                        src={colour.swatch}
                                        alt={colour.alt}
                                    />
                                    <Typography>{colour.alt}</Typography>
                                </div>
                            ))}
                        </AccordionDetails>
                    </Accordion>



                    <Accordion>
                        <AccordionSummary
                            expandIcon={expanded['Collection'] ? <RemoveOutlinedIcon/> : <AddOutlinedIcon/>}
                            onClick={() => handleViewMore('Collection')}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Collection</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {(viewMore['Collection'] ? filterData.rs.Collection : filterData.rs.Collection.slice(0, 5)).map((collection, index) => (
                                <label className='details' key={collection.name}>
                                    <Checkbox
                                        checked={collection.isChecked}
                                        onChange={() => handleCheckboxChange('Collection', collection, index, !collection.isChecked)}
                                    />
                                    <Typography>{collection.name}</Typography>
                                </label>
                            ))}
                            <div className='details'>
                                <button
                                    onClick={() => handleViewMoreChange('Collection')}
                                    className="viewMoreButton"
                                >
                                    {viewMore['Collection'] ? (
                                        <span className='view_container'>
                                            <span>View Less</span>
                                            <RemoveOutlinedIcon />
                                        </span>
                                    ) : (
                                        <span className='view_container'>
                                            <span>View More</span>
                                            <AddOutlinedIcon />
                                        </span>
                                    )}
                                </button>
                            </div>
                        </AccordionDetails>
                    </Accordion>



                    <Accordion>
                        <AccordionSummary
                            expandIcon={expanded['Features'] ? <RemoveOutlinedIcon/> : <AddOutlinedIcon/>}
                            onClick={() => handleViewMore('Gender')}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Features</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {(viewMore['Features'] ? filterData.rs.Features : filterData.rs.Features.slice(0, 5)).map((feature, index) => (
                                <label className='details' key={feature.name}>
                                    <Checkbox
                                        checked={feature.isChecked}
                                        onChange={() => handleCheckboxChange('Features', feature, index, !feature.isChecked)}
                                    />
                                    <Typography>{feature.name}</Typography>
                                </label>
                            ))}
                            <div className='details'>
                                <button
                                    onClick={() => handleViewMoreChange('Features')}
                                    className="viewMoreButton"
                                >
                                    {viewMore['Features'] ? (
                                        <span className='view_container'>
                                            <span>View Less</span>
                                           <RemoveOutlinedIcon />
                                        </span>
                                    ) : (
                                        <span className='view_container'>
                                            <span>View More</span>

                                            <AddOutlinedIcon />
                                        </span>
                                    )}
                                </button>
                            </div>
                        </AccordionDetails>
                    </Accordion>


                    <Accordion>
                        <AccordionSummary
                            expandIcon={expanded['Climate'] ? <RemoveOutlinedIcon/> : <AddOutlinedIcon/>}
                            onClick={() => handleViewMore('Climate')}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Climate</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {filterData.rs.Climate.map((climate, index) => (
                                <label className='details' key={climate.name}>
                                    <Checkbox
                                        checked={climate.isChecked}
                                        onChange={() => handleCheckboxChange('Climate', climate, index, !climate.isChecked)}
                                    />
                                    <Typography>{climate.name}</Typography>
                                </label>
                            ))}
                        </AccordionDetails>
                    </Accordion>


                    <Accordion>
                        <AccordionSummary
                            expandIcon={expanded['Fabric'] ? <RemoveOutlinedIcon/> : <AddOutlinedIcon/>}
                            onClick={() => handleViewMore('Fabric')}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Fabric</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {(viewMore['Fabric'] ? filterData.rs.Fabric : filterData.rs.Fabric.slice(0, 5)).map((fabric, index) => (
                                <label className='details' key={fabric.name}>
                                    <Checkbox
                                        checked={fabric.isChecked}
                                        onChange={() => handleCheckboxChange('Fabric', fabric, index, !fabric.isChecked)}
                                    />
                                    <Typography>{fabric.name}</Typography>
                                </label>
                            ))}
                            <div className='details'>
                                <button
                                    onClick={() => handleViewMoreChange('Fabric')}
                                    className="viewMoreButton"
                                >
                                    {viewMore['Fabric'] ? (
                                        <span className='view_container'>
                                            <span>View Less</span>
                                           <RemoveOutlinedIcon />
                                        </span>
                                    ) : (
                                        <span className='view_container'>
                                            <span>View More</span>

                                            <AddOutlinedIcon />
                                        </span>
                                    )}
                                </button>
                            </div>
                        </AccordionDetails>
                    </Accordion>




                </nav>


            </div>
        );
    }
;

export default Filter;


// <div className="filter">
//     <h1 className='filter_women'>Women's What's New</h1>
//     <nav className='filter_container'>
//         {filterCategories.map((category, index) => (
//             <Accordion
//                 // className={`filter_container_accordion`}
//                 key={index}
//                 expanded={expanded[category]}>
//                 <span>
//                     <AccordionSummary
//                         expandIcon={expanded[category] ? <RemoveOutlinedIcon/> : <AddOutlinedIcon/>}
//                         className={selectedCategory === category ? 'expanded' : ''}
//                         // onClick={() => handleCategoryClick(category)}
//                         aria-controls="panel1a-content"
//                         id="panel1a-header"
//                         onClick={() => handleExpandAndCategoryClick(category)}
//
//                     >
//                     <Typography
//                         className={`category-name ${selectedCategory === category ? 'expanded' : ''}`}
//                     >
//                         {category}
//                     </Typography>
//
//                 </AccordionSummary>
//                 </span>
//
//                 <AccordionDetails>
//                     {category === "Gender" ? (
//                             <Box className={`allType ${expanded['Gender'] ? 'expanded' : ''}`}>
//                                 <div className='allType_container'>
//                                     <Checkbox
//                                         checked={checkboxes['Men'] || false}
//                                         // onChange={(event) => dispatch(updateFilters({ ...checkboxes, ['Men']: event.target.checked }))}
//                                         onChange={handleCheckboxChange('Men')}
//                                     />
//                                     <Typography>Men</Typography>
//                                 </div>
//                                 <div className='allType_container'>
//                                     <Checkbox
//                                         checked={checkboxes['Women'] || false}
//                                         // onChange={(event) => dispatch(updateFilters({ ...checkboxes, ['Women']: event.target.checked }))}
//                                         onChange={handleCheckboxChange('Women')}
//                                     />
//                                     <Typography>Women</Typography>
//                                 </div>
//                             </Box>
//                         ) :
//                         category === "Category" ? (
//                             <Box className={`allType ${expanded['Category'] ? 'expanded' : ''}`}>
//                                 {(viewMore[category] ? categories : categories.slice(0, 5)).map((item, index) => (
//                                     <div className='allType_container' key={index}>
//                                         <Checkbox
//                                             checked={checkboxes[item] || false}
//                                             // onChange={(event) => dispatch(updateFilters({ ...checkboxes, [item]: event.target.checked }))}
//                                             onChange={handleCheckboxChange(item)}
//                                         />
//                                         <Typography>{item}</Typography>
//                                     </div>
//                                 ))}
//                                 <Button style={{color: "grey"}} className="viewMoreLessButton" onClick={() => handleViewMoreClick(category)}>
//                                     {viewMore[category] ? 'View Less' : 'View More'}
//                                 </Button>
//                             </Box>
//                         ) : category === "Type" ? (
//                             <Box className={`allType ${expanded['Type'] ? 'expanded' : ''}`}>
//                                 {(viewMore['Type'] ? types : types.slice(0, 5)).map((item, index) => (
//                                     <div className='allType_container' key={index}>
//                                         <Checkbox
//                                             checked={checkboxes[item] || false}
//                                             // onChange={(event) => dispatch(updateFilters({ ...checkboxes, [item]: event.target.checked }))}
//                                             onChange={handleCheckboxChange(item)}
//                                         />
//                                         <Typography>{item}</Typography>
//                                     </div>
//                                 ))}
//                                 <Button style={{color: "grey"}} onClick={() => handleViewMoreClick('Type')}>
//                                     {viewMore['Type'] ? 'View Less' : 'View More'}
//                                 </Button>
//                             </Box>
//                         ) : category === "Activity" ? (
//                             <Box className={`allType ${expanded['Activity'] ? 'expanded' : ''}`}>
//                                 {(viewMore['Activity'] ? activity : activity.slice(0, 5)).map((item, index) => (
//                                     <div className='allType_container' key={index}>
//                                         <Checkbox
//                                             checked={checkboxes[item] || false}
//                                             // onChange={(event) => dispatch(updateFilters({ ...checkboxes, [item]: event.target.checked }))}
//                                             onChange={handleCheckboxChange(item)}
//                                         />
//                                         <Typography>{item}</Typography>
//                                     </div>
//                                 ))}
//                                 <Button style={{color: "grey"}} onClick={() => handleViewMoreClick('Activity')}>
//                                     {viewMore['Activity'] ? 'View Less' : 'View More'}
//                                 </Button>
//                             </Box>
//                         ) : category === "Size" ? (
//                             <Box>
//                                 <div className="sizeButtonContainer">
//                                     {size.map((item, index) => (
//                                         <Button
//                                             className={`sizeButton ${checkboxes[item] ? 'selected' : ''}`}
//                                             variant="outlined"
//                                             key={index}
//                                             // onClick={(event) => dispatch(updateFilters({ ...checkboxes, [item]: !checkboxes[item] }))}
//                                             onChange={handleCheckboxChange(item)}
//                                         >
//                                             {item}
//                                         </Button>
//                                     ))}
//                                 </div>
//                                 <hr />
//                                 <div className="sizeButtonContainer">
//                                     {newSizes.map((item, index) => (
//                                         <Button
//                                             className={`sizeButton ${checkboxes[item] ? 'selected' : ''}`}
//                                             variant="outlined"
//                                             key={index}
//                                             // onClick={(event) => dispatch(updateFilters({ ...checkboxes, [item]: !checkboxes[item] }))}
//                                             onChange={handleCheckboxChange(item)}
//                                         >
//                                             {item}
//                                         </Button>
//                                     ))}
//                                 </div>
//                                 <hr />
//                                 <div className="sizeButtonContainer">
//                                     <Button
//                                         className={`sizeButton ${checkboxes['ONE SIZE'] ? 'selected' : ''}`}
//                                         variant="outlined"
//                                         onClick={(event) => dispatch(updateFilters({ ...checkboxes, ['ONE SIZE']: !checkboxes['ONE SIZE'] }))}
//                                         // onChange={handleCheckboxChange('ONE SIZE')}
//                                     >
//                                         ONE SIZE
//                                     </Button>
//                                 </div>
//                             </Box>
//                         ) : category === "Size Type" ? (
//                             <Box className={`allType ${expanded['Size Type'] ? 'expanded' : ''}`}>
//                                 {(viewMore['Size Type'] ? sizeTypes : sizeTypes.slice(0, 5)).map((item, index) => (
//                                     <div className='allType_container' key={index}>
//                                         <Checkbox
//                                             checked={checkboxes[item] || false}
//                                             // onChange={(event) => dispatch(updateFilters({ ...checkboxes, [item]: event.target.checked }))}
//                                             onChange={handleCheckboxChange(item)}
//                                         />
//                                         <Typography>{item}</Typography>
//                                     </div>
//                                 ))}
//                                 <Button style={{color: "grey"}} onClick={() => handleViewMoreClick('Size Type')}>
//                                     {viewMore['Size Type'] ? 'View Less' : 'View More'}
//                                 </Button>
//                             </Box>
//                         ) : category === "Color" ? (
//                             <Box className={`allType ${expanded['Color'] ? 'expanded' : ''}`}>
//                                 <div className="colorGrid">
//                                     {color.map((item, index) => (
//                                         <div key={index}>
//                                             <img
//                                                 src={item.url}
//                                                 alt={item.id}
//                                                 className={`roundImage ${checkboxes[item.id] ? 'selected' : ''}`}
//                                                 // onClick={(event) => dispatch(updateFilters({ ...checkboxes, [item.id]: !checkboxes[item.id] }))}
//                                                 onChange={handleCheckboxChange(item)}
//                                             />
//                                             <Typography>{item.id}</Typography>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </Box>
//                         ) : category === "Collection" ? (
//                             <Box className={`allType ${expanded['Collection'] ? 'expanded' : ''}`}>
//                                 {(viewMore['Collection'] ? collections : collections.slice(0, 5)).map((item, index) => (
//                                     <div className='allType_container' key={index}>
//                                         <Checkbox
//                                             checked={checkboxes[item] || false}
//                                             // onChange={(event) => dispatch(updateFilters({ ...checkboxes, [item]: event.target.checked }))}
//                                             onChange={handleCheckboxChange(item)}
//                                         />
//                                         <Typography>{item}</Typography>
//                                     </div>
//                                 ))}
//                                 <Button style={{color: "grey"}} onClick={() => handleViewMoreClick('Collection')}>
//                                     {viewMore['Collection'] ? 'View Less' : 'View More'}
//                                 </Button>
//                             </Box>
//                         ) : category === "Features" ? (
//                             <Box className={`allType ${expanded['Features'] ? 'expanded' : ''}`}>
//                                 {(viewMore['Features'] ? features : features.slice(0, 5)).map((item, index) => (
//                                     <div className='allType_container' key={index}>
//                                         <Checkbox
//                                             checked={checkboxes[item] || false}
//                                             // onChange={(event) => dispatch(updateFilters({ ...checkboxes, [item]: event.target.checked }))}
//                                             onChange={handleCheckboxChange(item)}
//                                         />
//                                         <Typography>{item}</Typography>
//                                     </div>
//                                 ))}
//                                 <Button style={{color: "grey"}} onClick={() => handleViewMoreClick('Features')}>
//                                     {viewMore['Features'] ? 'View Less' : 'View More'}
//                                 </Button>
//                             </Box>
//                         ) : category === "Climate" ? (
//                             <Box className={`allType ${expanded['Climate'] ? 'expanded' : ''}`}>
//                                 {(viewMore['Climate'] ? climate : climate.slice(0, 5)).map((item, index) => (
//                                     <div className='allType_container' key={index}>
//                                         <Checkbox
//                                             checked={checkboxes[item] || false}
//                                             // onChange={(event) => dispatch(updateFilters({ ...checkboxes, [item]: event.target.checked }))}
//                                             onChange={handleCheckboxChange(item)}
//                                         />
//                                         <Typography>{item}</Typography>
//                                     </div>
//                                 ))}
//                                 <Button style={{color: "grey"}} onClick={() => handleViewMoreClick('Climate')}>
//                                     {viewMore['Climate'] ? 'View Less' : 'View More'}
//                                 </Button>
//                             </Box>
//                         ) : category === "Fabric" ? (
//                             <Box className={`allType ${expanded['Fabric'] ? 'expanded' : ''}`}>
//                                 {(viewMore['Fabric'] ? fabrics : fabrics.slice(0, 5)).map((item, index) => (
//                                     <div className='allType_container' key={index}>
//                                         <Checkbox
//                                             checked={checkboxes[item] || false}
//                                             // onChange={(event) => dispatch(updateFilters({ ...checkboxes, [item]: event.target.checked }))}
//                                             onChange={handleCheckboxChange(item)}
//                                         />
//                                         <Typography>{item}</Typography>
//                                     </div>
//                                 ))}
//                                 <Button style={{color: "grey"}} onClick={() => handleViewMoreClick('Fabric')}>
//                                     {viewMore['Fabric'] ? 'View Less' : 'View More'}
//                                 </Button>
//                             </Box>
//                         ) : null}
//                 </AccordionDetails>
//             </Accordion>
//         ))}
//     </nav>
// </div>


// useEffect(() => {
//     // Fetch the filters.json file using Axios
//     axios.get('http://api-lulu.hibitbyte.com/product/filter?mykey=F02KJGLBsVabYYx9ERXsA2/OcdWz9JnamlZ%2BOLnnMAEq%2BMEwvj8qszKXR2j0XfJvvhyL8VY7AFDotu8ibhKlYw==')
//         .then(response => {
//             const filterData = response.data.filters;
//             // Use the updateFilters action to dispatch the filter data to your Redux store
//             dispatch(updateFilters(filterData));
//             console.log('Selected Filters:', filterData);
//         })
//         .catch(error => {
//             // Handle error if the request fails
//             console.error('Error fetching filter data:', error);
//         });
// }, []);

// useEffect(() => {
//     console.log('Selected data:', filterData);
// }, [filterData]);


// const filterCategories = ['Gender', 'Category', 'Type', 'Activity', 'Size', 'Size Type', 'Color', 'Collection', 'Features', 'Climate', 'Fabric'];
//
// const categories = ['Shoes', 'Leggings', 'Hoodies & Sweatshirts', 'Pants', 'Long Sleeve Shirts', 'Short Sleeve Shirts', 'Sweaters', 'Sweatpants', 'Joggers', 'Coats & Jackets', 'Shorts', 'Tank Tops', 'Sports Bras', 'Accessories'];
//
// const types = [
//     'Athletic Shorts', 'Athletic Skirts', 'Beanies', 'Blocks', 'Bucket Hats', 'Crewneck Sweatshirts',
//     'Foam Rollers', 'Hair Clips', 'Hoodies', 'Keychains', 'Liner Shorts', 'Longline Bras', 'Onesies',
//     'Puffer Jackets', 'Skorts', 'Slides', 'Sweat Shorts', 'Windbreakers', 'Zip Up Sweatshirts'
// ];
//
// const activity = [
//     'On the Move', 'Bike', 'Casual', 'Dance', 'Golf', 'Hiking', 'Running',
//     'Swim', 'Tennis', 'Training', 'Travel', 'Work', 'Workout', 'Yoga'
// ];
//
// const size = ['0', '2', '4', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '14', '16', '18', '20', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33']
//
// const newSizes = ['XXS', 'XS', 'XS/S', 'S', 'S/M', 'M', 'M/L', 'L', 'L/XL', 'XL', 'XL/XXL', 'XXL'];
//
//
// const sizeTypes = ['Plus Size', 'Tall', 'Short'];
//
// let color = [
//     {
//         url: 'https://images.lululemon.com/is/image/lululemon/35551?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
//         id: 'Camo',
//     },
//     {
//         url: 'https://images.lululemon.com/is/image/lululemon/tan_swatch?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
//         id: 'Khaki',
//     },
//     {
//         url: 'https://images.lululemon.com/is/image/lululemon/46171?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
//         id: 'Neon',
//     },
//     {
//         url: 'https://images.lululemon.com/is/image/lululemon/43899?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
//         id: 'Printed',
//     },
//     {
//         url: 'https://images.lululemon.com/is/image/lululemon/42593?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
//         id: 'Striped',
//     },
//     {
//         url: 'https://images.lululemon.com/is/image/lululemon/black_swatch?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
//         id: 'Black',
//     },
//     {
//         url: 'https://images.lululemon.com/is/image/lululemon/blue_swatch?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
//         id: 'Blue',
//     },
//     {
//         url: 'https://images.lululemon.com/is/image/lululemon/brown_swatch?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
//         id: 'Brown',
//     },
//     {
//         url: 'https://images.lululemon.com/is/image/lululemon/26950?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
//         id: 'Burgundy',
//     },
//     {
//         url: 'https://images.lululemon.com/is/image/lululemon/48128?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
//         id: 'Gold',
//     },
//     {
//         url: 'https://images.lululemon.com/is/image/lululemon/33093?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
//         id: 'Green',
//     },
//     {
//         url: 'https://images.lululemon.com/is/image/lululemon/grey_swatch?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
//         id: 'Grey',
//     },
//     {
//         url: 'https://images.lululemon.com/is/image/lululemon/35033?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
//         id: 'Metallic',
//     },
//     {
//         url: 'https://images.lululemon.com/is/image/lululemon/32664?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
//         id: 'Navy',
//     },
//     {
//         url: 'https://images.lululemon.com/is/image/lululemon/na_apr22_wk2_W_Neutrals_Neutral_CircleSwatch?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
//         id: 'Neutral',
//     },
//     {
//         url: 'https://images.lululemon.com/is/image/lululemon/26083?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
//         id: 'Olive',
//     },
//     {
//         url: 'https://images.lululemon.com/is/image/lululemon/orange_swatch?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
//         id: 'Orange',
//     },
//     {
//         url: 'https://images.lululemon.com/is/image/lululemon/52291?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
//         id: 'Pastel',
//     },
//     {
//         url: 'https://images.lululemon.com/is/image/lululemon/pink_swatch?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
//         id: 'Pink',
//     },
//     {
//         url: 'https://images.lululemon.com/is/image/lululemon/purple_swatch?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
//         id: 'Purple',
//     },
//     {
//         url: 'https://images.lululemon.com/is/image/lululemon/red_swatch?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
//         id: 'Red',
//     },
//     {
//         url: 'https://images.lululemon.com/is/image/lululemon/black_swatch?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
//         id: 'Silver',
//     },
//     {
//         url: 'https://images.lululemon.com/is/image/lululemon/44477?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
//         id: 'Tie Dye',
//     },
//     {
//         url: 'https://images.lululemon.com/is/image/lululemon/white_swatch?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
//         id: 'White',
//     },
//     {
//         url: 'https://images.lululemon.com/is/image/lululemon/yellow_swatch?wid=68&hei=68&fit=crop,1&op_usm=0.8,1,10,0&fmt=webp&qlt=90,1&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72',
//         id: 'Yellow',
//     },
// ];
//
// const collections = [
//     'Align', 'Groove', 'Dance Studio', 'Ebb to Street', 'Love', 'Scuba',
//     'Speed Up', 'Swiftly', 'Wunder Train', 'Wunder Puff', 'Blissfeel', 'Everywhere',
//     'Restfeel', 'Strongfeel'
// ];
//
// const features = [
//     'Seamless', 'Anti Stink', 'Lightweight', 'Insulated', 'Reflective', 'Down',
//     'Drawstring', 'Multipack', 'Packable'
// ];
//
// const climate = [
//     'Summer', 'Warm Weather', 'Spring', 'Fall', 'Cold Weather', 'Winter'
// ];
//
// const fabrics = [
//     'Fleece', 'Everlux™', 'Nulu™', 'Nulux™', 'Luxtreme™', 'Ultralu™',
//     'Cotton', 'Pima Cotton', 'Swift', 'Canvas', 'Ribbed', 'Ripstop',
//     'Softstreme™', 'Utilitech™'
// ];

// const handleCheckboxChange = (category) => (event) => {
//     setSelectedFilters((prevFilters) => ({
//         ...prevFilters,
//         [category]: event.target.checked,
//     }));
//     // Dispatch an action or perform any other operation based on the selected filters
//     dispatch(updateFilters({ ...checkboxes, [category]: event.target.checked }));
// };

// console.log('Selected Filters:', selectedFilters);


// const [expanded, setExpanded] = useState(
//     items.reduce((obj, category) => {
//         return {...obj, [category]: false};
//     }, {})
// );
//
//         const [expanded, setExpanded] = useState({});
// // // the open or close the selections
//         const handleViewMore = (category) => {
//             setExpanded(prevState => ({...prevState, [category]: !prevState[category]}));
//         };
//
//         const [viewMore, setViewMore] = useState(
//             filterData.rs.reduce((obj, category) => {
//                 return {...obj, [category]: false};
//             }, {})
//         );
// //
//         const handleViewMoreClick = (category) => {
//             setViewMore(prevState => ({...prevState, [category]: !prevState[category]}));
//         };
{/*<AccordionSummary*/
}
{/*>Gender</AccordionSummary>*/
}
{/*<AccordionDetails>*/
}
{/*{filterData.rs.Gender.map((gender) => (*/
}
{/*    <label key={gender.name}>*/
}
{/*        <input type="checkbox" checked={gender.isChecked} />*/
}
{/*        {gender.name}*/
}
{/*    </label>*/
}
{/*))}*/
}
{/*</AccordionDetails>*/
}

{/*<h2>Category</h2>*/
}
{/*{filterData.rs.Category.map((category) => (*/
}
{/*    <label key={category.name}>*/
}
{/*        <input type="checkbox" checked={category.isChecked} />*/
}
{/*        {category.name}*/
}
{/*    </label>*/
}
{/*))}*/
}

// <h2>Type</h2>
// {filterData.rs.Type.map((type) => (
//     <label key={type.name}>
//         <input type="checkbox" checked={type.isChecked} />
//         {type.name}
//     </label>
// ))}
//
// <h2>Activity</h2>
// {filterData.rs.Activity.map((activity) => (
//     <label key={activity.name}>
//         <input type="checkbox" checked={activity.isChecked} />
//         {activity.name}
//     </label>
// ))}
//
// <h2>Size</h2>
// {filterData.rs.Size.map((size) => (
//     <label key={size.name}>
//         <input type="checkbox" checked={size.isChecked} />
//         {size.name}
//     </label>
// ))}
//
// <h2>SizeType</h2>
// {filterData.rs.SizeType.map((sizeType) => (
//     <label key={sizeType.name}>
//         <input type="checkbox" checked={sizeType.isChecked} />
//         {sizeType.name}
//     </label>
// ))}
//
// <h2>Colour</h2>
// {filterData.rs.Colour.map((colour) => (
//     <label key={colour.alt}>
//         <input type="checkbox" checked={colour.isChecked} />
//         {colour.alt}
//     </label>
// ))}
//
// <h2>Collection</h2>
// {filterData.rs.Collection.map((collection) => (
//     <label key={collection.name}>
//         <input type="checkbox" checked={collection.isChecked} />
//         {collection.name}
//     </label>
// ))}
//
// <h2>Features</h2>
// {filterData.rs.Features.map((feature) => (
//     <label key={feature.name}>
//         <input type="checkbox" checked={feature.isChecked} />
//         {feature.name}
//     </label>
// ))}
//
// <h2>Fabric</h2>
// {filterData.rs.Fabric.map((fabric) => (
//     <label key={fabric.name}>
//         <input type="checkbox" checked={fabric.isChecked} />
//         {fabric.name}
//     </label>
// ))}
