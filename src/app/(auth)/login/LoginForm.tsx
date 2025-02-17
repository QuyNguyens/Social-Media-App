"use client"

import { loginSchema, LoginValues } from "@/lib/validation"
import { useForm } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "./actions";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
import { redirect } from "next/navigation";

const LoginForm = () => {
     
     const [error, setError] = useState<string>();

     const [isPending, startTransition] = useTransition();

     const form = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: ""
        }
     })

     async function onSubmit(values: LoginValues) {
        setError(undefined)

        startTransition( async () =>{
            const {error, success} = await login(values)

            if(success){
                redirect("/");
            }else{
                setError(error)
            }
        })
     }

    return (
    <Form {...form}>
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3"
        >
            {error && <p className="text-center text-destructive">{error}</p>}

            <FormField
                control={form.control}
                name="username"
                render = {({field}) =>(
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
                name="password"
                render = {({field}) => (
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
                Login
            </LoadingButton>
        </form>
    </Form>
  )
}

export default LoginForm