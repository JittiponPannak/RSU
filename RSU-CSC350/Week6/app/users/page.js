import React from 'react'
import Link from 'next/link'

export default async function Page() {
  const data = await fetchData()

  return (
    <div style={{display: 'grid', flexFlow: 'row wrap', justifySelf: 'center', alignSelf: 'center', margin: "20px", padding : '20px', gridTemplateAreas: `'header header' 'aside main' 'footer footer'`}}>
      
      <h1>Users</h1> <br/>

      <div key={6606405}>
          <p>{"Jittipon"} {"Pannak"}</p>
          <img src={"\\jittipon.jpg"} alt={6606405} height={200}/>
          <p>{"jittipon.p66@rsu.ac.th"}</p>
          <br/>
      </div>

      <br/><br/><br/>

      { data.map(user => (

        <div key={user.id}>
          <p>{user.fname} {user.lname}</p>
          <img src={user.avatar} alt={user.id} height={200}/>
          <p>{user.username}</p>
          <Link href={`/users/${user.id}`}> ...Read More... </Link>
          <br/>
        </div>

      ))}
      
    </div>
  )
}

async function fetchData() {
  const data = await fetch("https://www.melivecode.com/api/users")
  return data.json()
}