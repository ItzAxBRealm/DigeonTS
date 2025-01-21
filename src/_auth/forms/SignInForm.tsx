import GradientShadowButton from "../../components/Button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "../../components/ui/input";
import { useEffect } from "react";
import { SigninValidation } from "../../lib/validation";
import {z} from "zod";
import { Link, useNavigate } from "react-router-dom";
import BarLoader from "../../components/shared/Loader";
import { useToast } from "../../components/ui/use-toast";
import { useUserContext } from "../../context/AuthContext";
import { useSignInAccount } from "../../lib/react-query/queriesAndMutations";

type PostTitleProp = {
  title: string;
}

const SigninForm = ({ title }: PostTitleProp ) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  // Query
  const { mutateAsync: signInAccount, isPending: isLoading } = useSignInAccount();
  const clickLinkTag = () => {
    document.addEventListener("click", () => {
        document.title = "Sign Up | Digeon"
    })
}

  title = "Sign Up - Digeon";
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Left the Tab
        document.title = "We miss you...";
      } else {
        // Active
        document.title = title;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
    
  }, [title]);

    // 1. Define your form.
    const form = useForm<z.infer<typeof SigninValidation>>({
      resolver: zodResolver(SigninValidation),
      defaultValues: {
        email: '',
        password: '',
      },
    })

    const onSubmit = async (user: z.infer<typeof SigninValidation>) => {
      const session = await signInAccount(user);
  
      if (!session) {
        toast({ title: "Login failed. Please try again." });
        
        return;
      }
  
      const isLoggedIn = await checkAuthUser();
  
      if (isLoggedIn) {
        form.reset();
  
        navigate("/");
      } else {
        toast({ title: "Login failed. Please try again.", });
        
        return;
      }
    };
    return (
      <div className="flex relative top-4 items-center justify-evenly flex-col min-h-[30rem] w-[28rem] gap-8">
         <h2 className="text-6xl absolute -top-20 w-[120%] text-white font-bold text-center tracking-wider">Welcome back to 
         <span className="text-primary-dark font-light"> Digeon</span>!</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-1xl w-full">Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-1xl w-full">Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-start flex-col gap-4 w-full mb-3">
                <GradientShadowButton 
                type="submit" 
                className={`w-full`}
                >
                  {isLoading || isUserLoading ? (
                    <div className="flex items-center justify-center gap-5">
                      <BarLoader />
                    </div>
                  ):
                  "Sign In"
                  }
                </GradientShadowButton> 

                <p className="text-white mt-2">
                  Don&apos;t have an account? <Link onClick={clickLinkTag}
                    className="text-blue-300 transition-all duration-200 hover:text-blue-500" to="/sign-up">
                        Sign Up
                    </Link></p>
            </div>
          </form>
        </Form>
      </div>
      
    )
}

export default SigninForm