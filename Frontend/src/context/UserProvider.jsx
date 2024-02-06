import React, { useEffect, useState } from 'react'
import userContext from './userContext'
function UserProvider({children}) {
    // Load user data from localStorage on component mount
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : { data: {}, login: false };
  });

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);
    
  return (
    <userContext.Provider value = {{user,setUser}}>
        {children}
    </userContext.Provider>
  )
}

export default UserProvider