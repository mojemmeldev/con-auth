"use client"
import { useState } from "react";



import { Link, Button, Spinner } from "@heroui/react";
import { signOut, useSession } from "../../../lib/auth-client";




export default function Navber({NavCatApi}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();


  if (isPending) {
    return <div className="flex flex-col items-center gap-2">
      <Spinner size="xl" />
      <span className="text-xs text-muted">Extra Large</span>
    </div>
  }

 console.log("nav",NavCatApi);
  const links = <>
      {
        NavCatApi.map(nc=><li key={nc._id}> <Link  href={`/category/${nc.slug}`} className=" flex gap-2">
          
            <span>{nc.icon}</span> <span>{nc.name}</span>
         
        </Link>
         </li>
        )
      }
    
  </>


  const betterAuth = <>

    {
      session?.user ? <>
        <span>Welcome, {session.user?.name}</span>
        <Link href="/log-in"><Button onClick={() => signOut()}>Sign Out</Button></Link>
      </> : <>
        <Link href="/sign-in">Sign in</Link>
        <Link href="/sign-up"><Button>Sign Up</Button></Link>

      </>
    }

  </>

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className=" container mx-auto flex h-16  items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <div className="flex items-center gap-3">

            <Link href="/" className="font-bold">ACME</Link>
          </div>
        </div>
        <ul className="hidden items-center gap-4 md:flex">
          {links}
        </ul>
        <div className="hidden items-center gap-4 md:flex">
          {betterAuth}
        </div>
      </header>
      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            {links}
            <li className="mt-4 flex flex-col gap-2 border-t border-separator pt-4">
              {betterAuth}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}