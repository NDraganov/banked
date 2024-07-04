"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { authFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "./FormInput";

export default function AuthForm({ type }: { type: string }) {
  const formSchema = authFormSchema(type);

  // Define the Form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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
        <form>
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
              {type === "sign-in" ? "Sign In" : "Sing Up"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
