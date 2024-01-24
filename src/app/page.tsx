"use client"

import SideBar from "./ui/home/side-bar";
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();
    router.push('/financial');
    return null;
}
