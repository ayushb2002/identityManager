import React, {useState, useLayoutEffect} from 'react';
import {ReactSession} from 'react-client-session';
import { lastIDVerified, saveIDCard } from '../blockchain/interact';
import { toast } from 'react-hot-toast';
import Weebcam from './Webcam';
const IDVerification = () => {
    const [verified, setVerified] = useState(0);
    const [image,setImage] = React.useState(null);
    useLayoutEffect(() => {
      (async () => {
        try
        {
            var latest = await lastIDVerified(ReactSession.get('adhaar'));
            if(!latest)
                setVerified(-1);
            else
            {
                var date = new Date(1970, 0, 1);
                date.setSeconds(latest);
                var today = new Date();
                var Difference_In_Time = date.getTime() - today.getTime();
                var Difference_In_Days = parseInt(Difference_In_Time / (1000 * 3600 * 24));
                setVerified(Difference_In_Days);
            }
        }
        catch(err)
        {
            console.log(err);
            setVerified(-1);
        }
      })();
    }, [])

    const verifyID = async () => {
        // Link with Python API 
        var result = true;
        if(result)
        {
            var saved = await saveIDCard(ReactSession.get('adhaar'));
            if(saved)
            {
                toast.success('ID Card Verification Successful!');
                setTimeout(() => {
                    window.location.href = '/profile';
                }, 1000);
            }
            else
            {
                toast.error('ID Card Verification Failed');
                setTimeout(() => {
                    window.location.href = '/profile';
                }, 2000);
            }
        }
        else
        {
            toast.error('ID Card Verification Failed');
            setTimeout(() => {
                window.location.href = '/profile';
            }, 1000);
        }
    }

  return (
    <div className='w-100 flex flex-col min-h-[70vh]'>
        <span className='text-2xl text-center p-5'>Identity Card Verification</span>
        {verified > 0 && (
            <>
            <progress className="progress progress-warning w-100 my-5" value={verified} max="365"></progress>
            <span> {verified} days remaining before next verification.</span>
            </>
        )}
        {verified <= 0 && (
            <>
            <p className='px-10'>Identity card verification pending! Complete this to enable usage of identity across platforms.</p>
            <button type='button' className='btn btn-primary w-[20vw] mx-auto m-5' onClick={verifyID}>Start ID verification</button>
            </>
        )}
        <Weebcam image={image} setImage={setImage}/>
    </div>
  )
}

export default IDVerification   