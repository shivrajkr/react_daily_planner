import React from 'react';

// Functional component to display the footer
const Footer = ({ length }) => {
  return (
    <footer>
      {/* Display the number of items dynamically with correct singular/plural form */}
      {length} List {length === 1 ? "item" : "items"}
    </footer>
  );
};

export default Footer;
