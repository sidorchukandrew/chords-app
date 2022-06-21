import React, {createContext, useState} from 'react';

export const SessionConnectionContext = createContext();
SessionConnectionContext.displayName = 'SessionConnectionContext';

export default function SessionConnectionProvider({children}) {
  const [activeSession, setActiveSession] = useState(null);
  const [hostedSession, setHostedSession] = useState(null);

  return (
    <SessionConnectionContext.Provider
      value={{
        activeSession,
        setActiveSession,
        hostedSession,
        setHostedSession,
      }}>
      {children}
    </SessionConnectionContext.Provider>
  );
}
