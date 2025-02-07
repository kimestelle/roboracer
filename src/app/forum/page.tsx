import Image from "next/image"

export default function Forum() {
    return (
        <div className='w-full min-h-[100svh] flex flex-col justify-center items-center pt-32'>
            <Image src="/logos/slack-logo.svg" alt="Forum" width={500} height={500} />
            <h3>
                Join the RoboRacer slack!
            </h3>
        </div>
    )
}