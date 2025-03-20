import React from 'react';

// Functional component to display the header
const Header = ({ title }) => {
  return (
    <header>
      <h1>{title}</h1> {/* Display the title dynamically */}
    </header>
  );
};

export default Header;
