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
import { SignupValidation } from "../../lib/validation";
import {z} from "zod";
import { Link, useNavigate } from "react-router-dom";
import BarLoader from "../../components/shared/Loader";
import { useToast } from "../../components/ui/use-toast";
import { useCreateUserAccount, useSignInAccount } from "../../lib/react-query/queriesAndMutations";
import { useUserContext } from "../../context/AuthContext";

interface SignUpFormProps {
  title: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({title}) => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();

  const clickLinkTag = () => {
    document.addEventListener("click", () => {
        document.title = "Login | Digeon"
    })
  }

  title = "Sign Up - Digeon";
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "We miss you...";
      } else {
        document.title = title;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
    
  }, [title]);

  const { mutateAsync: createUserAccount , isPending: isCreatingAccount } = useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSigningIn } = useSignInAccount();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = async (user: z.infer<typeof SignupValidation>) => {
    try {
      const newUser = await createUserAccount(user);

      if (!newUser) {
        toast({ title: "Sign up failed. Please try again.", });
        console.log("New User not found.");
        return;
      }

      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });

      if (!session) {
        toast({ title: "Something went wrong. Please login your new account", });
        console.log("Session not available");
        navigate("/sign-in");
        
        return;
      }

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();

        navigate("/");
      } else {
        toast({ title: "Login failed. Please try again.", });
        console.log("Failed isLoggedIn");

        return;
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="flex relative top-4 items-center justify-evenly flex-col min-h-[30rem] w-[28rem] gap-8">
        <h2 className="text-5xl absolute -top-20 w-[130%] text-white font-bold text-center tracking-wider">Welcome to 
        <span className="text-primary-dark font-light"> Digeon</span>!</h2>
        <div className="flex items-center justify-start flex-col gap-5 w-full">
          <h2 className="text-white text-5xl font-bold">Join Now<span className="text-primary-dark">.</span></h2>
        </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white text-1xl w-full">Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white text-1xl w-full">Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                {isCreatingAccount || isUserLoading || isSigningIn ? (
                  <div className="flex items-center justify-center gap-5">
                    <BarLoader />
                  </div>
                ):
                "Sign Up"
                }
              </GradientShadowButton> 

              <p className="text-white mt-2">
                  Already have an account? <Link onClick={clickLinkTag}
                  className="text-blue-300 transition-all duration-200 hover:text-blue-500" to="/sign-in">
                      Sign In
                  </Link></p>
          </div>
        </form>
      </Form>
    </div>
    
  )
}

export default SignUpForm
