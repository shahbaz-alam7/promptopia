"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  useEffect(() => {
    const setproviders = async () => {
      const response = await getProviders();
      console.log("setproviders ~ response:", response);

      setProviders(response);
    };
    setproviders();
  }, []);
  return (
    <nav className="flex-between w-full mb-16 p-3">
      <Link href="/" className="flex gap-2">
        <Image
          src="/assets/images/logo.svg"
          width={30}
          height={30}
          alt="Promptopia Logo"
          className="object-contain"
        />
        <p className="logo_text">Promotopia</p>
      </Link>
      {/* desktop login  */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src="assets/images/logo.svg"
                width={37}
                height={37}
                alt="profile"
                className="rounder-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* mobile navigation */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            <Image
              width={37}
              height={37}
              src="assets/images/logo.svg"
              alt="pic"
              className="rounded-full"
              onClick={() => {
                setToggleDropDown((pre) => !pre);
              }}
            />
            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
