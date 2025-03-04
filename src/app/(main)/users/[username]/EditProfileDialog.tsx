import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PostsPage, UserProfileInfo } from '@/lib/types'
import { updateUserProfileSchema, updateUserProfileValues } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { updateProfile } from './actions';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import AvatarUpload from './AvatarUpload';

type EditProfileDialogProps = {
    user: UserProfileInfo;
    open: boolean;
    onOpenChange: (open: boolean) => void | null;
    setUserInfo: (user: UserProfileInfo | null) => void;
}

const EditProfileDialog = ({user, open, onOpenChange, setUserInfo}: EditProfileDialogProps) => {

  const [error, setError] = useState(false);
  const [avatar, setAvatar] = useState(user.user.avatar);
  const queryClient = useQueryClient();

    const form = useForm<updateUserProfileValues>({
      resolver: zodResolver(updateUserProfileSchema),
      defaultValues: {
        userName: user.user.userName,
      }
    })

    async function onSubmit (values: updateUserProfileValues){

      const {success} = await updateProfile(values,avatar,user.user.id);

      if(success){
        onOpenChange(false);
        setError(false);
        
        queryClient.setQueryData(["post-feed", "following", user.user.id], (oldData: { pages: PostsPage[] } | undefined) => {
          if (!oldData) return undefined;
        
          const data = {
              ...oldData,
              pages: oldData.pages.map((page) => ({
                ...page,
                posts: page.posts.map(post =>
                  post.userId === user.user.id ? { ...post, userName: values.userName, avatar } : post
                ),
              })),
            };

          return data;
        });

        queryClient.setQueryData(["post-feed", "for-you"], (oldData: { pages: PostsPage[] } | undefined) => {
          if (!oldData) return undefined;
        
          const data = {
              ...oldData,
              pages: oldData.pages.map((page) => ({
                ...page,
                posts: page.posts.map(post =>
                  post.userId === user.user.id ? { ...post, userName: values.userName, avatar } : post
                ),
              })),
            };

          return data;
        });
        setUserInfo({
          ...user,
          user: {
              ...user.user,
              userName: values.userName,
              avatar,
          }
      });
      }{
        setError(true);
      }
    }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                {error && <p className='text-destructive text-sm mt-2'>Some thing wrong. Please try gain!!!</p>}
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>

              <FormLabel>Avatar</FormLabel>
              <AvatarUpload avatar={avatar} setAvatar={setAvatar}/>

                <FormField
                  control={form.control}
                  name="userName"
                  render= {({field}) => (
                    <FormItem>
                      <FormLabel>UserName</FormLabel>
                      <FormControl>
                        <Input placeholder='your name' {...field}/>
                      </FormControl>
                    </FormItem>
                  )}
                >
                </FormField>
                <DialogFooter>
                  <Button type="submit">Save</Button>
                </DialogFooter>
              </form>
            </Form>
        </DialogContent>
    </Dialog>
  )
}

export default EditProfileDialog