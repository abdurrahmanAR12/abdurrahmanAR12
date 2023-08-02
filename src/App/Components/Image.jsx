import React, { useContext, useState } from 'react'
import { loader } from '../Context/Images';
// import { Link } from 'react-router-dom';
import { api_context } from '../Context/Api';

export function Image({ id, src = "", tags, download_link = "", userName, userPhoto }) {
    const [donwloading_image, setDonwloadingImage] = useState({ not_started: true });
    const { setSval, createRipple, server_url } = useContext(api_context);

    async function downloadImage() {
        const link = document.createElement("a");
        setDonwloadingImage({ progress: true });
        // console.log(download_link)
        const res = await fetch(`${server_url}/images/get/${download_link}`).then(res => {
            return res.blob();
        }).catch(_err => {
            setDonwloadingImage({ failed: true });
            return false;
        });
        if (!res)
            return;

        const blob = new Blob([res]);
        const href = URL.createObjectURL(blob);
        link.download = id + ".png";
        link.href = href;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setDonwloadingImage({ done: true });
    }

    return (
        <div className='image'>
            <div className="user">
                <img src={userPhoto} alt="" />
                <h2>{userName}</h2>
            </div>
            <img src={src} alt="" className='main-image' />
            <div className='properties'>
                <div className="">
                    <button className='download' onClick={e => {
                        createRipple(e);
                        downloadImage();
                    }}>
                        {donwloading_image.done &&
                            <svg xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 512">
                                <path fill="#3AAF3C" d="M256 0c141.39 0 256 114.61 256 256S397.39 512 256 512 0 397.39 0 256 114.61 0 256 0z" />
                                <path fill="#0DA10D" fillRule="nonzero" d="M391.27 143.23h19.23c-81.87 90.92-145.34 165.89-202.18 275.52-29.59-63.26-55.96-106.93-114.96-147.42l22.03-4.98c44.09 36.07 67.31 76.16 92.93 130.95 52.31-100.9 110.24-172.44 182.95-254.07z" />
                                <path fill="#fff" fillRule="nonzero" d="M158.04 235.26c19.67 11.33 32.46 20.75 47.71 37.55 39.53-63.63 82.44-98.89 138.24-148.93l5.45-2.11h61.06c-81.87 90.93-145.34 165.9-202.18 275.53-29.59-63.26-55.96-106.93-114.96-147.43l64.68-14.61z" />
                            </svg>
                        }
                        {donwloading_image.progress && <img src={loader} alt='' />}
                        {donwloading_image.not_started &&
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                                <g id="Layer_2" data-name="Layer 2">
                                    <g id="Download">
                                        <path className="cls-1" d="M47.5 33a2.5 2.5 0 0 0-2.5 2.5v7.75A1.76 1.76 0 0 1 43.25 45H6.75A1.76 1.76 0 0 1 5 43.25V35.5a2.5 2.5 0 0 0-5 0v7.75A6.75 6.75 0 0 0 6.75 50h36.5A6.75 6.75 0 0 0 50 43.25V35.5a2.5 2.5 0 0 0-2.5-2.5z" id="id_101"></path><path className="cls-1" d="M23.11 38.2l.08.26.13.23a1.86 1.86 0 0 0 .1.2 2.52 2.52 0 0 0 .69.69l.2.1.23.13.26.08.2.11a2.69 2.69 0 0 0 1 0l.21-.06.26-.08.23-.13.2-.1a3.68 3.68 0 0 0 .38-.31l9.19-9.19a2.5 2.5 0 0 0-3.54-3.54L28 31.46V2.5a2.5 2.5 0 0 0-5 0v35a2.72 2.72 0 0 0 .05.49 1.66 1.66 0 0 0 .06.21z" id="id_102" >
                                        </path>
                                        <rect className="cls-2" x="13.82" y="24.73" width="5" height="11.17" rx="2.5" ry="2.5" transform="rotate(-45 16.32 30.32)" id="id_103"></rect>
                                    </g>
                                </g>
                            </svg>
                        }{
                            donwloading_image.failed &&
                            <svg xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 512">
                                <path fill-rule="evenodd" clip-rule="evenodd" fill="#FF4141" d="M61.44,0c33.933,0,61.439,27.507,61.439,61.439 s-27.506,61.439-61.439,61.439C27.507,122.879,0,95.372,0,61.439S27.507,0,61.44,0L61.44,0z M73.451,39.151 c2.75-2.793,7.221-2.805,9.986-0.027c2.764,2.776,2.775,7.292,0.027,10.083L71.4,61.445l12.076,12.249 c2.729,2.77,2.689,7.257-0.08,10.022c-2.773,2.765-7.23,2.758-9.955-0.013L61.446,71.54L49.428,83.728 c-2.75,2.793-7.22,2.805-9.986,0.027c-2.763-2.776-2.776-7.293-0.027-10.084L51.48,61.434L39.403,49.185 c-2.728-2.769-2.689-7.256,0.082-10.022c2.772-2.765,7.229-2.758,9.953,0.013l11.997,12.165L73.451,39.151L73.451,39.151z" />
                            </svg>
                        }
                        Download
                    </button>
                    <div className="mx-1">
                        {tags ? "Tags: " : ""}{tags ? tags.split(",").map(tag => {
                            function s(e) {
                                setSval(tag.trim());
                                createRipple(e);
                                document.getElementById("to_slash").click();
                                setTimeout(() => document.getElementById("to_search").click(), 500)
                            }
                            return <button key={tag + Date.now()} className='tag' onClick={s}>{tag}</button>
                        }) : ""}</div>
                </div>
            </div>
        </div >
    );
}
