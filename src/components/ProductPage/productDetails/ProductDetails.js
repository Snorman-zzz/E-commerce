import React, {useState} from 'react';
import './ProductDetails.scss';
import 'swiper/css'
import 'swiper/css/navigation'
import {Radio} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Popup from "../../AddToBag/Popup";


function ProductDetails({info, current, sizeCurrent}) {
	const [selectedOption, setSelectedOption] = useState('ship');


	const [isAccordionOpen, setAccordionOpen] = useState(false);

	const [showPick, setShowPick] = useState(false) // 是否展示pick up 详情

	const [buttonPopup, setButtonPopup] = useState(false)

	return (
		<div className="purchase">
			<main>
				<div className="ship">
					<Radio
						className='ship-radio'
						size="small"
						sx={{
							color: '#c8102e',
							'&.Mui-checked': {
								color: '#c8102e',
							},
						}}
						checked={true}
						name="radio-buttons"
						inputProps={{'aria-label': 'A'}}
					/>
					<div className='ship-title'>Ship it to me</div>
					<div>Free shipping and returns</div>
				</div>
				<div className="pick" onClick={() => setShowPick(!showPick)}>
					<div className="pick-wrap">
						<div className="pick-title">
							<svg className="icon" height="24" width="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
							     focusable="false" role="img" aria-hidden="true">
								<path
									d="M14.667 14.167h-.834v-8.62l.667.246a.5.5 0 0 0 .667-.46V2.667a.5.5 0 0 0-.307-.46 17.68 17.68 0 0 0-13.72 0 .5.5 0 0 0-.307.46v2.666a.5.5 0 0 0 .667.46s.667-.253.667-.246v8.62h-.834a.667.667 0 0 0-.666.666v.334h14.666v-.334a.667.667 0 0 0-.666-.666Zm-8.834 0V9.833H7.5v4.334H5.833Zm3.667 0h-1V9.833h1.667v4.334H9.5Zm3.333 0h-1.666V9.333a.507.507 0 0 0-.5-.5H5.333a.507.507 0 0 0-.5.5v4.834H3.167V5.213a17.393 17.393 0 0 1 9.666 0v8.954Zm-11-9.567V3a17.18 17.18 0 0 1 12.334 0v1.6a18.147 18.147 0 0 0-12.334 0Z"
									fill="currentColor"></path>
							</svg>
							Pick up in-store
						</div>

						{showPick ?
							<RemoveIcon fontSize='small'/> :
							<AddIcon fontSize='small'/>}
					</div>
					{showPick &&
						<div className="prompt">Please select a size to see product availability at a store near you.</div>}
				</div>

				<div className="add-to-bag">
					<div className="add-to-bag_btn" onClick={() => setButtonPopup(true)}>ADD TO BAG</div>
				</div>
			</main>


			{/*<Link to={`/popup`}>*/}
			{/*    <div className="add-to-bag">*/}
			{/*        <div className="btn">ADD TO BAG</div>*/}
			{/*    </div>*/}
			{/*</Link>*/}
			<Popup trigger={buttonPopup} setTrigger={setButtonPopup} info={info} current={current} sizeCurrent={sizeCurrent}/>
		</div>
	);
}

export default ProductDetails;
