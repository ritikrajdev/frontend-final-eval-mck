import PropTypes from 'prop-types';
import React, { createContext } from 'react';

export const ContentContext = createContext([]);

export default function ContentContextProvider({ children }) {
  const [content, setContent] = React.useState(null);

  return (
    <ContentContext.Provider value={[content, setContent]}>
      {children}
    </ContentContext.Provider>
  );
}

ContentContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
