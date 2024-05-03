import React from 'react'

interface userDetails {
  name: string;
  username: string
}

export const UserNameBio = ({ name, username }: userDetails) => {
  return (
    <>
      <div className="p-3">
        <h1 className="font-bold text-xl">{name}</h1>
        <p>@{username}</p>
      </div>

      <div>
        <p className="p-2">
          leт yфυr +ve vιвeѕ 🦋 ѕнιпe, ιп a Reтrф ѕтyle 💫
        </p>
      </div>
    </>
  )
}
