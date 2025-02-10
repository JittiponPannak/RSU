import React from 'react'

export default function ProfileNew({ poster, title, description, type, release, director }) {
  return (
    <div>
      <br/>
      <img src={poster} alt={title} width={300}/>
      <h2>{title}</h2> <h3>({release})</h3>
      
      <br/>
      <h3>Type: {type}</h3>
      <h3>Directed by: {director}</h3>
      
      <br/>
      <p>{description}</p>
      <br/>
    </div>
  )
}