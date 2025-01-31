import { Routes, Route } from "react-router-dom"
import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile } from "./_root/pages"
import RootLayout from "./_root/RootLayout";
import SignUpForm from "./_auth/forms/SignUpForm";
import SigninForm from "./_auth/forms/SignInForm";
import AuthLayout from "./_auth/AuthLayout";
import { Toaster } from "./components/ui/toaster";

const App = () => {
  return (
      <main className="flex h-screen">
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SigninForm title="Sign In" />} />
            <Route path="/sign-up" element={<SignUpForm title="Sign Up" />} />
          </Route>
        
          <Route element={<RootLayout />}>
            <Route index element={<Home title="Home - Digeon" />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/all-users" element={<AllUsers />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:id" element={<EditPost />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/profile/:id/*" element={<Profile />} />
            <Route path="/update-profile/:id" element={<UpdateProfile />} />
          </Route>
        </Routes>

        <Toaster />
      </main>
    
  )
}

export default App