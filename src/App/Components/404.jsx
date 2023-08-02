import React, { useEffect } from 'react'
import { oops } from '../Context/Images'
import { useNavigate } from 'react-router-dom'

export function _404() {
    let navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate("/");
        }, 2000);
    }, [])

    return (
        <div className='descriptions' style={{ margin: "10em auto", textAlign: "center" }}>
            <h1 className='brand-name'><span>Sorry </span> Not Found</h1>
            <h2 className='brand-name'><span>Something went wrong</span> This might not exists</h2>
            <h2 className='brand-name'>Please wait <span>while we redirect...</span></h2>
            <img src={oops} alt="" />
        </div>
    )
}
