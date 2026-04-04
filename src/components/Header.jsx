import React from "react";
import '../css/header.css'

function Header() {
  const salonName = "Glam Beauty Salon";

  return (
    <>

      <header className="salon-header py-4 py-md-5 mb-4 mb-md-5">
        <div className="container position-relative">
          <div className="text-center">

            <p className="salon-tagline mb-3">Online Booking</p>

            <hr className="header-rule" />

            <h1 className="salon-name">{salonName}</h1>

            <hr className="header-rule" />

            <p className="salon-tagline mt-3">Where beauty meets elegance</p>

          </div>
        </div>
      </header>
    </>
  );
}

export default Header;