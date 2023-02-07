import React, {useState} from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { toast } from "react-hot-toast";
import { ReactSession } from 'react-client-session';

const Welcome = () => {
    ReactSession.setStoreType("localStorage");
    const [loggedIn, setLoggedIn] = useState(ReactSession.get('signedIn'));

    return (
            <section>
                {loggedIn && (
                <div>
                    <Navbar />
                    <div className='min-h-screen'>
                        Welcome user!
                    </div>
                    <Footer />
                </div>
                )}
                {!loggedIn && (
                    <div>
                        <span className='text-xl'>Not found!</span>
                    </div>
                )}
            </section>
        )
    
}

export default Welcome 