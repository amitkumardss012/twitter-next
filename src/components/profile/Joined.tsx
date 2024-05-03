import React from 'react'
import { MdOutlineDateRange } from 'react-icons/md'

interface Joined {
    month: string;
    year: string
}

export const Joined = ({month, year}: Joined) => {
  return (
      <>
         <div className="ml-3 flex gap-2 items-center">
          <MdOutlineDateRange />
              <p>Joined {month} {year}</p>
        </div> 
    </>
  )
}
