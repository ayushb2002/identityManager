import React, { useState, useLayoutEffect } from "react";
import { ReactSession } from "react-client-session";
import { toast } from "react-hot-toast";
import { deactivate } from "../blockchain/interact";

const Deactivate = () => {
  const [adhaar, setAdhaar] = useState(ReactSession.get("adhaar"));

  const removeId = async () => {
    const status = await deactivate(adhaar);
    if(status)
    {
      toast.success('Your identity has been deactivated!');
      setTimeout(() => {
        window.location.href = '/logout';
      }, 2000);
    }
    else
    {
      toast.error('Failed to deactivate your identity!');
      setTimeout(() => {
        window.location.href = '/profile';
      }, 1000);
    }
  }

  return (
    <div className="min-h-[70vh]">
      <div className="my-5 mx-auto">
        <span className="text-3xl">Deactivate Identity</span>
      </div>
      <div className="my-5 mx-auto">
        <div className="form-group grid grid-cols-1">
          <label className="label my-2">
            <span className="label-text">Are you sure you want to deactivate your identity?</span>
          </label>
          <button type="button" className="btn btn-warning" onClick={removeId}>Deactivate</button>
          <label className="label my-2">
            <span className="label-text-alt font-bold">Note: This is an irreversible action!</span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default Deactivate