import react from 'react'
import {Button} from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
const Login = () => {
  return (
    <Card className="w-[350px], flex flex-col items-center ">
        <ModeToggle className=""></ModeToggle>
    <CardHeader>
      <CardTitle>Login</CardTitle>
      <CardDescription>Admin</CardDescription>
    </CardHeader>
    <CardContent>
      <form>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Email or Name" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Password</Label>
            <Input id="password" placeholder="Password" />
          </div>
        </div>
      </form>
    </CardContent>
    <CardFooter className="flex flex-col ">
      <Button variant="outline">sign</Button>
    </CardFooter>
    </Card>
  )
}

export default Login