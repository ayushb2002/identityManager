import React, { useState, useLayoutEffect } from 'react';
import { ReactSession } from "react-client-session";

const Index = () => {
  return (
    <div className='grid grid-col-1'>
        <div className='text-center p-5'>
            <span className='text-3xl font-bold'>
                Introduction
            </span>
        </div>
        <div className='px-10 flex flex-col'>
            <p>
                Welcome to the developer section! In order to make this online world a safer place, we have built a gatekeeper, to keep out the frauds.
                This API has been built for the developers and business platforms to replace their traditional Web2.0 authentication systems with our new 
                and safer Web3.0 based security system. Our system is based on safety standards of blockchain and thus are unbreachable. We hope you use it
                wisely! Happy coding :)
            </p>
            <br />
            <span className='text-xl font-bold'>To get started with our API, register as a business platform!</span>
            <br />
            <span className='text-sm'>It is in best practices that the business owner link their identity to the registration key!</span>
            <br />
            <a href="/business"><button className='btn btn-success w-56'>Register here!</button></a>
        </div>
    </div>
  )
}

export default Index