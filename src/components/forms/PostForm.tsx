import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import FileUploader from "./FileUploader"
import { PostValidation } from "../../lib/validation"
import { Models } from "appwrite"
import { useUserContext } from "../../context/AuthContext"
import { useToast } from "../ui/use-toast"
import { useCreatePost, useUpdatePost } from "../../lib/react-query/queriesAndMutations"

type PostFormProps = {
  post?: Models.Document;
  action: 'Create' | 'Update';
}

const PostForm = ({ post, action }: PostFormProps) => {

  const {mutateAsync: createPost, isPending: isLoadingCreate} = useCreatePost();
  const {mutateAsync: updatePost, isPending: isLoadingUpdate} = useUpdatePost();

  const { user } = useUserContext();
  const { toast } = useToast();
  const navigate = useNavigate();

   // 1. Define your form.
   const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post.tags.join(',') : ""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    if(post && action === 'Update'){
      const updatedPost = await updatePost({
        ...values,
        postId: post.$id,
        imageId: post?.imageId,
        imageUrl: post?.imageUrl,
      })

      if(!updatedPost){
        toast({title: "Error fetching data, Please try again."})
      }

      return navigate(`/posts/${post.$id}`)
    }


    const newPost = await createPost({
      ...values,
      userId: user.id,
    })

    if(!newPost){
      toast({
        title: 'Please try again'
      })
    }

    navigate('/');
  }

  console.log(post?.imageUrl);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl text-white">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea className="shad-textarea custom-scrollbar bg-zinc-900 border-none" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                fieldChange = {field.onChange}
                mediaUrl = {post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input bg-zinc-900 border-none" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Tags (separated by comma " ,")</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input bg-zinc-900 border-none" placeholder="Design, Technology, Discover" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between gap-5 w-full">
          <Button type="button" className="py-2 px-5 rounded-md bg-zinc-900 border-none outline-none hover:bg-zinc-800 active:bg-zinc-700 w-1/2">Cancel</Button>
          <Button type="submit" className="py-2 px-5 rounded-md bg-purple-1 border-none outline-none hover:bg-purple-1/80 active:bg-purple-1/70 w-1/2" disabled={isLoadingCreate || isLoadingUpdate}>{isLoadingCreate || isLoadingUpdate && 'Loading...'}{action} Post</Button>
        </div>
      </form>
    </Form>
  )
}

export default PostForm
