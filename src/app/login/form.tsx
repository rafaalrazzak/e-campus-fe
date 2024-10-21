"use client";

import { login } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useAction } from "next-safe-action/hooks";

export default function LoginForm() {
    const { execute, isPending } = useAction(login);

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
                <CardTitle className="text-center text-2xl font-bold">Login</CardTitle>
                <CardDescription className="text-center">Masukan email dan password untuk melanjutkan</CardDescription>
            </CardHeader>
            <form action={execute} className="space-y-4">
                <Input name="email" type="email" placeholder="me@example.com" required />

                <Input name="password" type="password" placeholder="Enter your password" required />

                <CardFooter className="flex flex-col space-y-2">
                    <Button type="submit" className="w-full" disabled={isPending}>
                        Login
                    </Button>
                    <Button variant="link" className="w-full">
                        Lupa password?
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
