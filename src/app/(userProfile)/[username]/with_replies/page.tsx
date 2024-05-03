
import { SpecificUserComment } from '@/components/SpecificUserProfile/SpecificUserComment'

const WihtReplies = ({ params }: { params: { username: string } }) => {

    return (
        <>
            <SpecificUserComment params={params} />
        </>
    )
}

export default WihtReplies;