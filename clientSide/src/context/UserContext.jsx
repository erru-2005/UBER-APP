import React, { useState } from 'react'

export const userDataProvider=React.createContext();

function UserContext({children}) {
    const [data, setData] = useState(null);
  return (
    <userDataProvider.Provider value={{data, setData}}>
        {children}
    </userDataProvider.Provider>
  )
}

export default UserContext