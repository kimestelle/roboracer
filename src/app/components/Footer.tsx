'use client';
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const currentPath = usePathname();
  const isAltFooter = currentPath === "/learn" || currentPath === "/build" || currentPath === "/course";

  return (
    <footer className={`${isAltFooter && "hidden"} dotted-bg flex flex-col gap-8 text-white p-4`}>
      <div className='flex flex-row justify-start gap-2'>
        <Image src='logos/slack-logo.svg' alt='Slack Logo' width={20} height={20}/>
        <p>Join Our Community!</p>
      </div>
      <p>Join slack to learn how to get started and get your questions answered</p>
      <Image src='logos/logo-white.svg' alt='RoboRacer Logo' width={200} height={50}/>
    </footer>
  );
}