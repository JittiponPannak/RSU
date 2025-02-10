import React from 'react'

export default async function Page({params}) {
    const data = await fetchData(params.id)
    const user = data.user
    console.log(data)
  
    return (
    <div style={{display: 'grid', flexFlow: 'row wrap', justifySelf: 'center', alignSelf: 'center', margin: "20px", padding : '20px', gridTemplateAreas: `'header header' 'aside main' 'footer footer'`}}>
        <h1>User {params.id}</h1> <br/>
        <div key={user.id}>
          <p>{user.fname} {user.lname}</p>
          <img src={user.avatar} alt={user.id} height={200}/>
          <p>{user.username}</p>
          <br/>
        </div>
    </div>
  )
}

async function fetchData(id) {
    const data = await fetch(`https://www.melivecode.com/api/users/${id}`)
    return data.json()
}