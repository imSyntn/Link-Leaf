"use client"

import React, { SetStateAction, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FileUpload } from "@/components/ui/file-upload";
import { useToast } from '@/hooks/use-toast'
import axios from 'axios'
import { userType } from '@/app/UserContext';

export function UploadImage({ user, setUser }: { user: userType, setUser: React.Dispatch<SetStateAction<userType>> }) {

    const [btnClicked, setBtnClicked] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);

    const { toast } = useToast()

    const handleUpload = () => {
        if (!file) return null
        setBtnClicked(true)
        const formData = new FormData()
        formData.append('image', file)

        axios.post(`/api/profile/upload?id=${user.id}`, formData).then((e) => {
            console.log(e.data)
            if (e.data.status > 400) {
                toast({
                    title: 'Error.',
                    description: 'Error occured.'
                })
            } else {
                setUser(prev => ({ ...prev, profilePic: e.data.url }))
                toast({
                    title: 'Image uploaded.',
                    description: 'Image uploaded successfully.'
                })
            }
        }).catch((e) => {
            console.log(e)
            toast({
                title: 'Error.',
                description: 'Error occured.'
            })
        })
            .finally(() => setBtnClicked(false))
    }

    const handleFile = (files: File[]) => {
        setFile(files[0]);
        console.log(files[0]);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="border-white bg-white text-black">Upload Image</Button>
            </DialogTrigger>
            <DialogContent className="w-[360px] sm:max-w-[425px]" style={btnClicked ? { opacity: 0.5 } : {}}>
                <DialogHeader>
                    <DialogTitle>Upload Image</DialogTitle>
                </DialogHeader>
                <FileUpload onChange={handleFile} />
                <DialogFooter>
                    <Button type="submit" onClick={handleUpload} disabled={btnClicked ? true : false}>Uplaod</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
