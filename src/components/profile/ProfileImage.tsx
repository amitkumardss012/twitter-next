import React from 'react'

export const ProfileImage = () => {
  return (
    <>
      <div className="relative flex justify-between bg-yellow-500">
        <div className="absolute -bottom-16 left-4">
          <img
            src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png"
            className="w-32 rounded-full"
            alt=""
          />
        </div>
      </div>
    </>
  )
}
