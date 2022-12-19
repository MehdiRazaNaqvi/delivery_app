


import { useEffect, useState } from "react"

import axios from "axios"


import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { api_url, headers } from "../config/api";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../css/stripe.css"
import { Form, Input, FormGroup, FormFeedback, Button } from "reactstrap";


const stripePromise = loadStripe('pk_test_51MGSPSBHamWcZVuTui3e90m1gqmNDh5SPcIkfLqPcJIoGRSBwuAT1hj54pjD5xsA8HbL4jr3DSLhM5Biay2ZjBbK00s3YcMsCM');

const Wrapper = (props) => (
    <Elements stripe={stripePromise}>
        <App />
    </Elements>
);




const App = () => {




    const stripe = useStripe();
    const elements = useElements();








    // const element = useElements()


    const [userSecret, setUserSecret] = useState('')
    const [total, set_total] = useState(10000)





    useEffect(() => {




        state.currentUser?.cart?.map(v => set_total(parseInt(v.price) + total))

        console.log(total)








    }, [3])








    const CARD_OPTIONS = {
        iconStyle: "solid",

        style: {

            base: {
                color: "black",
                fontWeight: 500,

                fontSize: "16px"
            },

            invalid: {
                iconColor: 'red',
                color: "red"
            }

        }


    }

    const state = useSelector(state => state.counter)


    const Confirm_Transaction = async () => {
        await stripe.confirmCardPayment(userSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        })
            .then(r => toast.success(`Paid ${r.paymentIntent.amount} ${r.paymentIntent.currency}`))
            .catch(e => console.log(e))

    }






    const fetchClientSecret = async () => {

        axios.post(`${api_url}/payment`, {

            amount: total
        }, headers)

            .then(r => setUserSecret(r.data.clientSecret))
            .catch(e => console.log(e))


        // setUserSecret(data.data.fetchClientSecret)
    }


    fetchClientSecret()






    return (
        <div className="payment_form">


            {/* <Form className="payment_form_base">
                <FormGroup className="payment_form_group">

                    <label className="payment_label">Name</label>
                    <Input className="payment_input" placeholder="Enter your name" type="text" />

                    <FormFeedback invalid className="form_feedback_signup_page">
                        No special characters / numbers are allowed in Name
                    </FormFeedback>

                </FormGroup>


            </Form> */}

            <fieldset>
                <div>
                    <CardElement options={CARD_OPTIONS} />
                </div>
            </fieldset>

            {/* <Button color="success" onClick={() => Confirm_Transaction()}>CONFIRM PAYMENT</Button> */}
        </div>
    )
}


export default Wrapper
