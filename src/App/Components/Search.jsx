import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Navbar } from './Navbar';
import { api_context, token } from '../Context/Api';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from './Loader';
import { Image as ImageComponent } from './Image';

export function Search() {
    let params = useParams(),
        [images, setImages] = useState({ hits: [] }),
        [page, setPage] = useState(1),
        [is_online, setIs_online] = useState(true),
        [loading, setLoading] = useState(0),
        { server_url, s_val, createRipple, setSval } = useContext(api_context),
        navigate = useNavigate();

    useEffect(() => {
        // validate_api_key();
        // console.log(params)
        if (params.keyword.includes("/") || params.keyword.includes("\\")) {
            let key = params.keyword.replace(/[/]/g);
            key = key.replace(/[\\]/);
            setSval(key);
            navigate("/");
            setTimeout(() => {
                navigate(`/search/${key}`)
            }, 100);
        }
        setSval((params.keyword));
        search_images();
    }, []);

    async function search_images() {
        setLoading(true)
        document.title = `Pexelseone | Search, ${params.keyword}`;
        let body = new FormData;
        body.append("key", s_val);
        body.append("page", 1);
        body.append("category", "People");
        body.append("response_group", "image_details");
        body.append("order", "latest");
        await fetch(`${server_url}/images/search`, {
            method: "post",
            headers: token ? { "token": token ? token : null } : {},
            body
        }).then(async data => {
            return { status: data.status, json: await data.json() };
        }).then(json => {
            // console.log(json)
            if (json.status === 200)
                setImages(json ? json.json : { hits: [] });
        }).catch(_err => {
            return false;
        });
        setLoading(false)
    }

    function getNew_images() {
        let body = new FormData;
        body.append("key", s_val);
        body.append("page", page + 1);
        body.append("category", "People");
        body.append("response_group", "image_details");
        body.append("order", "latest");
        fetch(`${server_url}/images/search`, {
            method: "post",
            headers: token ? { "token": token } : {},
            body
        }).then(async data => {
            return { status: data.status, json: await data.json() };
        }).then(json => {
            setPage(page + 1)
            // console.log(json)
            if (json.status === 200)
                setImages({ ...images, hits: images.hits.concat(json.json.hits) });
        }).catch(_err => {
            return false;
        });
    }

    // async function getNew_images() {
    //     if (params.keyword === "")
    //         return
    //     const imgs = await fetch(`https://pixabay.com/api/?key=${api_keys[ind]}&username=null&q=${s_val}&image_type=photo&orientation=horizontal&page=${page}&per_page=50`).then(data => {
    //         return data.json();
    //     }).catch(_err => {
    //         return false;
    //     });
    //     if (!imgs)
    //         return setIs_online(false)
    //     setPage(page + 1);
    //     // console.log(imgs)
    //     setImages({ ...images, hits: images.hits.concat(imgs.hits) });
    // }
    // useEffect(() => console.log(images), [images])

    return (
        <>
            <Navbar />
            {!loading && images.hits.length === 0 && <div className='image-container'>
                <div className='offline'>
                    <h2>No Results found</h2>
                </div>
            </div>}
            {<>
                {images.hits.length !== 0 && <InfiniteScroll endMessage={<h2 className='text-center f-inter'>{images.hits.length === 0 ? "No Results" : "No more Results"}</h2>} loader={<Loader />} next={getNew_images} hasMore={images.hits.length !== images.total} dataLength={images.hits.length}>
                    <h2 className='f-inter text-center my-1'>{"Search results for \`" + params.keyword + "\`"}</h2>
                    <div className='image-container'>
                        {images.hits.length !== 0 &&
                            images.hits.map(image => {
                                const src = image.webformatURL;
                                return <ImageComponent userName={image.user} userPhoto={`${server_url}/images/get/${image.userImageURL}`} key={image.id} id={image.id} download_link={image.largeImageURL} tags={image.tags} width={image.webformatHeight} src={src} />;
                            })}
                    </div>
                </InfiniteScroll>}
                {!is_online && <div className='image-container'>
                    <div className='offline'>
                        <h2>Please Connect to the internet</h2>
                        <button className='btn-offline' onClick={e => {
                            createRipple(e);
                            navigate("/");
                            setTimeout(() => navigate(`/search/${s_val}`), 100);
                        }}>Retry</button>
                    </div>
                </div>}
            </>
            }
        </>
    )
}
