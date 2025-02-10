import React from 'react'

export default function Profile({ id, fname, lname, avatar }) {
   /*
   const AVATAR = '/jittipon.jpg'
   const NAME = 'Jittipon Pannak (6606405)'
    const USER = {
        id : 6606405
    ,   fname : 'Jittipon'
    ,   lname : 'Pannak'
    ,   avatar : '/jittipon.jpg'
    }
  */

  return (
    <div>
        <img src={avatar} alt={fname} width={200}/>
        <p>{fname} {lname} ({id})</p>
    </div>
  )
}