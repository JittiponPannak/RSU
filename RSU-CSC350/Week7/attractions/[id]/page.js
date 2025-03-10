import { Margin, Padding } from '@mui/icons-material';
import Link from 'next/link';
import React from 'react'

async function getData(id) {
    const res = await fetch("http://localhost:3000/api/attractions/" + id)
    return res.json();
}

export default async function page({ params }) {
    const id = params.id;
    const data = await getData(id);
    return (
    <div>
        <Link href={"/attractions/"}>Return</Link>
        <div className='centerMargined'>
            <div>
            <img src={data.coverimage} alt={data.name} width={500}/>
            </div>
            <h1>{data.name}</h1>
            <p>Latitude : {data.latitude}, Longitude : {data.longitude}</p>
            <p>{data.detail}</p>
        </div>
    </div>
    )
}