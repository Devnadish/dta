"use client"
import { Button } from "@/components/ui/button";
import { Router } from "lucide-react";
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation";

const LogingOut = () => {
    const router = useRouter()

    const handleLogout = () => {
        signOut({ callbackUrl: '/', redirect: true });
        // Redirect to home page
        // router.push("/")
        // router.refresh

    }
    return (<Button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Logout
    </Button>
    );
}
export default LogingOut