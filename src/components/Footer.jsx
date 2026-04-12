import React from 'react'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <style>{`
        .salon-footer {
          background-color: #1a1a18;
          position: relative;
          overflow: hidden;
        }

        .salon-footer::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.4;
          pointer-events: none;
        }

        .footer-rule {
          border: none;
          height: 1px;
          background: linear-gradient(to right, transparent, #c9a96e, transparent);
          opacity: 0.5;
          margin: 0;
        }

        .footer-brand {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(1.4rem, 4vw, 2rem);
          letter-spacing: 0.1em;
          color: #f5f0e8;
        }

        .footer-tagline {
          font-size: 0.7rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #c9a96e;
        }

        .footer-heading {
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #c9a96e;
          margin-bottom: 1rem;
        }

        .footer-link {
          display: block;
          color: #a09e99;
          text-decoration: none;
          font-size: 0.88rem;
          font-weight: 300;
          margin-bottom: 0.5rem;
          transition: color 0.2s;
        }

        .footer-link:hover {
          color: #f5f0e8;
        }

        .footer-text {
          color: #a09e99;
          font-size: 0.88rem;
          font-weight: 300;
          line-height: 1.7;
          margin: 0;
        }

        .footer-bottom {
          color: #5a5a56;
          font-size: 0.75rem;
          font-weight: 300;
          letter-spacing: 0.05em;
        }
      `}</style>

      <footer className="salon-footer mt-auto">

        <hr className="footer-rule" />

        <div className="container position-relative py-5">
          <div className="row gy-5">

            <div className="col-12 col-md-4">
              <h2 className="footer-brand mb-3">Glam Beauty Salon</h2>
              <p className="footer-text">
                Where every visit is a moment of self-care. We are passionate about helping you look and feel your very best.
              </p>
            </div>

            <div className="col-6 col-md-2 offset-md-1">
              <p className="footer-heading">Hours</p>
              <p className="footer-text mb-1">Mon – Fri</p>
              <p className="footer-text mb-3" style={{ color: '#f5f0e8' }}>9:00 – 19:00</p>
              <p className="footer-text mb-1">Saturday</p>
              <p className="footer-text mb-3" style={{ color: '#f5f0e8' }}>10:00 – 17:00</p>
              <p className="footer-text mb-1">Sunday</p>
              <p className="footer-text" style={{ color: '#5a5a56' }}>Closed</p>
            </div>

            <div className="col-6 col-md-2">
              <p className="footer-heading">Contact</p>
              <a href="tel:+16041234567" className="footer-link">+1 (604) 123-4567</a>
              <a href="mailto:hello@glambeauty.ca" className="footer-link">hello@glambeauty.ca</a>
              <p className="footer-text mt-3">
                123 Beauty Lane<br />
                Vancouver, BC<br />
                V6B 1A1
              </p>
            </div>

            <div className="col-6 col-md-2">
              <p className="footer-heading">Quick Links</p>
              <a href="/" className="footer-link">Book Now</a>
              <a href="#" className="footer-link">Our Services</a>
            </div>

          </div>
        </div>

        <hr className="footer-rule" />

        <div className="container position-relative py-3">
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
            <p className="footer-bottom mb-0">
              © {currentYear} Glam Beauty Salon. All rights reserved.
            </p>
            <p className="footer-bottom mb-0">
              Privacy Policy · Terms of Service
            </p>
          </div>
        </div>

      </footer>
    </>
  )
}

export default Footer