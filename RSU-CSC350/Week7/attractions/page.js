import React from 'react'
import Link from 'next/link';

async function getData() {
    const res = await fetch("http://localhost:3000/api/attractions")
    return res.json();
}

export default async function page() {
  const data = await getData();
  return (
    <div>
        <h1 className='center'>Attractions</h1>
        <ul className="grid">
            {
                data.map(attraction => (
                    <li key={attraction.id}>
                        <Link href={"/attractions/" + attraction.id}>
                            <img src={attraction.coverimage} alt={attraction.name} width={175}/>
                         <h2>{attraction.name}</h2>
                        </Link>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}