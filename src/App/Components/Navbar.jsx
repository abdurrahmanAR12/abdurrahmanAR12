import React, { useContext, useEffect, useState } from 'react';
import { api_context, token, token_string } from '../Context/Api';
import { useNavigate } from 'react-router-dom';
import ContentLoader from 'react-content-loader';
import { userIcon } from '../Context/Images';
// import remix from "@remix-run/router"

export function Navbar() {
    let { createRipple, s_val, onChange } = useContext(api_context),
        [showDrop, setShowDrop] = useState(false),
        [showProfile, setShowProfile] = useState(false),
        [dropDownPositions, setDropDownPositions] = useState({ profile: 0, cat: 0 });
    let navigate = useNavigate();
    useEffect(() => {
        document.addEventListener("scroll", () => {
            setShowDrop(false);
            showProfile(false);
        });
    })
    return (
        <>{showDrop && <DropDown top={dropDownPositions.cat} left={"8em"} />}
            {showProfile && <ProfileDropDown top={dropDownPositions.profile} left={"8em"} />}
            <div className='navbar'>
                {/* <div className="left"> */}
                <div className="nav-icons-buttons">
                    <button className='nav-icon' onClick={e => {
                        createRipple(e);
                        navigate("/")
                    }}>
                        <h2 className='c-white'><span>PexelseOne </span></h2>
                    </button>
                    <button className='nav-icon-sm' onClick={e => {
                        createRipple(e);
                        navigate("/")
                    }}>
                        <p className='c-white'><span>For You</span></p>
                    </button>
                    <button className='nav-icon-sm' onClick={e => {
                        createRipple(e);
                        setShowDrop(!showDrop);
                        setDropDownPositions({ ...dropDownPositions, cat: e.clientY + 40 })
                    }}>
                        <p className='c-white'><span>Categories</span></p>
                    </button>
                    <button className='nav-icon-sm' onClick={e => {
                        createRipple(e);
                        navigate("/about")
                    }}>
                        <p className='c-white'><span>About Us</span></p>
                    </button>
                </div>
                <div className='nav-icons'>
                    <form className='search-nav' onSubmit={e => {
                        e.preventDefault();
                        navigate("/")
                        setTimeout(() => navigate(`/search/${s_val}`), 500)
                    }}>
                        <input type="search" value={s_val} onChange={onChange} spellCheck={false} placeholder='Search here' />
                        <button type='submit' onClick={createRipple}>Search</button>
                    </form>
                    {/* </div> */}
                    <div className="profile-pic">
                        <div className="round" onClick={_e => {
                            setShowProfile(!showProfile);
                            createRipple(_e);
                            setDropDownPositions({ ...dropDownPositions, profile: _e.clientY + 40 })
                        }}>
                            <img src={userIcon} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


function DropDown({ top }) {
    let [cats, setCats] = useState([]),
        { server_url, createRipple } = useContext(api_context),
        [loader, setLoader] = useState(false),
        navigate = useNavigate();

    function getCats() {
        let url = `${server_url}/images/categories`;
        setLoader(true)
        fetch(url).then(res => res.json()).then(json => { setLoader(false); setCats(json) }).catch(e => console.log(e));
    }

    useEffect(() => {
        getCats()
    }, []);

    return <>
        <div className={'dropdown'} style={{ top }}>
            <div style={{ textAlign: "center", borderBottom: "1px solid #ccc", paddingTop: ".2em", paddingBottom: "1em" }}>
                Categories
            </div>
            <div className="options">
                {cats.map(cat => {
                    return <div key={cat} className='option' onClick={e => {
                        createRipple(e);
                        navigate(`/`, { preventScrollReset: true })
                        setTimeout(() => {
                            navigate(`/category/${cat}`, { preventScrollReset: true })
                        }, 100);
                    }}>
                        <p>{cat}</p>
                    </div>
                })}
                {loader && <ContentLoader backgroundColor='#d8dcdf' speed={3} gradientRatio={2} animate foregroundColor='#e3e5e7' height={"200px"} width={"95%"}>
                    <rect x={25} y={0} rx={5} ry={5} width={"60%"} height={"40px"} />
                    <rect x={25} y={50} rx={5} ry={5} width={"60%"} height={"40px"} />
                    <rect x={25} y={100} rx={5} ry={5} width={"60%"} height={"40px"} />
                    <rect x={25} y={150} rx={5} ry={5} width={"60%"} height={"40px"} />
                </ContentLoader>
                }
            </div>
        </div>
    </>
}

function ProfileDropDown({ top }) {
    let { userInfo, createRipple } = useContext(api_context),
        navigate = useNavigate();

    return <>
        <div className={'dropdown-profile'} style={{ top }}>
            <div style={{ textAlign: "center", borderBottom: "1px solid #ccc", paddingTop: ".2em", paddingBottom: "1em" }}>
                Preferences - {userInfo ? userInfo.Name : ""}
            </div>
            <div className="options">
                {token && <div className='option' onClick={e => {
                    createRipple(e)
                    navigate("/my_profile")
                }}>
                    <p>My Profile</p>
                </div>}
                <div className='option' onClick={e => {
                    createRipple(e);
                    navigate("/privacy_policy")
                }}>
                    <p>Privacy Policy</p>
                </div>
                {token && <div className='option' onClick={e => {
                    createRipple(e)
                    navigate("/settings")
                }}>
                    <p>Settings</p>
                </div>}
                {!token && <><div className='option' onClick={e => {
                    createRipple(e);
                    navigate("/login")
                }}>
                    <p>Login</p>
                </div>
                    <div className='option' onClick={e => {
                        createRipple(e)
                        navigate("/signup")
                    }}>
                        <p>Signup</p>
                    </div>
                </>}
                {token && <div className='option' onClick={e => {
                    createRipple(e);
                    localStorage.removeItem(token_string);
                    window.location.reload()
                }}>
                    <p>Logout</p>
                </div>}
            </div>
        </div >
    </>
}