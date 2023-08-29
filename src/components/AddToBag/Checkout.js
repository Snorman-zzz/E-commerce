import React, {useEffect, useState} from 'react';
import './Checkout.scss';
import {Link, useNavigate} from "react-router-dom";
import {getCookie, setCookie} from "../../cookies";
import NoItemInBag from "./NoItemInBag";

const Checkout = () => {
	const shoppingCart = getCookie('shopping_cart_info')
	// Sample bag items (you can replace this with actual data)
	const [bagItems, setBagItems] = useState(shoppingCart ? JSON.parse(shoppingCart) : [])
	const navigate = useNavigate();
	const sizeList = [1, 2, 3, 4, 5]

	// Sample notification message
	const notificationMessage = "Items in bag are not reserved. Checkout now to get your gear.";


	useEffect(() => {
		shoppingCart && !JSON.parse(shoppingCart).length && navigate('/remove');
		const anyClick =function (e) {
			if (e.target.className !== 'quantity-li' && e.target.className !== 'quantity-input') {
				setBagItems((bagItems) => [...bagItems.map(e => {
					e.showQuantity = false;
					return e
				})])
			}
		}
		document.addEventListener('click', anyClick,false)
		return ()=>{
			document.removeEventListener('click', anyClick,false)
		}
	}, [])

	const remove = (i) => {
		bagItems.splice(i, 1)
		setBagItems([...bagItems])
		const shoppingCartiInfo = JSON.parse(shoppingCart)
		shoppingCartiInfo.splice(i, 1)
		setCookie('shopping_cart_info', JSON.stringify(shoppingCartiInfo))
		!bagItems.length && navigate('/remove');
	}
	return (
		<div className="app">
			<div className="header">
				<Link to={`/`}>
					<img width='34' height='34' src="https://i.imgur.com/AjtN2tW.png" alt=""/>
					// <svg viewBox='0 0 27 27' xmlns='http://www.w3.org/2000/svg' width='34' height='34'>
					// 	<path
					// 		d='M13.499 0C20.956 0 27 6.045 27 13.5 27 20.957 20.956 27 13.499 27 6.044 27 0 20.958 0 13.5 0 6.044 6.044 0 13.499 0zm7.076 20.18c-.425 0-.825-.127-1.22-.391-2.184-1.454-1.438-3.198.053-5.897.63-1.145 1.282-2.324 1.572-3.542.311-1.31.594-3.22-.542-4.664-.534-.677-1.347-1.2-2.413-1.554-1.112-.367-2.54-.566-4.25-.589l-.118-.003-.434.003c-1.709.023-3.139.222-4.248.589-1.068.354-1.88.876-2.415 1.554-1.136 1.445-.853 3.354-.54 4.664.288 1.218.941 2.4 1.57 3.541 1.491 2.7 2.238 4.444.052 5.898-.394.264-.792.39-1.218.39-.85 0-1.83-.425-2.352-.685l.127.223c1.08 1.621 2.468 2.483 4.01 2.483.676 0 1.39-.164 2.12-.488.775-.343 1.455-.971 1.917-1.769.46-.798.643-1.657.512-2.421-.158-.685-.516-1.606-.927-2.673-1.077-2.783-2.548-6.588-1.278-8.449.536-.785 1.5-1.169 2.945-1.174 1.447.005 2.41.389 2.946 1.174 1.272 1.861-.2 5.666-1.275 8.445-.413 1.068-.77 1.99-.928 2.67-.132.771.05 1.63.512 2.428s1.142 1.426 1.917 1.77c.73.323 1.444.487 2.12.487 1.542 0 2.93-.862 4.015-2.49l.122-.216c-.52.26-1.5.686-2.352.686z'
					// 		id='Combined-Shape'
					// 		fill='#d31334'></path>
					// </svg>
				</Link>
			</div>
			<div className="main-content">
				<div className="top-section">
					<div className="left-section">
						<div className="my-bag">
							<h1 className="my-bag-title">My Bag <div className='item-count'>({bagItems.reduce((prev, next) => {
								prev +=  next.quantity;
								return prev
							}, 0)} item)</div></h1>
							<div className="notification-block">
								<svg
									height="24"
									width="24"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
									className="notification-icon"
									focusable="false"
									role="img"
									aria-hidden="true"
								>
									{/* SVG path here */}
								</svg>
								<div className="notification-message">{notificationMessage}</div>
							</div>
							<div className="my-bag-items">
								{bagItems.map((item, index) => (
									<div className="checkout-item" key={index}>
										<img src={item.imageUrl} alt={item.name} className="item-image"/>
										<div className="item-details">
											<div className='item-details-wrap'>
												<span className="name">{item.name}</span>
												<span className="color">Color: {item.color}</span>
												<span className="size">
													<span className="size_left">
													<span className="size_left_top">Size: {item.size}
													</span>
													<button className='edit-button'>Edit</button>
													</span>


											<div className="right-details">
												<div className="quantity-total-price-container">
													<div className="item-price-container">
														<h2 className="item-price-title">Item Price</h2>
														<p className="item-price-value">{item.price}</p>
													</div>
													<div className="quantity-container">
														<p className="quantity-title">Quantity</p>
														{/*帮忙看下(已处理)*/}
														<div className='quantity-section'>
															<input type='text' readOnly onClick={() => {
																bagItems[index].showQuantity = !item.showQuantity
																setBagItems([...bagItems])
															}} className='quantity-input'
															       value={item.quantity}/>
															<div className={"quantity-ul " + (item.showQuantity ? 'active' : '')}>
																{sizeList.map(e =>
																	<div key={e+''+index} className="quantity-li" onClick={() => {
																		bagItems[index].quantity = e
																		bagItems[index].showQuantity = !item.showQuantity
																		setCookie('shopping_cart_info', JSON.stringify(bagItems))
																		setBagItems([...bagItems])
																	}}>{e}</div>
																)}
															</div>
														</div>
													</div>
													<div className="total-price-container">
														<p className="total-price-title">Total Price</p>
														<p className="total-price-value">${item.price.replace(/[^\d]/g, '') * item.quantity}</p>
													</div>
												</div>
											</div>
										</span>
									</div>
											<div className='product-info'>
												<div className='shipping-info'>Free Shipping + Free Returns</div>
												<div className='actions'>
													<div className='saved-for-later'>Save for Later</div>
													{/*<Link to={`/remove`} onClick={() => remove(index)}>*/}
													<div onClick={() => remove(index)} className='remove'>Remove</div>
													{/*</Link>*/}
												</div>
											</div>

										</div>
									</div>
								))}
							</div>
						</div>
						<div className="saved-for-later">
							<h2>Saved for Later</h2>
							<div className='member-message'>Sign in or create a member account to view your saved items</div>
						</div>
					</div>
                    <div className="right-section">
                        <div className="order-summary">
                            <h2>Order Summary</h2>
                            <div className='subtotal-section'>
                                <div className='subtotal-text'>Subtotal</div>
                                <div className='subtotal-value'>${bagItems.reduce((total, item) => total + (parseFloat(item.price.replace(/[^\d]/g, '')) * item.quantity), 0).toFixed(2)}</div>
                            </div>
                            <hr className="divider" />
                            <div className='subtotal-section'>
                                <div className='subtotal-text'>Shipping
                                    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="pay-later-promo-message_icon__5ugVV" focusable="false" role="img" aria-labelledby="icon_f401c5fa-1a23-4ca7-b0d6-5585a358e40d" aria-hidden="false"><title id="icon_f401c5fa-1a23-4ca7-b0d6-5585a358e40d">Installment pay info</title><g fill="none" fill-rule="evenodd" stroke="currentColor"><circle cx="12" cy="12" r="11" stroke-width="2"></circle><path d="M13.55 7.15a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0zm-1.232 8.735h1.163v.538c0 .595-.482 1.077-1.077 1.077h-1.077a.818.818 0 0 1-.625-.29.862.862 0 0 1-.172-.68l.883-4.415H10.25v-.538c0-.595.482-1.077 1.077-1.077h1.077c.24 0 .47.107.624.29a.865.865 0 0 1 .173.68z" fill="currentColor"></path></g></svg>
                                </div>
                                <div className='subtotal-value'>FREE</div>
                            </div>
                            <hr className="divider" />
                            <div className='subtotal-section'>
                                <div className='subtotal-text'>Tax
                                    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="pay-later-promo-message_icon__5ugVV" focusable="false" role="img" aria-labelledby="icon_f401c5fa-1a23-4ca7-b0d6-5585a358e40d" aria-hidden="false"><title id="icon_f401c5fa-1a23-4ca7-b0d6-5585a358e40d">Installment pay info</title><g fill="none" fill-rule="evenodd" stroke="currentColor"><circle cx="12" cy="12" r="11" stroke-width="2"></circle><path d="M13.55 7.15a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0zm-1.232 8.735h1.163v.538c0 .595-.482 1.077-1.077 1.077h-1.077a.818.818 0 0 1-.625-.29.862.862 0 0 1-.172-.68l.883-4.415H10.25v-.538c0-.595.482-1.077 1.077-1.077h1.077c.24 0 .47.107.624.29a.865.865 0 0 1 .173.68z" fill="currentColor"></path></g></svg>
                                </div>
                                <div className='subtotal-value'>Calculated at checkout</div>
                            </div>
                            <div className='estimated-total-section'>
                                <div className='estimated-total-text'>Estimated Total</div>
                                <div className='estimated-total-value'>CAD ${bagItems.reduce((total, item) => total + (parseFloat(item.price.replace(/[^\d]/g, '')) * item.quantity), 0).toFixed(2)}</div>
                            </div>
                            <div className='total-description'>or 4 payments of $44.50 with
                                <svg height="24" width="124.87" viewBox="360.6 308.93 1148.88 220.83" className="afterpay-logo_afterpayLogo__GveY2 pay-later-promo-message_afterpayLogo__KPkQb" focusable="false" role="img" aria-labelledby="icon_2225c5dc-4fcd-464c-a61d-10ac4a243a41" aria-hidden="false"><title id="icon_2225c5dc-4fcd-464c-a61d-10ac4a243a41">Afterpay</title><path d="m1492 353.5-34.6-19.8-35.1-20.1c-23.2-13.3-52.2 3.4-52.2 30.2v4.5c0 2.5 1.3 4.8 3.5 6l16.3 9.3c4.5 2.6 10.1-.7 10.1-5.9V347c0-5.3 5.7-8.6 10.3-6l32 18.4 31.9 18.3c4.6 2.6 4.6 9.3 0 11.9l-31.9 18.3-32 18.4c-4.6 2.6-10.3-.7-10.3-6V415c0-26.8-29-43.6-52.2-30.2l-35.1 20.1-34.6 19.8c-23.3 13.4-23.3 47.1 0 60.5l34.6 19.8 35.1 20.1c23.2 13.3 52.2-3.4 52.2-30.2v-4.5c0-2.5-1.3-4.8-3.5-6l-16.3-9.3c-4.5-2.6-10.1.7-10.1 5.9v10.7c0 5.3-5.7 8.6-10.3 6l-32-18.4-31.9-18.3c-4.6-2.6-4.6-9.3 0-11.9l31.9-18.3 32-18.4c4.6-2.6 10.3.7 10.3 6v5.3c0 26.8 29 43.6 52.2 30.2l35.1-20.1L1492 414c23.3-13.5 23.3-47.1 0-60.5zm-227 6.6-81 167.3h-33.6l30.3-62.5-47.7-104.8h34.5l30.6 70.2 33.4-70.2h33.5zm-809.9 59.4c0-20-14.5-34-32.3-34s-32.3 14.3-32.3 34c0 19.5 14.5 34 32.3 34s32.3-14 32.3-34m.3 59.4v-15.4c-8.8 10.7-21.9 17.3-37.5 17.3-32.6 0-57.3-26.1-57.3-61.3 0-34.9 25.7-61.5 58-61.5 15.2 0 28 6.7 36.8 17.1v-15h29.2v118.8h-29.2zm171.2-26.4c-10.2 0-13.1-3.8-13.1-13.8V386h18.8v-25.9h-18.8v-29h-29.9v29H545v-11.8c0-10 3.8-13.8 14.3-13.8h6.6v-23h-14.4c-24.7 0-36.4 8.1-36.4 32.8v15.9h-16.6V386h16.6v92.9H545V386h38.6v58.2c0 24.2 9.3 34.7 33.5 34.7h15.4v-26.4h-5.9zM734 408.8c-2.1-15.4-14.7-24.7-29.5-24.7-14.7 0-26.9 9-29.9 24.7H734zm-59.7 18.5c2.1 17.6 14.7 27.6 30.7 27.6 12.6 0 22.3-5.9 28-15.4h30.7c-7.1 25.2-29.7 41.3-59.4 41.3-35.9 0-61.1-25.2-61.1-61.1 0-35.9 26.6-61.8 61.8-61.8 35.4 0 61.1 26.1 61.1 61.8 0 2.6-.2 5.2-.7 7.6h-91.1zm282.2-7.8c0-19.2-14.5-34-32.3-34-17.8 0-32.3 14.3-32.3 34 0 19.5 14.5 34 32.3 34 17.8 0 32.3-14.7 32.3-34m-94.1 107.9V360.1h29.2v15.4c8.8-10.9 21.9-17.6 37.5-17.6 32.1 0 57.3 26.4 57.3 61.3s-25.7 61.5-58 61.5c-15 0-27.3-5.9-35.9-15.9v62.5h-30.1zm229.3-107.9c0-20-14.5-34-32.3-34-17.8 0-32.3 14.3-32.3 34 0 19.5 14.5 34 32.3 34 17.8 0 32.3-14 32.3-34m.3 59.4v-15.4c-8.8 10.7-21.9 17.3-37.5 17.3-32.6 0-57.3-26.1-57.3-61.3 0-34.9 25.7-61.5 58-61.5 15.2 0 28 6.7 36.8 17.1v-15h29.2v118.8H1092zM809.7 371.7s7.4-13.8 25.7-13.8c7.8 0 12.8 2.7 12.8 2.7v30.3s-11-6.8-21.1-5.4c-10.1 1.4-16.5 10.6-16.5 23v70.3h-30.2V360.1h29.2v11.6z"></path></svg>
                                or
                                <svg height="24" width="107.52" viewBox="0 0 452.9 101.1" xmlns="http://www.w3.org/2000/svg" className="klarna-logo_klarnaLogo__a2Qfe pay-later-promo-message_klarnaLogo__2apAr" focusable="false" role="img" aria-labelledby="icon_d90b5b7d-13b0-4776-8b22-cce9aacf6845" aria-hidden="false"><title id="icon_d90b5b7d-13b0-4776-8b22-cce9aacf6845">Klarna</title><path d="M79.7 0H57.4c0 18.3-8.4 35-23 46l-8.8 6.6 34.2 46.6h28.1L56.4 56.3C71.3 41.5 79.7 21.5 79.7 0zM0 0h22.8v99.2H0zm94.5 0H116v99.2H94.5zm210.1 28.7c-8.2 0-16 2.5-21.2 9.6v-7.7H263v68.6h20.7v-36c0-10.4 7-15.5 15.4-15.5 9 0 14.2 5.4 14.2 15.4v36.2h20.5V55.6c0-16-12.7-26.9-29.2-26.9zM181 30.6V35c-5.8-4-12.8-6.3-20.4-6.3-20 0-36.2 16.2-36.2 36.2s16.2 36.2 36.2 36.2c7.6 0 14.6-2.3 20.4-6.3v4.4h20.5V30.6H181zm-18.7 51.9c-10.3 0-18.6-7.9-18.6-17.6s8.3-17.6 18.6-17.6 18.6 7.9 18.6 17.6-8.3 17.6-18.6 17.6zm71-43v-8.9h-21v68.6h21.1v-32c0-10.8 11.7-16.6 19.8-16.6h.2v-20c-8.3 0-16 3.6-20.1 8.9zm164.3-8.9V35c-5.8-4-12.8-6.3-20.4-6.3-20 0-36.2 16.2-36.2 36.2s16.2 36.2 36.2 36.2c7.6 0 14.6-2.3 20.4-6.3v4.4h20.5V30.6h-20.5zm-18.7 51.9c-10.3 0-18.6-7.9-18.6-17.6s8.3-17.6 18.6-17.6 18.6 7.9 18.6 17.6c.1 9.7-8.3 17.6-18.6 17.6zM434 32.6c0-1-.7-1.6-1.8-1.6h-1.9v5.2h.9v-1.9h1l.8 1.9h1l-.9-2.1c.6-.3.9-.8.9-1.5zm-1.8.8h-1v-1.6h1c.6 0 .9.3.9.8s-.2.8-.9.8z"></path><path d="M431.9 28.8c-2.7 0-4.9 2.2-4.9 4.9.1 2.7 2.2 4.9 4.9 4.9s4.9-2.2 4.9-4.9-2.2-4.9-4.9-4.9zm0 8.9c-2.2 0-3.9-1.8-3.9-4s1.8-4 3.9-4c2.2 0 3.9 1.8 3.9 4s-1.8 4-3.9 4zm8.1 37.2c-7.1 0-12.9 5.8-12.9 12.9 0 7.1 5.8 12.9 12.9 12.9 7.1 0 12.9-5.8 12.9-12.9 0-7.2-5.8-12.9-12.9-12.9z"></path></svg>
                                <div>
                                    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="pay-later-promo-message_icon__5ugVV" focusable="false" role="img" aria-labelledby="icon_f401c5fa-1a23-4ca7-b0d6-5585a358e40d" aria-hidden="false"><title id="icon_f401c5fa-1a23-4ca7-b0d6-5585a358e40d">Installment pay info</title><g fill="none" fill-rule="evenodd" stroke="currentColor"><circle cx="12" cy="12" r="11" stroke-width="2"></circle><path d="M13.55 7.15a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0zm-1.232 8.735h1.163v.538c0 .595-.482 1.077-1.077 1.077h-1.077a.818.818 0 0 1-.625-.29.862.862 0 0 1-.172-.68l.883-4.415H10.25v-.538c0-.595.482-1.077 1.077-1.077h1.077c.24 0 .47.107.624.29a.865.865 0 0 1 .173.68z" fill="currentColor"></path></g></svg>
                                </div>
                            </div>
                            <button className="checkout-button">
								<Link to={`/checkout`}>
                                // <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="iconButtonIcon-3D2lQ" focusable="false" role="img" aria-hidden="true"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.69 19.733a3.953 3.953 0 0 1-3.947-3.96 6.2 6.2 0 0 1 .55-2.183c.19-.511.378-1.019.567-1.523.476-1.194.83-2.433 1.06-3.697.157-1 .14-2.227-.623-3-.584-.587-1.487-.703-2.297-.723s-1.713.136-2.297.726c-.763.77-.78 2-.623 3 .23 1.264.585 2.5 1.06 3.694.187.506.376 1.014.567 1.523a6.2 6.2 0 0 1 .55 2.183 3.943 3.943 0 0 1-7.61 1.474 2.573 2.573 0 0 0 3.77-.31c.532-.72.693-1.65.433-2.507-.257-.93-.82-1.667-1.27-2.547-1.463-2.5-1.403-4.37-1.403-4.37 0-3.73 3.56-4.363 6.823-4.363 3.263 0 6.823.633 6.823 4.363 0 0 .06 1.87-1.403 4.37-.45.864-1 1.617-1.27 2.547-.26.857-.1 1.787.433 2.507a2.573 2.573 0 0 0 3.77.31 3.947 3.947 0 0 1-3.663 2.486z" fill="currentColor"></path></svg>
                                Checkout
								</Link>
							</button>
                            <div>or checkout quickly with</div>
                            <button className="paypal-button">
                                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAxcHgiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAxMDEgMzIiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHhtbG5zPSJodHRwOiYjeDJGOyYjeDJGO3d3dy53My5vcmcmI3gyRjsyMDAwJiN4MkY7c3ZnIj48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNIDEyLjIzNyAyLjggTCA0LjQzNyAyLjggQyAzLjkzNyAyLjggMy40MzcgMy4yIDMuMzM3IDMuNyBMIDAuMjM3IDIzLjcgQyAwLjEzNyAyNC4xIDAuNDM3IDI0LjQgMC44MzcgMjQuNCBMIDQuNTM3IDI0LjQgQyA1LjAzNyAyNC40IDUuNTM3IDI0IDUuNjM3IDIzLjUgTCA2LjQzNyAxOC4xIEMgNi41MzcgMTcuNiA2LjkzNyAxNy4yIDcuNTM3IDE3LjIgTCAxMC4wMzcgMTcuMiBDIDE1LjEzNyAxNy4yIDE4LjEzNyAxNC43IDE4LjkzNyA5LjggQyAxOS4yMzcgNy43IDE4LjkzNyA2IDE3LjkzNyA0LjggQyAxNi44MzcgMy41IDE0LjgzNyAyLjggMTIuMjM3IDIuOCBaIE0gMTMuMTM3IDEwLjEgQyAxMi43MzcgMTIuOSAxMC41MzcgMTIuOSA4LjUzNyAxMi45IEwgNy4zMzcgMTIuOSBMIDguMTM3IDcuNyBDIDguMTM3IDcuNCA4LjQzNyA3LjIgOC43MzcgNy4yIEwgOS4yMzcgNy4yIEMgMTAuNjM3IDcuMiAxMS45MzcgNy4yIDEyLjYzNyA4IEMgMTMuMTM3IDguNCAxMy4zMzcgOS4xIDEzLjEzNyAxMC4xIFoiPjwvcGF0aD48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNIDM1LjQzNyAxMCBMIDMxLjczNyAxMCBDIDMxLjQzNyAxMCAzMS4xMzcgMTAuMiAzMS4xMzcgMTAuNSBMIDMwLjkzNyAxMS41IEwgMzAuNjM3IDExLjEgQyAyOS44MzcgOS45IDI4LjAzNyA5LjUgMjYuMjM3IDkuNSBDIDIyLjEzNyA5LjUgMTguNjM3IDEyLjYgMTcuOTM3IDE3IEMgMTcuNTM3IDE5LjIgMTguMDM3IDIxLjMgMTkuMzM3IDIyLjcgQyAyMC40MzcgMjQgMjIuMTM3IDI0LjYgMjQuMDM3IDI0LjYgQyAyNy4zMzcgMjQuNiAyOS4yMzcgMjIuNSAyOS4yMzcgMjIuNSBMIDI5LjAzNyAyMy41IEMgMjguOTM3IDIzLjkgMjkuMjM3IDI0LjMgMjkuNjM3IDI0LjMgTCAzMy4wMzcgMjQuMyBDIDMzLjUzNyAyNC4zIDM0LjAzNyAyMy45IDM0LjEzNyAyMy40IEwgMzYuMTM3IDEwLjYgQyAzNi4yMzcgMTAuNCAzNS44MzcgMTAgMzUuNDM3IDEwIFogTSAzMC4zMzcgMTcuMiBDIDI5LjkzNyAxOS4zIDI4LjMzNyAyMC44IDI2LjEzNyAyMC44IEMgMjUuMDM3IDIwLjggMjQuMjM3IDIwLjUgMjMuNjM3IDE5LjggQyAyMy4wMzcgMTkuMSAyMi44MzcgMTguMiAyMy4wMzcgMTcuMiBDIDIzLjMzNyAxNS4xIDI1LjEzNyAxMy42IDI3LjIzNyAxMy42IEMgMjguMzM3IDEzLjYgMjkuMTM3IDE0IDI5LjczNyAxNC42IEMgMzAuMjM3IDE1LjMgMzAuNDM3IDE2LjIgMzAuMzM3IDE3LjIgWiI+PC9wYXRoPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0gNTUuMzM3IDEwIEwgNTEuNjM3IDEwIEMgNTEuMjM3IDEwIDUwLjkzNyAxMC4yIDUwLjczNyAxMC41IEwgNDUuNTM3IDE4LjEgTCA0My4zMzcgMTAuOCBDIDQzLjIzNyAxMC4zIDQyLjczNyAxMCA0Mi4zMzcgMTAgTCAzOC42MzcgMTAgQyAzOC4yMzcgMTAgMzcuODM3IDEwLjQgMzguMDM3IDEwLjkgTCA0Mi4xMzcgMjMgTCAzOC4yMzcgMjguNCBDIDM3LjkzNyAyOC44IDM4LjIzNyAyOS40IDM4LjczNyAyOS40IEwgNDIuNDM3IDI5LjQgQyA0Mi44MzcgMjkuNCA0My4xMzcgMjkuMiA0My4zMzcgMjguOSBMIDU1LjgzNyAxMC45IEMgNTYuMTM3IDEwLjYgNTUuODM3IDEwIDU1LjMzNyAxMCBaIj48L3BhdGg+PHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTSA2Ny43MzcgMi44IEwgNTkuOTM3IDIuOCBDIDU5LjQzNyAyLjggNTguOTM3IDMuMiA1OC44MzcgMy43IEwgNTUuNzM3IDIzLjYgQyA1NS42MzcgMjQgNTUuOTM3IDI0LjMgNTYuMzM3IDI0LjMgTCA2MC4zMzcgMjQuMyBDIDYwLjczNyAyNC4zIDYxLjAzNyAyNCA2MS4wMzcgMjMuNyBMIDYxLjkzNyAxOCBDIDYyLjAzNyAxNy41IDYyLjQzNyAxNy4xIDYzLjAzNyAxNy4xIEwgNjUuNTM3IDE3LjEgQyA3MC42MzcgMTcuMSA3My42MzcgMTQuNiA3NC40MzcgOS43IEMgNzQuNzM3IDcuNiA3NC40MzcgNS45IDczLjQzNyA0LjcgQyA3Mi4yMzcgMy41IDcwLjMzNyAyLjggNjcuNzM3IDIuOCBaIE0gNjguNjM3IDEwLjEgQyA2OC4yMzcgMTIuOSA2Ni4wMzcgMTIuOSA2NC4wMzcgMTIuOSBMIDYyLjgzNyAxMi45IEwgNjMuNjM3IDcuNyBDIDYzLjYzNyA3LjQgNjMuOTM3IDcuMiA2NC4yMzcgNy4yIEwgNjQuNzM3IDcuMiBDIDY2LjEzNyA3LjIgNjcuNDM3IDcuMiA2OC4xMzcgOCBDIDY4LjYzNyA4LjQgNjguNzM3IDkuMSA2OC42MzcgMTAuMSBaIj48L3BhdGg+PHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTSA5MC45MzcgMTAgTCA4Ny4yMzcgMTAgQyA4Ni45MzcgMTAgODYuNjM3IDEwLjIgODYuNjM3IDEwLjUgTCA4Ni40MzcgMTEuNSBMIDg2LjEzNyAxMS4xIEMgODUuMzM3IDkuOSA4My41MzcgOS41IDgxLjczNyA5LjUgQyA3Ny42MzcgOS41IDc0LjEzNyAxMi42IDczLjQzNyAxNyBDIDczLjAzNyAxOS4yIDczLjUzNyAyMS4zIDc0LjgzNyAyMi43IEMgNzUuOTM3IDI0IDc3LjYzNyAyNC42IDc5LjUzNyAyNC42IEMgODIuODM3IDI0LjYgODQuNzM3IDIyLjUgODQuNzM3IDIyLjUgTCA4NC41MzcgMjMuNSBDIDg0LjQzNyAyMy45IDg0LjczNyAyNC4zIDg1LjEzNyAyNC4zIEwgODguNTM3IDI0LjMgQyA4OS4wMzcgMjQuMyA4OS41MzcgMjMuOSA4OS42MzcgMjMuNCBMIDkxLjYzNyAxMC42IEMgOTEuNjM3IDEwLjQgOTEuMzM3IDEwIDkwLjkzNyAxMCBaIE0gODUuNzM3IDE3LjIgQyA4NS4zMzcgMTkuMyA4My43MzcgMjAuOCA4MS41MzcgMjAuOCBDIDgwLjQzNyAyMC44IDc5LjYzNyAyMC41IDc5LjAzNyAxOS44IEMgNzguNDM3IDE5LjEgNzguMjM3IDE4LjIgNzguNDM3IDE3LjIgQyA3OC43MzcgMTUuMSA4MC41MzcgMTMuNiA4Mi42MzcgMTMuNiBDIDgzLjczNyAxMy42IDg0LjUzNyAxNCA4NS4xMzcgMTQuNiBDIDg1LjczNyAxNS4zIDg1LjkzNyAxNi4yIDg1LjczNyAxNy4yIFoiPjwvcGF0aD48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNIDk1LjMzNyAzLjMgTCA5Mi4xMzcgMjMuNiBDIDkyLjAzNyAyNCA5Mi4zMzcgMjQuMyA5Mi43MzcgMjQuMyBMIDk1LjkzNyAyNC4zIEMgOTYuNDM3IDI0LjMgOTYuOTM3IDIzLjkgOTcuMDM3IDIzLjQgTCAxMDAuMjM3IDMuNSBDIDEwMC4zMzcgMy4xIDEwMC4wMzcgMi44IDk5LjYzNyAyLjggTCA5Ni4wMzcgMi44IEMgOTUuNjM3IDIuOCA5NS40MzcgMyA5NS4zMzcgMy4zIFoiPjwvcGF0aD48L3N2Zz4" alt=""/>
                            </button>
                        </div>
                    </div>
                </div>
				<div className="bottom-section">
					{/* Bottom section content */}
					{/* ... */}
				</div>
			</div>
			<div className="footer">
				<div className="footer-top">
					<a href="https://info.lululemon.com/contact" className="footer-link" target="_blank"
					   rel="noopener noreferrer">
						Contact Us
					</a>
					<a href="/live-chat" className="footer-link" target="_blank" rel="noopener noreferrer">
						Live Chat
					</a>
					<a href="tel:+1-877-263-9300" className="footer-link">
						1.877.263.9300
					</a>
				</div>
				<div className="footer-bottom">
					<div className="copyright">
						© lululemon athletica 1818 Cornwall Ave, Vancouver BC V6J 1C7
					</div>
					<div className="legal-links">
						<a href="https://info.lululemon.com/help/shipping" target="_blank" rel="noopener noreferrer">Shipping
							Policy</a>
						<a href="https://info.lululemon.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy
							Policy (Last Updated: 1/23/23)</a>
						<a href="https://info.lululemon.com/legal/terms-of-use" target="_blank" rel="noopener noreferrer">Terms of
							Use (Last Updated: 10/5/22)</a>
						<a href="https://info.lululemon.com/legal/privacy-policy#CCPA" target="_blank" rel="noopener noreferrer">California
							Privacy Rights (Last Updated: 1/23/23)</a>
						<a href="https://info.lululemon.com/about/modern-slavery-statement" target="_blank"
						   rel="noopener noreferrer">California Transparency Act</a>
						<a href="https://info.lululemon.com/about/accessibility-statement" target="_blank"
						   rel="noopener noreferrer">Accessibility Statement</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
