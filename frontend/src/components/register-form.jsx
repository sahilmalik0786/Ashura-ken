import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Controller, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import { useRegister } from "@/hooks/useRegister"
import { toast } from "sonner"

export function RegisterForm({
  className,
  ...props
}) {
  const navigate = useNavigate()
  const register = useRegister()
    const { handleSubmit, control , formState:{errors} } = useForm()
    const onSubmit = async (data) => {
         try {  
         await register.mutateAsync(data);
          // calls backend
         navigate('/dashboard'); // redirect after success
      } catch (err) {
        toast.error(err?.response?.data?.message)
        console.error("Login failed:", err);
      }
    }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
         <Card> 
           <CardHeader>
             <CardTitle>Create A New Account</CardTitle>
             <CardDescription>
               Enter your email below to create a new account
             </CardDescription>
           </CardHeader>
           <CardContent>
             <form>
               <div className="flex flex-col gap-6">
                 <div className="grid gap-3">
                   <Label htmlFor="email">Email</Label>
                   <Controller
                     name="email"
                     control={control}
                     rules={{required:true}}
                     render={({ field : {onChange}}) => (
                       <Input
                         onChange={onChange}
                         id="email"
                         type="email"
                         placeholder="m@example.com"
                         required
                       />
                     )}
                   />
                    {errors.email && (
                  <small className="text-red-200">This is required.</small>
                )}
                 </div>
                  <div className="grid gap-3">
                   <Label htmlFor="username">Username</Label>
                  <Controller
                     name="username"
                     control={control}
                     rules={{required:true}}
                     render={({ field : {onChange}}) => (
                       <Input
                         onChange={onChange}
                         id="username"
                         type="text"
                         placeholder="Enter username"
                         required
                       />
                     )}
                   />
                    {errors.username && (
                  <small className="text-red-200">This is required.</small>
                )}
                 </div>
                 <div className="grid gap-3">
                   <div className="flex items-center">
                     <Label htmlFor="password">Password</Label>
                     <a
                       href="#"
                       className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                     >
                       Forgot your password?
                     </a>
                   </div>
                    <Controller
                     name="password"
                     control={control}
                     rules={{required:true}}
                     render={({ field : {onChange}}) => (
                      <Input
                       onChange={onChange}
                       id="password" 
                       type="password"
                       required 
                       />
                     )}
                   />
                    {errors.password && (
                  <small className="text-red-200">This is required.</small>
                )}
                 </div>
                 <div className="flex flex-col gap-3">
                   <Button type="submit" onClick={handleSubmit(onSubmit)} variant={'default'} className="w-full cursor-pointer">
                     {register.isPending ? 'Registering':'Register'}
                   </Button>
                 
                 </div>
               </div>
               <div className="mt-4 text-center text-sm">
                 Already have an account?{" "}
                 <Link to="/auth/login" className="underline underline-offset-4">
                   Login 
                 </Link>
               </div>
             </form>
           </CardContent>
         </Card>
       </div>
  );
}
