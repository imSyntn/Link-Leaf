"use client";
import React, { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/app/UserContext";
// import {
//   IconBrandGithub,
//   IconBrandGoogle,
//   IconBrandOnlyfans,
// } from "@tabler/icons-react";

export default function LogInForm() {

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [btnClicked, setBtnClicked] = useState(false)

  const { setUser } = useUserContext()
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailRef.current && passwordRef.current) {
      const emailVal = emailRef.current.value
      const passwordVal = passwordRef.current.value
      if (validations(emailVal, passwordVal)) {
        setBtnClicked(true)

        axios.post('/api/login', {
          email: emailVal,
          password: passwordVal
        }, { withCredentials: true }).then(e => {
          const data = e.data
          if (data.status >= 400) {
            toast({
              title: 'Error',
              description: 'Error occured.'
            })
          } else {
            setUser({
              name: data.name,
              isLoggedin: true,
              isVarified: data.isVarified,
              id: data.id,
              profilePic: data.profilePic
            })
            router.push('/profile')
          }
        }).catch(e => {
          console.log(e)
          toast({
            title: 'Error',
            description: 'Error occured'
          })
        }).finally(() => setBtnClicked(false))

      }
    }
  };

  const validations = (email: string, password: string) => {
    if (!email.includes('@') || !email.includes('.')) {
      toast({
        title: 'Error',
        description: 'Email is not valid.'
      })
      return false;
    }
    if (password.length < 8) {
      toast({
        title: 'Error',
        description: 'Password length must be more than 7'
      })
      return false
    }

    return true;
  }

  return (
    <div className="h-[100vh] flex justify-center items-center">
      <div className="min-w-[350px] w-auto mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black" style={btnClicked ? { opacity: 0.5 } : {}}>
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Login to your account
        </h2>
        <form className="mt-8 w-80" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="projectmayhem@fc.com" type="email" ref={emailRef} />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Enter Password</Label>
            <Input id="password" placeholder="••••••••" type="password" ref={passwordRef} />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
            disabled={btnClicked ? true : false}
          >
            Log in &rarr;
            <BottomGradient />
          </button>

          <div className="loginDiv mt-4">
            <p>New to Link Leaf ? <Link href={'/signup'} className="text-blue-600">Sign up</Link></p>
            <p className="mt-1"> Forgot Your Password? <Link href={'/forgot-password'} className="text-blue-600">Click here</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
