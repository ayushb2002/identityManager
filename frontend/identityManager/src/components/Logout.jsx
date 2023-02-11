import { React, useLayoutEffect } from 'react'
import { ReactSession } from 'react-client-session';

const Logout = () => {
    ReactSession.setStoreType("localStorage");
    useLayoutEffect(() => {
      ReactSession.set('signedIn', false);
      ReactSession.set('adhaar', '');
      window.location.href = '/login';
    }, []);
    
  return (
    <div>Logout</div>
  )
}

export default Logout