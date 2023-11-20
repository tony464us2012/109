import React from 'react'
import { CardElement } from "@stripe/react-stripe-js";

const CARD_ELEMENT_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "rgb(240, 57, 122)",
        color: "green",
        fontSize: "12px",
        fontFamily: '"Open Sans", sans-serif',
        fontSmoothing: "antialiased",
        "::placeholder": {
          color: "#CFD7DF"
        }
      },
      invalid: {
        color: "#e5424d",
        ":focus": {
          color: "#303238"
        }
      }
    }
  };

const CardSection = () => {
    return (
        <CardElement options={CARD_ELEMENT_OPTIONS} />
    )
}

export default CardSection
