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

export function ShareBtn({ header, description, link }: { header: string, description: string, link: string }) {
  const { toast } = useToast()

  const copyHandler = () => {
    navigator.clipboard.writeText(link)
      .then(() => toast({
        title: 'Copied',
        description: 'Link copied successfully.'
      }))
      .catch(() => toast({
        title: 'Error',
        description: 'Unexpected error occured.'
      }))
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="border-white bg-white text-black">Share</Button>
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
        <div className="flex flex-col items-center">
          <img src="https://raw.githubusercontent.com/imSyntn/Static-Files/refs/heads/main/qr-code.gif" className="rounded-full w-12" alt="scan qr gif" />
          <h1 className="my-2 font-medium text-lg tracking-wide">Scan QR</h1>
          <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURI(link)}&size=150x150`} className="mb-2 w-[150px] h-[150px] border border-gray-100" alt="QR" />
          <h1 className="font-medium text-lg tracking-wide">or</h1>
          <p>copy link</p>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-white">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={copyHandler}>Copy</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
