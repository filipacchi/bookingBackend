import React from 'react';

const LanguageContext = React.createContext({
  language: 'sv',
  setLanguage: () => {},
});

export default LanguageContext;
