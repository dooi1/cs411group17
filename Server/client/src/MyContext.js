// MyContext.js
import { createContext, useState } from 'react';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [value, setValue] = useState(/* your initial context value */);

  return (
    <MyContext.Provider value={{ basename: value }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
