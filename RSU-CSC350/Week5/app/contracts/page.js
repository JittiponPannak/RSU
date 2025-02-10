import React from 'react'
import Profile from '@/components/Profile'

export default function page() {
  const USERS = [
    {
        id : 6606405
    ,   fname : 'Jittipon'
    ,   lname : 'Pannak'
    ,   avatar : '/jittipon.jpg'
    }, {
        id : 0
    ,   fname : 'DIT'
    ,   lname : ''
    ,   avatar : ''
    }, {
        id : 0
    ,   fname : 'RSU'
    ,   lname : ''
    ,   avatar : ''
    },
  ]


  return (
    <div>
        <h1>Contract</h1>
        {USERS.map( user =>
            <Profile
            id = {user.id}
            fname = {user.fname}
            lname = {user.lname}
            avatar = {user.avatar}
            />
        )}
        <Profile
            id = {6606405}
            fname = {'Jittipon'}
            lname = {'Pannak'}
            avatar = {'/jittipon.jpg'}
        />
    </div>
  )
}
