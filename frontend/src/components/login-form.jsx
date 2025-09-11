import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useLogin } from "@/hooks/useLogin";
import { toast } from "sonner";
import { BackgroundPattern, DotBackground } from "./background-pattern";

export function LoginForm({ className, ...props }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate()
  const login = useLogin();
  const onSubmit = async (data) => {
    // if(data.userCredential.trim() == ' ') console.log('jell')
    console.log(data.password);
    try {
       await login.mutateAsync(data); // calls backend
       navigate('/dashboard'); // redirect after success
    } catch (err) {
      toast.error(err?.response?.data?.message || err) 
      
      console.error("Login failed:", err);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6 ", className)} {...props}>
      <Card >
          
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email or username below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="userCredential">Email/Username</Label>
                <Controller
                  name="userCredential"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange } }) => (
                    <Input
                      onChange={onChange}
                      id="userCredential"
                      type="text"
                      name="userCredential"
                      placeholder="m@example.com"
                      required
                    />
                  )}
                />
                {errors.userCredential && (
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
                  render={({ field: { onChange } }) => (
                    <Input
                      onChange={onChange}
                      id="password"
                      type="password"
                      name="password"
                      required
                    />
                  )}
                />
                {errors.password && (
                  <small className="text-red-200">This is required.</small>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  variant={"default"}
                  className="w-full cursor-pointer"
                >
                  {login.isPending ? "logging in" : "Login"}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                to="/auth/register"
                className="underline underline-offset-4"
              >
                Create One
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
