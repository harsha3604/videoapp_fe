"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@headlessui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/context";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { setUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handleStay = () => {
    setShowModal(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!email || !pass) {
        setMessage("Empty Credentials");
        setShowModal(true);
      } else {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_FRONTEND_URL}api/users/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // include cookies
            body: JSON.stringify({ email, password: pass }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          router.push("/user");
        } else {
          throw new Error("Incorreect Creds");
        }
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
      setShowModal(true);
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            className="mx-auto h-10 w-auto"
            width={32}
            height={32}
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">
            Log in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-black-100"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-black-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-black-100"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    href="#"
                    className="font-semibold text-indigo-400 hover:text-indigo-300"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={isPasswordVisible ? "password" : "text"}
                  // required
                  autoComplete="current-password"
                  onChange={(e) => setPass(e.target.value)}
                  // placeholder="*******"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 pr-10 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-black-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
                <Button
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={togglePasswordVisibility}
                >
                  {isPasswordVisible ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </Button>
              </div>
            </div>

            <div>
              <Button
                type="button"
                onClick={handleLogin}
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Sign in
              </Button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Not a member?{" "}
            <Link
              href="/signup"
              className="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Sign Up
            </Link>
          </p>
        </div>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-80">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{}</h3>
              <p className="text-black-600 mb-6">{message}</p>
              <div className="flex justify-around">
                <button
                  onClick={handleStay}
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
                >
                  Stay Here
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
