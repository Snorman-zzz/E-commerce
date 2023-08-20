import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRight, faTimes} from '@fortawesome/free-solid-svg-icons';
import './Popup.scss';
import {Link} from "react-router-dom";
import {getCookie, setCookie} from "../../cookies";

function Popup(props) {
	console.log(props)
	const addShoppingCart = () => {
		let shoppingCartInfo = []
		const shoppingCart = getCookie('shopping_cart_info')
		if (shoppingCart) {
			shoppingCartInfo = JSON.parse(shoppingCart)
		}
		// 缓存购物车信息
		console.log(shoppingCartInfo)
		const filterCart = shoppingCartInfo.find(e => e.name === props.info.name && e.size === props.info.sizes[0].details[props.sizeCurrent] && e.color === props.info.images[props.current].colorAlt && e.productId === props.info.productId && e.color === props.info.images[props.current].colorId)
		if (filterCart) {
			filterCart.quantity = filterCart.quantity + 1
			setCookie('shopping_cart_info', JSON.stringify(shoppingCartInfo))
		} else {
			setCookie('shopping_cart_info', JSON.stringify([{
				id: 1,
				color: props.info.images[props.current].colorAlt,
				quantity: 1,
				showQuantity: false,
				name: props.info.name,
				size: props.info.sizes[0].details[props.sizeCurrent],
				price: props.info.price,
				imageUrl: props.info.images[props.current].whyWeMadeThis[0],
				productId: props.info.productId,
				colorId: props.info.images[props.current].colorId,
			}, ...shoppingCartInfo]))
		}
		// console.log("Updated shopping cart:", getCookie('shopping_cart_info'));
	}
	return (props.trigger) ? (
		<div className="popup">
			<div className="popup-modal">
				<div className="modal-inner-wrapper">
					{/* Top Section */}
					<div className="top-section">
						<div className="left-content">
							<h2>New Pick!</h2>
							<svg
								height='32'
								width='32'
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
							<title id='icon_:rf:'>bagIcon</title>
							<span className="item-count">1 Item</span>
						</div>
						<div className="right-content">
							<FontAwesomeIcon icon={faTimes} className="close-icon" onClick={() => props.setTrigger(false)}/>
							{props.children}
						</div>
					</div>

					{/*<div className="divider"></div>*/}

					{/* Middle Section */}
					<div className="middle-section">
						<div className="left-content">
							<img className="product-image"
							     src={props.info.images[props.current].whyWeMadeThis[0]}
							     alt="Product"/>
							<div className="product-info">
								<h3>{props.info.name}</h3>
								<span>Full Length</span>
								<span>Size: {props.info.sizes[0].details[props.sizeCurrent]}</span>
								<span>{props.info.price}</span>
							</div>
						</div>

						<div className="right-content">
							<div className="subtotal">
								<span>Subtotal</span>
								<span>{props.info.price}</span>
							</div>
							<Link className='link' to={`/shop/myBag`} onClick={addShoppingCart}>
								<button className="checkout-button">VIEW BAG & CHECKOUT</button>
							</Link>
							<div className="ctaLinkPrimary">
								CONTINUE SHOPPING
								{/*<FontAwesomeIcon icon={faArrowRight}/>*/}
								<svg
									height='16'
									width='16'
									viewBox='0 0 16 16'
									xmlns='http://www.w3.org/2000/svg'
									focusable='false'
									role='img'
									aria-labelledby='icon_:rhl:'
									aria-hidden='false'>
									<title id='icon_:rhl:'>rightLinkArrowIcon</title>
									<path
										d='m10.53 2.47 5 5a.75.75 0 0 1 .01 1.04l-5 5-.35-.35a1 1 0 0 1 0-1.42l3-3H5a1 1 0 0 1-1-1v-.5h9.18l-3-3a1 1 0 0 1 0-1.42l.35-.35ZM2 7.25a1 1 0 0 1 1 1v.5H1a1 1 0 0 1-1-1v-.5Z'
										fill='currentColor'></path>
								</svg>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	) : "";
}

export default Popup;
