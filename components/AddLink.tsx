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

export function AddLink({ buttonText, delBtn = false, urlObj }: { buttonText: string, delBtn: boolean, urlObj: urlType | false }) {

  const [inputData, setInputData] = useState({
    name: '',
    url: '',
    description: ''
  })

  useEffect(() => {
    if (urlObj) {
      setInputData({
        name: urlObj.sitename,
        url: urlObj.siteurl,
        description: urlObj.text
      })
    }
  }, [urlObj])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-white bg-white text-black">{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
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
            <Input id="name" value={inputData.name} onChange={(e) => setInputData(prev => ({ ...prev, name: e.target.value }))} className="w-full" />
          </div>
          <div className="flex justify-between items-center">
            <Label htmlFor="url" className="text-right">
              Site URL
            </Label>
            <Input id="url" value={inputData.url} onChange={(e) => setInputData(prev => ({ ...prev, url: e.target.value }))} className="w-full" />
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
              delBtn && <Button className="bg-red-400 hover:bg-red-600" onClick={() => 
                toast({
                  title: "Deleted",
                  description: "Data deleted successfully."
                })
                }><IconTrash /></Button>
            }
            <Button type="submit" onClick={() =>
              toast({
                title: "Saved.",
                description: "Data saved successfully."
              })
            }>Save</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
