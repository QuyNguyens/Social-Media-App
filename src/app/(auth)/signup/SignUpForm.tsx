"use client";

import { signUpSchema, SignUpValues } from "@/lib/validation";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { signUp } from "./actions";
import LoadingButton from "@/components/LoadingButton";
import { redirect } from "next/navigation";

const SignUpForm = () => {
  
    const [error, setError] = useState<string>();

    const [isPending, startTransition] = useTransition();

    const form = useForm<SignUpValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            username: "",
            password: ""
        }
    })

    async function onSubmit(values: SignUpValues) {
        setError(undefined);

        startTransition(async () =>{
            const {error,success} = await signUp(values);
            if(success) redirect('/login')
            else setError(error)
        })
    }

  return (
    <Form {...form}>
        <form 
            className="space-y-3"
            onSubmit={form.handleSubmit(onSubmit)}    
        >
            {error && <p className="text-center text-destructive">{error}</p>}
            <FormField
                control={form.control}
                name="username"
                render={({field}) =>(
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input placeholder="Username" {...field}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            >

            </FormField>
            
            <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input type="email" placeholder="Email" {...field}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            >
            </FormField>

            <FormField
                control={form.control}
                name="password"
                render = {({field}) =>(
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input placeholder="Password" type="password" {...field}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            >

            </FormField>
            <LoadingButton loading={isPending} type="submit" className="w-full">
                Create account
            </LoadingButton>
        </form>
    </Form>
  )
}

export default SignUpForm