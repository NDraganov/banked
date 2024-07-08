"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { authFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "./FormInput";
import { signUp } from "@/lib/user.actions";
import { LoaderCircle, LoaderPinwheel } from "lucide-react";

export default function AuthForm({ type }: { type: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  // Define the Form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      // Sign up with Appwrite
      if (type === "sign-up") {
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address: data.address!,
          city: data.city!,
          postCode: data.postCode!,
          dateOfBirth: data.dateOfBirth!,
          email: data.email,
          password: data.password,
        };

        const newUser = await signUp(userData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-5 py-10 md:gap-8">
      <header className="flex items-center justify-center">
        <div className="">
          <h1 className="text-3xl lg:text-36 font-semibold">
            {type === "sign-in" ? "Sign In" : "Sign Up"}
            <p className="text-lg font-normal text-gray-600">
              Please enter your details
            </p>
          </h1>
        </div>
      </header>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {type === "sign-up" && (
            <>
              <div className="flex justify-between">
                <FormInput
                  control={form.control}
                  name="firstName"
                  label="First Name"
                  placeholder="Enter your first name"
                />
                <FormInput
                  control={form.control}
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter your first name"
                />
              </div>
              <FormInput
                control={form.control}
                name="address"
                label="Address"
                placeholder="Enter your specific address"
              />

              <div className="flex gap-4 justify-between">
                <FormInput
                  control={form.control}
                  name="city"
                  label="City"
                  placeholder="Enter your city"
                />
                <FormInput
                  control={form.control}
                  name="postCode"
                  label="Post Code"
                  placeholder="Example: 11101"
                />
              </div>
              <div className="flex gap-4">
                <FormInput
                  control={form.control}
                  name="dateOfBirth"
                  label="Date of Birth"
                  placeholder="YYYY-MM-DD"
                />
              </div>
            </>
          )}

          <FormInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter your email"
          />

          <FormInput
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
          />
          <div className="flex items-center justify-center my-5">
            <Button type="submit">
              {isLoading ? (
                <>
                  <LoaderCircle size={20} className="animate-spin" /> &nbsp;
                  Loading...
                </>
              ) : type === "sign-in" ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
