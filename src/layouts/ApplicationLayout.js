import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';

const ApplicationLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="main-container">
        {children}
      </div>
      <style jsx>{`
        .main-container {
          margin: 40px;
        }
      `}</style>`
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style>
    </div>
  );
};

ApplicationLayout.propTypes = {
  children: PropTypes.object,
};

export default ApplicationLayout;
