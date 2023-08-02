import React from 'react';
import "../Styles/About.css"
import { facebookIcon, instaIcon, twitterIcon, xiosLogo } from "../Context/Images";

export function About() {
    return (
        <div className='brand'>
            <div className="header">
                <div className="descriptions">
                    <h2 className='brand-name'><span>PexelseOne </span>The <span>best Image Provider</span> for free</h2>
                    <p>
                        We are going to provide the best of content to everyone whoever what he wants and can get with 10 million+ contributors and
                        photographers are here, You can get best of your hobby or activity content
                    </p>
                    <div style={{ textAlign: "center", margin: "1em 0" }}>
                        <p>Follow PexelseOne on</p>
                        <div style={{ display: 'flex', justifyContent: "center", margin: "1em 0" }}>
                            <div className='social-link'>
                                <a href="http://facebook.com/pexelseone" target="_blank" rel="noopener noreferrer">
                                    <img src={facebookIcon} alt="" />
                                </a>
                            </div>
                            <div className='social-link'>
                                <a href="http://instagram.com" target="_blank" rel="noopener noreferrer">
                                    <img src={instaIcon} alt="" />
                                </a>
                            </div>
                            <div className='social-link'>
                                <a href="http://twitter.com" target="_blank" rel="noopener noreferrer">
                                    <img src={twitterIcon} alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="descriptions">
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <h3>Powered by </h3>
                        <img className='logo' src={xiosLogo} alt="" />
                        <div style={{ fontFamily: "inter" }}>
                            <h2 style={{ fontSize: ".9em" }}>Xios </h2>
                            <p style={{ fontSize: ".7em" }}>Change will to now</p>
                        </div>
                    </div>
                    <div style={{ textAlign: "center", margin: "1em 0" }}>
                        <p>Follow us on</p>
                        <div style={{ display: 'flex', justifyContent: "center", margin: "1em 0" }}>
                            <div className='social-link'>
                                <a href="http://facebook.com/XiosTechologies" target="_blank" rel="noopener noreferrer">
                                    <img src={facebookIcon} alt="" />
                                </a>
                            </div>
                            <div className='social-link'>
                                <a href="http://instagram.com" target="_blank" rel="noopener noreferrer">
                                    <img src={instaIcon} alt="" />
                                </a>
                            </div>
                            <div className='social-link'>
                                <a href="http://twitter.com" target="_blank" rel="noopener noreferrer">
                                    <img src={twitterIcon} alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer">

                </div>
            </div>
        </div>
    )
}
