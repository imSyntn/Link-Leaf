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
import { Textarea } from './ui/textarea'
import { Dropdown } from './Dropdown'
import { contextUpdateType } from '@/app/profile/layout'

export function AddLink({ buttonText, delBtn = false, urlObj, changeUpdate, editProfile }: { buttonText: string, delBtn: boolean, urlObj: urlType | null, changeUpdate: (obj?:contextUpdateType) => void, editProfile: boolean }) {

  const [inputData, setInputData] = useState({
    siteName: '',
    siteURL: '',
    description: ''
  })
  const [custom, setCustom] = useState(false)
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

  useEffect(() => {
    if (!editProfile) {
      if (inputData.siteName === 'Custom') {
        setCustom(true)
      }
    }
  }, [inputData, editProfile])

  const setValue = (name: string) => {
    setInputData(prev => ({ ...prev, siteName: name }))
  }

  const handleProfileEdit = () => {
    axios.patch('/api/profile/update', {
      name: inputData.siteName,
      description: inputData.description
    }, { withCredentials: true })
      .then(e => {
        if (e.data.status >= 400) {
          toast({
            title: "Error",
            description: "Error occured."
          })
        } else {
          toast({
            title: "Updated.",
            description: "Updated successfully."
          })
          changeUpdate(e.data)
        }
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

  const handleSubmit = () => {
    setBtnClicked(true)
    if (editProfile) {
      handleProfileEdit()
    } else {
      axios.post('/api/profile', inputData, { withCredentials: true })
        .then(e => {
          if (e.data.status >= 400) {
            toast({
              title: "Error",
              description: "Error occured."
            })
          } else {
            toast({
              title: "Saved.",
              description: "Data saved successfully."
            })
            changeUpdate()
            setInputData({
              siteName: '',
              siteURL: '',
              description: ''
            })
            setCustom(false)
          }
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
  }

  const handleUpdate = () => {
    setBtnClicked(true)
    if (urlObj) {
      axios.patch(`/api/profile?linkId=${urlObj.id}`, inputData)
        .then(e => {
          if (e.data.status >= 400) {
            toast({
              title: "Error",
              description: "Error occured."
            })
          } else {
            toast({
              title: "Updated.",
              description: "Data Updated successfully."
            })
            changeUpdate()
            setInputData({
              siteName: '',
              siteURL: '',
              description: ''
            })
          }
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
  }

  const handleDelete = () => {
    // toast({
    //   title: "Deleted",
    //   description: "Data deleted successfully."
    // })
    setBtnClicked(true)
    if (urlObj) {
      axios.delete('/api/profile', {
        params: { id: urlObj.id }
      })
        .then(e => {
          if (e.data.status >= 400) {
            toast({
              title: "Error",
              description: "Error occured."
            })
          } else {
            toast({
              title: "Deleted.",
              description: "Data Deleted successfully."
            })
            changeUpdate()
            setInputData({
              siteName: '',
              siteURL: '',
              description: ''
            })
          }
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
              {
                editProfile ? 'Name' : 'Site Name'
              }
            </Label>
            {
              (editProfile && !custom && !urlObj) ? <Input id="name" value={inputData.siteName} onChange={(e) => setInputData(prev => ({ ...prev, siteName: e.target.value }))} className="w-full" /> : (!editProfile && !custom && !urlObj) ? (
                <Dropdown value={inputData.siteName} setValue={setValue} />
              ) : (<Input id="name" value={inputData.siteName} onChange={(e) => setInputData(prev => ({ ...prev, siteName: e.target.value }))} className="w-full" />)
            }
            {/* {
              (custom) && <Input id="name" value={inputData.siteName} onChange={(e) => setInputData(prev => ({ ...prev, siteName: e.target.value }))} className="w-full" />
            } */}
          </div>
          {
            !editProfile && <div className="flex justify-between items-center">
              <Label htmlFor="url" className="text-right">
                Site URL
              </Label>
              <Input id="url" value={inputData.siteURL} onChange={(e) => setInputData(prev => ({ ...prev, siteURL: e.target.value }))} className="w-full" />
            </div>
          }
          <div className="flex justify-between items-center">
            <Label htmlFor="Description" className="text-right">
              Description
            </Label>
            {
              editProfile ? <Textarea className='w-[184px]  bg-gray-50 dark:bg-zinc-800' onChange={(e) => setInputData(prev => ({ ...prev, description: e.target.value }))} /> : <Input id="Description" value={inputData.description} onChange={(e) => setInputData(prev => ({ ...prev, description: e.target.value }))} className="w-full" />
            }
          </div>
        </div>
        <DialogFooter>
          <div className={`flex justify-between ${delBtn ? 'w-full' : ''}`}>
            {
              delBtn && <Button className="bg-red-400 hover:bg-red-600" onClick={handleDelete} disabled={btnClicked ? true : false}><IconTrash /></Button>
            }
            <Button type="submit" onClick={urlObj ? handleUpdate : handleSubmit} disabled={btnClicked ? true : false}>{urlObj ? 'Update' : 'Save'}</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
