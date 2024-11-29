import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
  import { useToast } from "@/hooks/use-toast"
  
  export function ShareBtn({header, description, link}: {header:string, description:string, link:string}) {
    const {toast} = useToast()

    const copyHandler = () => {
      navigator.clipboard.writeText(link)
      .then((e)=> toast({
        title: 'Copied',
        description: 'Link copied successfully.'
      }))
      .catch((e)=> toast({
        title: 'Error',
        description: 'Unexpected error occured.'
      }))
    }

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="ml-2 border-white bg-white text-black">Share</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[360px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Share {header}</AlertDialogTitle>
            <AlertDialogDescription>
              {
                description
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div>
            <img src="https://raw.githubusercontent.com/imSyntn/Static-Files/refs/heads/main/qr-code.gif" className="rounded-full w-14" alt="scan qr gif" />
            <h2>Scan QR</h2>
            <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURI(link)}&size=150x150`} alt="QR" />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-white">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={copyHandler}>Copy</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  