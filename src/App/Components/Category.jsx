import React, { useContext, useEffect, useState } from 'react'
import { Loader } from './Loader';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Image as ImageComponent } from './Image';
import { useParams } from 'react-router-dom';
import { loader } from '../Context/Images';
import { api_context } from '../Context/Api';
// import banner from "../Ads/Banner1.js";

export function Category() {
    let [images, setImages] = useState({ hits: [] }),
        [page, setPage] = useState(1),
        [is_online, setIs_online] = useState(true),
        [loading, setLoading] = useState(true),
        { createRipple, server_url } = useContext(api_context),
        params = useParams(),
        [adInd, setAdInd] = useState(0),
        [adScripts, setAdScripts] = useState([]);

    function get_images() {
        document.title = "Pexelseone - Category wise Content";
        setPage(0);
        setLoading(true);
        fetch(`${server_url}/images/category/${params.category}&${page}`)
            .then(data => data.json()).then(json => {
                // console.log(json)
                setImages(json ? json : { hits: [] });
                setLoading(false);
            }).catch(_err => {
                console.log(_err)
                setLoading(false);
                return false;
            });
    }

    function getNew_images() {
        fetch(`${server_url}/images/category/${params.category}&${(page + 1)}`).then(data => {
            return data.json();
        }).then(json => {
            // console.log(json)
            setPage(page + 1);
            setImages({ ...images, hits: images.hits.concat(json.hits) });
        }).catch(_err => {
            console.error(_err)
            return setIs_online(false);
        });
    }

    function getAdScripts() {
        fetch(`${server_url}/scripts/get_all`).then(res => res.json()).then(json => setAdScripts(json))
    }

    useEffect(() => {
        get_images();
        getAdScripts()
    }, [])

    return (
        <>
            {loading && <Loader />}
            {is_online ? <InfiniteScroll loader={<Loader />} endMessage={images.hits.length === 0 ? "No Results" : "No more Results"} next={getNew_images} hasMore={images.hits.length !== images.total} dataLength={images.hits.length}>
                {/* <h2 className='brand-name'><span>Pexeleseone </span>- Get some quality images for free </h2> */}
                <div className='image-container'>
                    {images.hits.length !== 0 &&
                        images.hits.map(image => {
                            let src = image.webformatURL;
                            if (adInd === 2) {
                                setAdInd(0)
                                let scr = document.createElement("script");
                                scr.type = "text/javascript";
                                scr.src = `${server_url}/scripts/${parseInt(Math.random() * adScripts.length)}`;
                                document.getElementById("root").appendChild(scr);
                            }
                            return <ImageComponent  userName={image.user} userPhoto={`${server_url}/images/get/${image.userImageURL}`} key={image.id} id={image.id} tags={image.tags} height={image.webformatHeight} download_link={image.largeImageURL} width={image.webformatWidth} src={src} />
                        })}
                </div>
            </InfiniteScroll > : <div className='image-container'>
                <div className='offline'>
                    <h2>Please Connect to the internet</h2>
                    <button className='btn-offline' onClick={e => {
                        createRipple(e);
                        get_images();
                    }}>{loading ? <img src={loader} alt='' /> : "Retry"}</button>
                </div>
            </div>
            }
        </>
    )
}
