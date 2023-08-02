import React, { useEffect } from 'react';
import { Navbar } from './Components/Navbar';
import { Image_Container as ImageContainer } from "./Components/Image_Container";

export function App() {
    // useEffect(() => {
    //     const elem = document.createElement("script");
    //     elem.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7372750867691095";
    //     elem.crossOrigin = "anonymous";
    //     document.head.appendChild(elem);
    // }, [])

    return (<><Navbar /><ImageContainer /></>);
}
