import { Metadata } from "next";
import Image from "next/image";
import LoginImage from "@/assets/login-image.jpg";
import LoginForm from "./LoginForm";
import Link from "next/link";

export const metadata : Metadata = {
    title: "Login"
}

const Page = () => {

  return (
    <main className="flex items-center justify-center h-screen p-5">
        <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] shadow-2xl rounded-2xl bg-card overflow-hidden">
            <div className="w-full md:w-1/2 space-y-10 p-10 overflow-y-auto">
                <div className="text-center space-y-1">
                    <h1 className="text-3xl font-bold">Login to bugbook</h1>
                    <p className="text-muted-foreground">Login to bugbook to connect with your friends</p>
                </div>
                <div className="space-y-5">
                    <LoginForm />
                    <Link href="/signup" className="block text-center hover:underline">
                        Don&apos;t have any account
                    </Link>
                </div>
            </div>
            <Image
                src={LoginImage}
                alt=""
                className="w-1/2 hidden md:block object-cover"
            />
        </div>
    </main>
  )
}

export default Page