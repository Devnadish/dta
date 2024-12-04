import NextAuth from "next-auth";
import { authOptions } from "@/lib/authConfig";

export const { signIn, signOut, handlers, auth } = NextAuth(authOptions);
