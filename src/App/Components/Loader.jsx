import React from 'react'
import ContentLoader from "react-content-loader";
// import { loader } from '../Context/Images'

export function Loader() {
    return (
        <div style={{ display: "flex", flexWrap: "wrap", animation: "rotate_X cubic-bezier(0.075, 0.82, 0.165, 2) .4s", justifyContent: "center" }}>
            <div className='image'>
                <ContentLoader backgroundColor='#d8dcdf' speed={3} gradientRatio={2} animate foregroundColor='#e3e5e7' height={"480px"} width={"100%"}>
                    <rect x={10} y={0} rx={100} ry={100} width={"70px"} height={"70px"} />
                    <rect x={90} y={5} rx={10} ry={5} width={"150px"} height={"25px"} />
                    <rect x={100} y={35} rx={5} ry={5} width={"70px"} height={"20px"} />
                    <rect x={0} y={80} width={"100%"} height={"300px"} />
                    <rect x={10} y={390} rx={7} ry={7} width={"150px"} height={"40px"} />
                    <rect x={10} y={440} rx={5} ry={5} width={"150px"} height={"25px"} />
                    <rect x={170} y={440} rx={5} ry={5} width={"150px"} height={"25px"} />
                    <rect x={330} y={440} rx={5} ry={5} width={"150px"} height={"25px"} />
                </ContentLoader>
            </div>
            <div className='image'>
                <ContentLoader backgroundColor='#d8dcdf' speed={3} gradientRatio={2} animate foregroundColor='#e3e5e7' height={"480px"} width={"100%"}>
                    <rect x={10} y={0} rx={100} ry={100} width={"70px"} height={"70px"} />
                    <rect x={90} y={5} rx={10} ry={5} width={"150px"} height={"25px"} />
                    <rect x={100} y={35} rx={5} ry={5} width={"70px"} height={"20px"} />
                    <rect x={0} y={80} width={"100%"} height={"300px"} />
                    <rect x={10} y={390} rx={7} ry={7} width={"150px"} height={"40px"} />
                    <rect x={10} y={440} rx={5} ry={5} width={"150px"} height={"25px"} />
                    <rect x={170} y={440} rx={5} ry={5} width={"150px"} height={"25px"} />
                    <rect x={330} y={440} rx={5} ry={5} width={"150px"} height={"25px"} />
                </ContentLoader>
            </div>
            <div className='image'>
                <ContentLoader backgroundColor='#d8dcdf' speed={3} gradientRatio={2} animate foregroundColor='#e3e5e7' height={"480px"} width={"100%"}>
                    <rect x={10} y={0} rx={100} ry={100} width={"70px"} height={"70px"} />
                    <rect x={90} y={5} rx={10} ry={5} width={"150px"} height={"25px"} />
                    <rect x={100} y={35} rx={5} ry={5} width={"70px"} height={"20px"} />
                    <rect x={0} y={80} width={"100%"} height={"300px"} />
                    <rect x={10} y={390} rx={7} ry={7} width={"150px"} height={"40px"} />
                    <rect x={10} y={440} rx={5} ry={5} width={"150px"} height={"25px"} />
                    <rect x={170} y={440} rx={5} ry={5} width={"150px"} height={"25px"} />
                    <rect x={330} y={440} rx={5} ry={5} width={"150px"} height={"25px"} />
                </ContentLoader>
            </div>
            <div className='image'>
                <ContentLoader backgroundColor='#d8dcdf' speed={3} gradientRatio={2} animate foregroundColor='#e3e5e7' height={"480px"} width={"100%"}>
                    <rect x={10} y={0} rx={100} ry={100} width={"70px"} height={"70px"} />
                    <rect x={90} y={5} rx={10} ry={5} width={"150px"} height={"25px"} />
                    <rect x={100} y={35} rx={5} ry={5} width={"70px"} height={"20px"} />
                    <rect x={0} y={80} width={"100%"} height={"300px"} />
                    <rect x={10} y={390} rx={7} ry={7} width={"150px"} height={"40px"} />
                    <rect x={10} y={440} rx={5} ry={5} width={"150px"} height={"25px"} />
                    <rect x={170} y={440} rx={5} ry={5} width={"150px"} height={"25px"} />
                    <rect x={330} y={440} rx={5} ry={5} width={"150px"} height={"25px"} />
                </ContentLoader>
            </div>
        </div>
    )
}
