
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const SpecificProfilePRML = ({ route }: { route: UserDetails }) => {
    return (
        <>
            <div className="mt-5 p-2" style={{ borderBottom: "1px solid #2F3336" }}>
                <div className="flex justify-between pr-4 pl-4">
                    <ProfileButton
                        buttonName="Posts"
                        path={`/${route.username}`}
                        profilePath="/profile"
                    />
                    <ProfileButton
                        buttonName="Replies"
                        path={`/${route.username}/with_replies`}
                        profilePath="/with_replies"
                    />
                    <ProfileButton
                        buttonName="Media"
                        path={`/${route.username}/media`}
                        profilePath="/media"
                    />
                    <ProfileButton
                        buttonName="Likes"
                        path={`/${route.username}/likes`}
                        profilePath="/likes"
                    />
                </div>
            </div>
        </>
    );
};

export const ProfileButton = ({
    buttonName,
    path,
    profilePath,
}: ProfileButtonInterface) => {
    return (
        <>
            <Link href={path}>
                <button
                >
                    {buttonName}
                </button>
            </Link>
        </>
    );
};

interface ProfileButtonInterface {
    buttonName: string;
    path: string;
    profilePath: string;
}


interface UserDetails {
    name: string;
    username: string;
    createdAt: string;
}