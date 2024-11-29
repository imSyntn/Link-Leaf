"use client";
import React, { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import axios from 'axios'
import { useToast } from "@/hooks/use-toast";
import { useUserContext } from "@/app/UserContext";
import { useRouter } from "next/navigation";
// import {
//   IconBrandGithub,
//   IconBrandGoogle,
//   IconBrandOnlyfans,
// } from "@tabler/icons-react";

export default function SignupForm() {

  const { toast } = useToast()
  const { setUser } = useUserContext()
  const router = useRouter()
  const [btnClicked, setBtnClicked] = useState(false)

  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (firstNameRef.current && lastNameRef.current && emailRef.current && passwordRef.current && confirmPasswordRef.current) {

      if (validations(emailRef.current.value, passwordRef.current.value, confirmPasswordRef.current.value)) {

        setBtnClicked(true)

        axios.post('/api/signup', {
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value
        }).then((e) => {
          console.log(e)
          if (e.data.status === 400) {
            toast({
              title: 'Error',
              description: 'User already exist.'
            })
          } else {
            setUser({
              name: e.data.name,
              isLoggedin: true,
              isVarified: e.data.isVarified,
              id: e.data.id
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

  const validations = (email: string, password: string, confirmPassword: string) => {
    if (!email.includes('@') && !email.includes('.')) {
      toast({
        title: 'Error',
        description: 'Email is not valid.'
      })
      return false;
    }
    if(password.length <8) {
      toast({
        title: 'Error',
        description: 'Password length must be more than 7'
      })
      return false
    }
    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords does not match.'
      })
      return false;
    }

    return true;
  }


  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black" style={btnClicked ? {opacity: 0.5} : {}}>
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Create an account
      </h2>
      <form className="mt-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Tyler" type="text" ref={firstNameRef} />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Durden" type="text" ref={lastNameRef} />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" ref={emailRef} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Create Password</Label>
          <Input id="password" placeholder="••••••••" type="password" ref={passwordRef} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input id="confirm-password" placeholder="••••••••" type="password" ref={confirmPasswordRef} />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={btnClicked ? true : false}
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="loginDiv mt-4">
          <p>Have an Accocunt? <Link href={'/login'} className="text-blue-600">Log in</Link></p>
        </div>
      </form>
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

