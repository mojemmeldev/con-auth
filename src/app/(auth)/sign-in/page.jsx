"use client";
import React, { useState } from 'react';
import { Button, Description, FieldError, Form, Input, InputGroup, Label, TextField } from "@heroui/react";
import { signIn } from '@/lib/auth-client';
import { Eye, EyeSlash } from "@gravity-ui/icons";

const LogInPage = () => {

  const [isVisible, setIsVisible] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const datas = Object.fromEntries(formData.entries());
    console.log(datas);

    const { data, error } = await signIn.email({
      email: datas.email,
      password: datas.password,
      rememberMe: true,
      callbackURL: "/"
    })
    console.log(data, error);

  }



  return (
    <div>
      hi log
      <div>
      <Form
        className="flex w-96 flex-col gap-4"
        onSubmit={onSubmit}
      >
        {/* Email */}
        <TextField
          isRequired
          name="email"
          type="email"
          className="w-full"
          validate={(value) => {
            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
            ) {
              return "Please enter a valid email address";
            }

            return null;
          }}
        >
          <Label>Email</Label>

          <Input placeholder="john@example.com" />

          <FieldError />
        </TextField>

        {/* Password */}
        <TextField
          isRequired
          name="password"
          className="w-full"
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

          <InputGroup>
            <InputGroup.Input
              type={isVisible ? "text" : "password"}
              placeholder="Enter your password"
            />

            <InputGroup.Suffix className="pe-0">
              <Button
                isIconOnly
                type="button"
                aria-label={
                  isVisible ? "Hide password" : "Show password"
                }
                size="sm"
                variant="ghost"
                onPress={() => setIsVisible((prev) => !prev)}
              >
                {isVisible ? (
                  <EyeSlash className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </Button>
            </InputGroup.Suffix>
          </InputGroup>

          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>

          <FieldError />
        </TextField>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button type="submit">
            Submit
          </Button>

          <Button
            type="reset"
            variant="secondary"
          >
            Reset
          </Button>
        </div>
      </Form>
    </div>
    </div>
  );
};

export default LogInPage;