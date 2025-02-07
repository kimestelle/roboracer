import Image from "next/image"

export default function Forum() {
    return (
        <div className='w-full min-h-[100svh] flex flex-col justify-center items-center pt-32'>
            <a href="https://robo-racer.slack.com/ssb/redirect" target="_blank" rel="noreferrer noopener" className='flex flex-col justify-center items-center gap-10'>
                <Image src="/logos/slack-logo.svg" alt="Forum" width={500} height={500} />
                <h3>
                    Join the RoboRacer slack!
                </h3>
            </a>
        </div>
    )
}