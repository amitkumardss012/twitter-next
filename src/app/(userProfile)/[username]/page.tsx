
import { SpecificUserProfle } from '@/components/SpecificUserProfile/SpecificUserProfle'
import { UserProfileByUserName } from '@/components/SpecificUserProfile/UserProfileByUserName'
import React from 'react'

const UserProfile = ({ params }: { params: { username: string } }) => {
    return (
        <>
            <UserProfileByUserName params={params} />
        </>
    );
}

export default UserProfile;
