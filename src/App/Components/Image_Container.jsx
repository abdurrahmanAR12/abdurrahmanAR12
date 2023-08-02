import React, { useState, useEffect, useContext } from 'react';
import { Image as Image_component } from './Image';
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from './Loader';
import { loader } from '../Context/Images';
import { api_context } from '../Context/Api';

export function Image_Container() {
    const [images, setImages] = useState({ hits: [], total: 0 });
    const [page, setPage] = useState(1);
    const [is_online, setIs_online] = useState(true);
    const [loading, setLoading] = useState(true);
    const { server_url, createRipple } = useContext(api_context);

    function get_images() {
        document.title = "Pexelseone - The best Free image Provider";
        setPage(0);
        setLoading(true);
        fetch(`${server_url}/images/category/music&${page}`)
            .then(data => data.json()).then(json => {
                setImages(json ? json : { ...images, hits: [] });
                // console.log(json)
                setLoading(false);
            }).catch(_err => {
                console.log(_err)
                setLoading(false);
                return false;
            });
    }

    function getNew_images() {
        fetch(`${server_url}/images/category/music&${(page + 1)}`).then(data => {
            return data.json();
        }).then(json => {
            setPage(page + 1);
            setImages({ ...images, hits: images.hits.concat(json.hits) });
        }).catch(_err => {
            console.error(_err)
            return setIs_online(false);
        });
    }
    useEffect(() => {
        get_images()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {loading && <Loader />}
            {/* {<Loader />} */}
            {/* {is_online && !loading && images.hits.length === 0 && <div className='image-container'>
                <div className='offline'>
                    <h2>Something went wrong, Please try again</h2>
                </div>
            </div>} */}
            {is_online ? <InfiniteScroll loader={<Loader />} endMessage={images.hits.length === 0 ? <div className='offline'>
                <h2>Something went wrong, Please try again later</h2>
            </div> : "No more Results"} next={getNew_images} hasMore={images.hits.length !== images.total} dataLength={images.hits.length}>
                {/* <h2 className='brand-name'><span>Pexeleseone </span>- Get some quality images for free </h2> */}
                <div className='image-container'>
                    {images.hits.length !== 0 &&
                        images.hits.map(image => {
                            let src = image.webformatURL;
                            // console.log(image)
                            return <Image_component userName={image.user} userPhoto={`${server_url}/images/get/${image.userImageURL}`} key={image.id} id={image.id} tags={image.tags} height={image.webformatHeight} download_link={image.largeImageURL} width={image.webformatWidth} src={src} />
                        })}
                </div>
            </InfiniteScroll> : <div className='image-container'>
                {/* <Loader /> */}
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
    );
}