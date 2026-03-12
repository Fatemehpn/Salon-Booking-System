import React from "react";

function Header(){

      const salonName = "Glam Beauty Salon";

      return(
            <div className="header-wrapper">
                  <h1>{salonName}</h1>
                  <p>Welcome to booking app</p>
            </div>
      )
}

export default Header;