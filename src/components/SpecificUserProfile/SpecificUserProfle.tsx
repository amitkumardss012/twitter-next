"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { UserProfileByUserName } from './UserProfileByUserName'
import { ProfileHeader } from '../profile/ProfileHeader'
import { ProfileHero } from '../profile/ProfileHero'
import { ProfileImage } from '../profile/ProfileImage'
import { FollowEditProfile } from '../profile/FollowEditProfile'
import { UserNameBio } from '../profile/UserNameBio'
import { Joined } from '../profile/Joined'
import { extractMonthAndYearFromDate } from '@/utils/monthYear'
import { Follower } from '../profile/Follower'
import { SpecificProfilePRML } from './SpecficProfilePRML'
import Loading from '../loading'
import { userType } from '@/type'

export const SpecificUserProfle = ({ params }: { params: { username: string } }) => {
    const [userData, setUserData] = useState<userType | null>(null)
    const [loginUserID, setLoginUserId] = useState(0)
    const [isError, setError] = useState(false)
    const UserProfile = async () => {
        try {
            const res = await axios.get(`/api/user/${params.username}`)
            console.log(res.data)
            setLoginUserId(res.data.loginUserID)
            setUserData(res.data.userByUsernam)
        } catch (error) {
            setError(true)
        }
    }

    useEffect(() => {
        UserProfile()
    }, [params.username])

    if (!userData) {
        return <Loading />
    }

    if (isError) {
        return <p>Something went wrong</p>
    }
    const { month, year } = extractMonthAndYearFromDate(userData?.createdAt);
    return (
        <div>
            <ProfileHeader name={userData.name} />
            <ProfileHero />
            <ProfileImage />
            <FollowEditProfile user={userData} loginUserID={loginUserID} />
            <UserNameBio name={userData?.name} username={userData?.username} />
            <Joined month={month} year={year} />
            <Follower Follower_count={userData.follower_count} Following_count={userData.following_count} />
            {userData && <SpecificProfilePRML route={userData} />}
        </div>
    )
}




interface UserDetails {
    id: number;
    name: string;
    username: string;

}