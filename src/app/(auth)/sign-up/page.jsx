"use client"
import React from 'react';
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { signIn, signUp } from '@/lib/auth-client';


const SignUpPage = () => {

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const datas = Object.fromEntries(formData.entries());
        console.log(datas);

        const { data, error } = await signUp.email({
            name: datas.name,
            email: datas.email,
            password: datas.password,
        })

        console.log("after signup data",data, error);

    }
    const handleGooglesSignIn=async ()=>{
        const resData=await signIn.social({
            provider:'google'
        });
        console.log(resData);
    }
    const handleGithubsSignIn=async ()=>{
        const githubData = await signIn.social({
        provider: "github"       
        });
        console.log(githubData);
    }

    

    return (
        <div>
            hi sign
            <div>
                <Form
                    className="flex w-96 flex-col gap-4"
                    render={(props) => <form {...props} data-custom="foo" />}
                    onSubmit={onSubmit}
                >

                    <TextField
                        isRequired
                        name="name"
                        validate={(value) => {
                            if (value.length < 3) {
                                return "Name must be at least 3 characters";
                            }
                            return null;
                        }}
                    >
                        <Label>Name</Label>
                        <Input placeholder="John Doe" variant="secondary" />
                        <FieldError />
                    </TextField>



                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label>Email</Label>
                        <Input placeholder="john@example.com" />
                        <FieldError />
                    </TextField>
                    <TextField
                        isRequired
                        minLength={8}
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 8) {
                                return "Password must be at least 8 characters";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }
                            if (!/[0-9]/.test(value)) {
                                return "Password must contain at least one number";
                            }
                            return null;
                        }}
                    >
                        <Label>Password</Label>
                        <Input placeholder="Enter your password" />
                        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                        <FieldError />
                    </TextField>
                    <div className="flex gap-2">
                        <Button type="submit">

                            Submit
                        </Button>
                        <Button type="reset" variant="secondary">
                            Reset
                        </Button>
                    </div>
                </Form>

                <p>OR</p>
                <div>
                <Button onClick={handleGooglesSignIn}>Sign In with Google</Button>
                <Button onClick={handleGithubsSignIn}>Sign In with github</Button>

                </div>
            </div>
        </div>
    );
};

export default SignUpPage;