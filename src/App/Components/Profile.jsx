import React, { useEffect } from 'react'
import { hand } from '../Context/Images'
import { token } from '../Context/Api'
import { useNavigate } from 'react-router-dom'

export function Profile() {
    let navigate = useNavigate()
    useEffect(() => {
        if (!token)
            navigate("/");
    }, [])


    return (
        <div className='descriptions' style={{ margin: "10em auto", textAlign: "center" }}>
            <h1 className='brand-name'><span>Processing up Some of your Information</span></h1>
            <h2 className='brand-name'>Please <span>Check back later</span></h2>
            <img src={hand} alt="" />
        </div>
    )
}
