"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IconTrash } from '@tabler/icons-react';

import { urlType } from './UrlContainer'
import { toast } from '@/hooks/use-toast'
import axios from 'axios'

export function AddLink({ buttonText, delBtn = false, urlObj }: { buttonText: string, delBtn: boolean, urlObj: urlType | null }) {

  const [inputData, setInputData] = useState({
    siteName: '',
    siteURL: '',
    description: ''
  })
  const [btnClicked, setBtnClicked] = useState(false)

  useEffect(() => {
    if (urlObj) {
      setInputData({
        siteName: urlObj.siteName,
        siteURL: urlObj.siteURL,
        description: urlObj.description
      })
    }
  }, [urlObj])

  const handleSubmit = () => {
    console.log(1)
    setBtnClicked(true)
    axios.post('/api/profile', inputData, { withCredentials: true })
      .then(e => {
        console.log(e)
        toast({
          title: "Saved.",
          description: "Data saved successfully."
        })
      })
      .catch(e => {
        console.log(e)
        toast({
          title: "Error",
          description: "Error occured."
        })
      })
      .finally(() => setBtnClicked(false))
  }

  const handleDelete = () => {
    // toast({
    //   title: "Deleted",
    //   description: "Data deleted successfully."
    // })
    setBtnClicked(true)
    // if (urlObj) {
    //   axios.delete('/api/profile', {
    //     data: { id: urlObj.id }
    //   })
    //     .then(e => {
    //       console.log(e)
    //       toast({
    //         title: "Saved.",
    //         description: "Data saved successfully."
    //       })
    //     })
    //     .catch(e => {
    //       console.log(e)
    //       toast({
    //         title: "Error",
    //         description: "Error occured."
    //       })
    //     })
    //     .finally(() => setBtnClicked(false))
    // }

    setTimeout(() => setBtnClicked(false), 2000)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-white bg-white text-black">{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" style={btnClicked ? { opacity: 0.5 } : {}}>
        <DialogHeader>
          <DialogTitle>{buttonText}</DialogTitle>
          {/* <DialogDescription>
            Add a new Link.
          </DialogDescription> */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="name" className="text-right">
              Site Name
            </Label>
            <Input id="name" value={inputData.siteName} onChange={(e) => setInputData(prev => ({ ...prev, siteName: e.target.value }))} className="w-full" />
          </div>
          <div className="flex justify-between items-center">
            <Label htmlFor="url" className="text-right">
              Site URL
            </Label>
            <Input id="url" value={inputData.siteURL} onChange={(e) => setInputData(prev => ({ ...prev, siteURL: e.target.value }))} className="w-full" />
          </div>
          <div className="flex justify-between items-center">
            <Label htmlFor="Description" className="text-right">
              Description
            </Label>
            <Input id="Description" value={inputData.description} onChange={(e) => setInputData(prev => ({ ...prev, description: e.target.value }))} className="w-full" />
          </div>
        </div>
        <DialogFooter>
          <div className={`flex justify-between ${delBtn ? 'w-full' : ''}`}>
            {
              delBtn && <Button className="bg-red-400 hover:bg-red-600" onClick={handleDelete} disabled={btnClicked ? true : false}><IconTrash /></Button>
            }
            <Button type="submit" onClick={handleSubmit} disabled={btnClicked ? true : false}>Save</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
