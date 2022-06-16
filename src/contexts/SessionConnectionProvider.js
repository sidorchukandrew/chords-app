import React, {createContext, useState} from 'react';

export const SessionConnectionContext = createContext();
SessionConnectionContext.displayName = 'SessionConnectionContext';

export default function SessionConnectionProvider({children}) {
  const [activeSessionDetails, setActiveSessionDetails] = useState(() => ({
    isHost: false,
    activeSession: null,
  }));

  return (
    <SessionConnectionContext.Provider
      value={{activeSessionDetails, setActiveSessionDetails}}>
      {children}
    </SessionConnectionContext.Provider>
  );
}
