"use client"

import React, { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useToast } from "@/hooks/use-toast"

export default function DrawerComp() {

    const [loading, setLoading] = useState(false)
    const cancelBtn = useRef<HTMLButtonElement>(null)

    const { toast } = useToast()

    const sendOTP = () => {
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }

    const varifyOTP = () => {
        toast({
            title: 'Varified',
            description: 'OTP varification successful.'
        })
        cancelBtn.current?.click()
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline" onClick={sendOTP} className="bg-white text-black hover:border-white">Get Varified</Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Varify OTP</DrawerTitle>
                        <DrawerDescription>{
                            loading ? 'Generating OTP.' : 'OTP Sent Successfully.'
                        }</DrawerDescription>
                    </DrawerHeader>
                    <div className="flex justify-center my-4">
                        {
                            loading ? (
                                <p className="text-lg">Sending Email . . .</p>
                            ) : (
                                <InputOTP maxLength={6}>
                                    <InputOTPGroup>
                                        <InputOTPSlot className="border-gray-500 w-12 h-12" index={0} />
                                        <InputOTPSlot className="border-gray-500 w-12 h-12" index={1} />
                                        <InputOTPSlot className="border-gray-500 w-12 h-12" index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot className="border-gray-500 w-12 h-12" index={3} />
                                        <InputOTPSlot className="border-gray-500 w-12 h-12" index={4} />
                                        <InputOTPSlot className="border-gray-500 w-12 h-12" index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            )
                        }
                    </div>
                    <DrawerFooter>
                        <Button onClick={varifyOTP}>Varify</Button>
                        <DrawerClose asChild>
                            <Button variant="outline" ref={cancelBtn}>Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
