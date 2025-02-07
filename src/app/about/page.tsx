import Image from 'next/image';
import developers from '@/data/team_developers.json';
import alumni from '@/data/team_alumni.json';
import institutions from '@/data/partners.json';

//reusable profile card component
const ProfileCard = ({ name, linkedin, image }: { name: string, linkedin?: string, image: string }) => (
    <div className="text-center flex flex-col justify-end p-4">
        <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <Image src={`/${image}`} alt={name} className="rounded-md mx-auto contrast-[1]" width={100} height={100} />
        </a>
        <h5 className="mt-2 text-white">{name}</h5>
    </div>
);

//profile card grid
const ProfileList = ({ title, data }: { title: string, data: { name: string, linkedin?: string, image: string }[] }) => (
    <div className="mt-8 responsive-padding">
        <h5 className="text-lg font-semibold">{title}</h5>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {data.map((person) => (
                <ProfileCard key={person.name} {...person} />
            ))}
        </div>
    </div>
);

//institutional partners grid
const PartnersList = () => (
    <div className="mt-8 responsive-padding">
        <h3 className="text-lg font-semibold">Institutional Partners</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {institutions.map(({ name, website, image }) => (
                <div key={name} className="text-center flex flex-col justify-end p-4">
                    <a href={website} target="_blank" rel="noopener noreferrer">
                        <Image src={`/${image}`} alt={name} className="mx-auto" width={150} height={80} />
                    </a>
                    <h5 className="mt-2 text-white">{name}</h5>
                </div>
            ))}
        </div>
    </div>
);

// About Page
export default function About() {
    return (
        <div className="w-full text-white bg-zinc-950">
            <div className="w-full h-[85svh] shadow-lg p-8 sm:px-12 text-white text-center flex flex-col gap-8 items-center justify-center pt-24 overflow-hidden">
                <Image
                    src="/about/upenn-ppl.jpg"
                    alt="Logo Gradient"
                    className='lg:max-w-[50svw]'
                    width={400}
                    height={350}
                />
                <p className='lg:max-w-[60svw]'>
                    RoboRacer is an international community of researchers, engineers, and autonomous systems enthusiasts. 
                    It was originally founded at the University of Pennsylvania in 2016 but has since spread to many other institutions worldwide. 
                    Our mission is to foster interest, excitement, and critical thinking about the increasingly ubiquitous field of autonomous systems.
                </p>
            </div>

            <h2 className="text-2xl font-bold mt-12">Meet the Team</h2>
            <ProfileList title="Developers" data={developers} />
            <ProfileList title="Alumni" data={alumni} />

            <h2 className="text-2xl font-bold mt-12">Our Partners</h2>
            <PartnersList />
        </div>
    );
};
