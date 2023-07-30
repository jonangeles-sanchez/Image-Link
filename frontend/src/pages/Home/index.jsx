import React from "react";
import { Link } from "react-router-dom";

function Index() {
  return (
    <>
      <div className="home-container">
        <div className="logo">ImageLink</div>
        <div className="welcome-text">
          The best way to share your best moments across any device
        </div>
        <div className="home-buttons">
          <Link to="/newimagelink" className="home-button">
            New Collection
          </Link>
          <Link to="/login" className="home-button">
            Login
          </Link>
          <Link to="/" className="home-button">
            Pricing (Coming Soon)
          </Link>
        </div>

        <div className="features">
          <div className="feature">
            <div className="feature-icon">📸</div>
            <div className="feature-title">Capture Moments</div>
            <div className="feature-description">
              Easily capture and store your precious moments with ImageLink.
            </div>
          </div>

          <div className="feature">
            <div className="feature-icon">💻</div>
            <div className="feature-title">Cross-Device Access</div>
            <div className="feature-description">
              Access your images from any device, anytime, and anywhere.
            </div>
          </div>

          <div className="feature">
            <div className="feature-icon">🚀</div>
            <div className="feature-title">Fast and Secure</div>
            <div className="feature-description">
              Experience fast and secure image hosting and sharing with
              ImageLink.
            </div>
          </div>
        </div>
      </div>

      {/* How to use ImageLink Section */}
      <section className="how-to-use-section">
        <div className="how-to-use-card">
          <div className="how-to-use-content">
            <h2>How to use ImageLink:</h2>
            <ol>
              <li>
                <strong>Sign Up:</strong> Create an account to start uploading
                your images.
              </li>
              <li>
                <strong>Create ImageLink:</strong> Click on "New Collection" to
                create and customize your image collection.
              </li>
              <li>
                <strong>View:</strong> Once your Collection is ready, click on
                "View Collections" to view your incredible collection of
                memories.
              </li>
              <li>
                <strong>Share: </strong>
                Choose your collection and click on "Create ImageLink" and
                easily share your ImageLink with friends and family.
              </li>
              <li>
                <strong>View Shared: </strong>
                Direct yourself to the shared ImageLink or paste the URL's code
                into the code bar above to view the shared ImageLink.
              </li>
            </ol>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        &copy; 2023 ImageLink. All rights reserved.
      </footer>
    </>
  );
}

export default Index;
