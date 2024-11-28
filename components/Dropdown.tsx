"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { dropdownValue } from "@/lib/DropdownValue"

export function Dropdown({value, setValue}:{value: string, setValue: (name:string)=> void}) {
  const [open, setOpen] = React.useState(false)
  // const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[186px] justify-between  bg-gray-50 dark:bg-zinc-800"
        >
          {value
            ? dropdownValue.find((framework) => framework.value === value)?.label
            : "Select name..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[186px] p-0">
        <Command>
          {/* <CommandInput placeholder="Search name..." className="h-9" /> */}
          <CommandList>
            {/* <CommandEmpty>Not found.</CommandEmpty> */}
            <CommandGroup>
              {dropdownValue.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
