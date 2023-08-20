import React, {useEffect} from "react";
// import {PaymentSuccess} from "../../redux/action/paymentAction";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
// import {Window} from "@mui/icons-material";
export const Payment = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    useEffect(() => {
        // Load the PayPal SDK dynamically
        const script = document.createElement("script");
        script.src = "https://www.paypalobjects.com/api/checkout.js";
        script.async = true;
        script.onload = () => {
            // PayPal SDK has loaded, initialize PayPal integration
            window.PAYPAL.Button.render(paypalIntegrate(window.PAYPAL, () => {}), '#paypal-button');
        };
        document.body.appendChild(script);

        return () => {
            // Clean up: remove the PayPal SDK script when the component is unmounted
            document.body.removeChild(script);
        };
    }, []);
    const paypalIntegrate = (paypal, PaymentSuccess) => {
        return {
            // Configure environment
            env: 'sandbox',
            client: {
                sandbox: 'AT00CBFees-dWFZkvRZIdRoC-HcSBflw-Bi2e7S1Y1mCGOlY46BUkBEOTElGDUFwfPEuyy9afsitY7xF',
                production: 'AWy7L0BwPpJU1qoh9hNZiR9-sadMHUpnOhlRbTw9ha-4LOhB9y4biARxSpBnk1KjbaXEHCnv1pBhumgI'
            },
            // Customize button (optional)
            locale: 'en_US',
            style: {
                size: 'medium',
                color: 'white',
                shape: 'pill',
                // layout: 'vertical',
                fundingicons: 'true',
            },
            funding: {
                allowed: [paypal.FUNDING.CARD],
                disallowed: [paypal.FUNDING.CREDIT]
            },

            // Enable Pay Now checkout flow (optional)
            commit: true,

            // Set up a payment
            payment: (data, actions) => {
                return actions.payment.create({
                    transactions: [{
                        amount: {
                            total: '0.36',
                            currency: 'USD',
                            details: {
                                subtotal: '0.30',
                                tax: '0.03',
                                shipping: '0.02',
                                handling_fee: '1.00',
                                shipping_discount: '-1.00',
                                insurance: '0.01'
                            }
                        },
                        description: 'Mark2win Full Stack Developer Bootcamp Ultimate version',
                        custom: '90048630024435',
                        //invoice_number: '12345', Insert a unique invoice number
                        payment_options: {
                            allowed_payment_method: 'INSTANT_FUNDING_SOURCE'
                        },
                        soft_descriptor: 'ECHI5786786',
                        item_list: {
                            items: [
                                {
                                    name: 'React',
                                    description: 'React-from scratch to master',
                                    quantity: '2',
                                    price: '0.10',
                                    tax: '0.01',
                                    sku: '1',
                                    currency: 'USD'
                                },
                                {
                                    name: '',
                                    description: 'Front end developer.',
                                    quantity: '1',
                                    price: '0.10',
                                    tax: '0.01',
                                    sku: 'product34',
                                    currency: 'USD'
                                }],
                            shipping_address: {
                                recipient_name: 'Mark Xu',
                                line1: '50 Acadia Ave, Markham, ON L3R 0B3',
                                line2: 'Unit #200',
                                city: 'Toronto',
                                country_code: 'CA',
                                postal_code: 'L3R 0B3',
                                phone: '6474017219',
                                state: 'Ontario'
                            }
                        }
                    }],
                    note_to_payer: 'Contact us markxu@mark2win.com for any questions on your order.'
                });
            },
            // Execute the payment
            onAuthorize: (data, actions) => {
                return actions.payment.execute().then(function (res) {
                    // Show a confirmation message to the buyer
                    // call your action to tackle after payment process
                    console.log('payment returned results', res);
                    window.alert('payment success');
                    clearCookies();
                    navigate('/thank-you');

                    // dispatch(PaymentSuccess()) // call my PaymentSucess action
                });
            }

        }
    }
    const clearCookies = () => {
        document.cookie = 'shopping_cart_info=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        // Add any other cookies you want to clear
    };

    return (
        <div id="paypal-button">
            {/*<Link to="/thank-you"><ThankYou/></Link>*/}
        </div>
    )


}

export default Payment