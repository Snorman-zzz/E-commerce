import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faTimes, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './PopupWindow.scss';
import {Link} from "react-router-dom";

const PopupWindow = () => {
    return (
        <div className="popup-modal">
            <div className="modal-inner-wrapper">
                {/* Top Section */}
                <div className="top-section">
                    <div className="left-content">
                        <h2>You've Got Great Taste</h2>
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
                        <title id='icon_:rf:'>bagIcon</title>
                        <span className="item-count">1 Item</span>
                    </div>
                    <div className="right-content">
                        <FontAwesomeIcon icon={faTimes} className="close-icon" />
                    </div>
                </div>

                <div className="divider"></div>

                {/* Middle Section */}
                <div className="middle-section">
                    <div className="left-content">
                        <img className="product-image" src="https://images.lululemon.com/is/image/lululemon/LW5FM0S_0001_1?$add_to_bag$&wid=320&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72" alt="Product" />
                        <div className="product-info">
                            <h3>Scuba Mid-Rise Wide-Leg Pant</h3>
                            <span>Full Length</span>
                            <span>Size: 2</span>
                            <span>$128.00 USD</span>
                        </div>
                    </div>

                    <div className="right-content">
                        <div className="subtotal">
                            <span>Subtotal</span>
                            <span>$128.00 USD</span>
                        </div>
                        <Link to={`/checkout`}>
                            <button className="checkout-button">VIEW BAG & CHECKOUT</button>
                        </Link>
                        <div className="ctaLinkPrimary">
                            CONTINUE SHOPPING <FontAwesomeIcon icon={faArrowRight} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default PopupWindow;
