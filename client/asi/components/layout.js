import React from "react"
import PropTypes from "prop-types"
import Navbar from "./navbar"
// import "../styles/styles.css"
// import Footer from "./footer"
// import ContactStrip from "./contactSection"

const Layout = ({ children }) => {

  return (
    <>
    <div className = "container">
      <Navbar />
      <main>{children}</main>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout