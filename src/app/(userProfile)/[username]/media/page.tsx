import { SpecificUserMedia } from '@/components/SpecificUserProfile/SpecificUserMedia'
import React from 'react'

const Media = ({ params }: { params: { username: string } }) => {
    return (
        <>
            <div>
                <SpecificUserMedia params={params} />
            </div>
        </>
    )
}

export default Media