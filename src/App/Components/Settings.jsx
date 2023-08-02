import React, { useEffect } from 'react'
import { hand } from '../Context/Images'
import { useNavigate } from 'react-router-dom';
import { token } from '../Context/Api';

export function Settings() {
    let navigate = useNavigate()
    useEffect(() => {
        if (!token)
            navigate("/");
    }, [])

    return (
        <div>
            <div className='descriptions' style={{ margin: "10em auto", textAlign: "center" }}>
                <h1 className='brand-name'><span>Processing up Some of your Information</span></h1>
                <h2 className='brand-name'>Please <span>Check back later</span></h2>
                <img src={hand} alt="" />
            </div>
        </div>
    )
}
