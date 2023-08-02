import React, { useContext, useEffect, useState } from 'react';
import "../Styles/Auth.css";
import { api_context, token, token_string } from '../Context/Api';
import { useNavigate } from 'react-router-dom';

export function Auth({ type }) {
    let { createRipple, server_url } = useContext(api_context),
        navigate = useNavigate(),
        [values, setValues] = useState({});

    // function doAuth(type) {
    //     let url = `${server_url}/users/${type === "login" ? "login" : "new"}`,
    //         body = new FormData();
    //     for (let k in values)
    //         body.append(k, (values[k]));
    //     fetch(url, {
    //         method: "post",
    //         body
    //     }).then(res => res.json()).then(json => {
    //         console.log(json)
    //     });
    // }

    function doAuth(type) {
        let url = `${server_url}/users/${type == "login" ? "login" : "new"}`,
            body = new FormData();
        for (let k in values)
            body.append(k, values[k]);
        fetch(url, {
            method: "post",
            body
        }).then(async res => {
            let json = await res.json();
            // console.log(json)
            if (res.status === 200)
                localStorage[token_string] = json.token;
            return { json, status: res.status };
        }).then(json => {
            console.log(json)
            if (json.status === 200)
                navigate("/");
        });
    }

    let onChange = e => setValues({ ...values, [e.target.id]: e.target.value });
    useEffect(() => {
        if (token)
            navigate("/");
    }, [])
    return (
        <div className='auth'>
            <h2 className='brand-name'><span>PexelseOne </span>{type === "login" ? "Login" : "Create a new Account"}</h2>
            <div className="auth-f_s">
                <p className="brand-name">{type === "login" ? "Login" : "Create an Account"} then you can see your Profile, Download Content, Post content and make changes to your Account</p>
                {type === "login" ? <>
                    <div className='auth-f'>
                        <input type="email" onChange={onChange} id='Email' value={values.Email} placeholder='Enter your Email Address' />
                    </div>
                    <div className='auth-f'>
                        <input type="password" onChange={onChange} id='Password' value={values.Password} placeholder='Your Password here' />
                    </div>
                    <div className='auth-f'>
                        <button onClick={e => {
                            createRipple(e);
                            doAuth("login")
                        }}>Sign In</button>
                    </div>
                </> : <>
                    <div className='auth-f'>
                        <input type="text" onChange={onChange} id='Name' value={values.Name} placeholder='Enter your Username' />
                    </div>
                    <div className='auth-f'>
                        <input type="email" onChange={onChange} value={values.Email} id='Email' placeholder='Enter your Email Address' />
                    </div>
                    <div className='auth-f'>
                        <input type="password" onChange={onChange} id='Password' value={values.Password} placeholder='Your Password here' />
                    </div>
                    <div className='auth-f'>
                        <input type="number" onChange={onChange} id='Age' value={values.Age} placeholder='Your Age' />
                    </div>
                    <div className='auth-f'>
                        <input type="text" onChange={onChange} id='Gender' value={values.Gender} placeholder='Your Gender here' />
                    </div>
                    <div className='auth-f'>
                        <input type="password" onChange={onChange} id='CPassword' value={values.CPassword} placeholder='Confirm Password' />
                    </div>
                    <div className='auth-f'>
                        <button onClick={e => {
                            createRipple(e);
                            doAuth()
                        }}>Create Account</button>
                    </div>
                </>}
                <div className='auth-f' style={{ margin: "0", textAlign: "center", height: "unset" }}>
                    {type === "login" ? <><p style={{ position: "relative", border: "1px solid #ccc", overflow: "hidden", cursor: 'pointer', padding: ".5em 1em", width: "11em", borderRadius: ".4em", fontSize: ".8em" }} onClick={e => {
                        createRipple(e);
                        navigate("/signup");
                    }}>I dont have an account</p></> : <p onMouseDown={e => createRipple(e)} style={{ position: "relative", border: "1px solid #ccc", overflow: "hidden", cursor: 'pointer', padding: ".5em 1em", width: "15em", borderRadius: ".4em", fontSize: ".8em" }} onClick={e => {
                        createRipple(e);
                        navigate("/login");
                    }}>I have an Account already</p>
                    }
                </div>
            </div>
            {type === "login" ? <div style={{ height: "8em" }}><h3 className='brand-name'><span>Other ways</span> to Sign In</h3>
                <h3 className='brand-name' style={{ marginTop: "8em" }}><span>Coming Soon....</span></h3>
            </div> : <div style={{ height: "8em" }}><h3 className='brand-name'><span>Other ways</span> to Continue</h3>
                <h3 className='brand-name' style={{ marginTop: "2em" }}><span>Coming Soon....</span></h3></div>}
        </div>
    )
}
