"use server";

import { actionClient } from "@/actions/safe-action";
import { api } from "@/lib/api";
import { serverToast } from "@/lib/toast/server-toast";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";

const schema = zfd.formData({
    email: zfd.text(z.string().email("Invalid email address").min(3).max(255)),
    password: zfd.text(z.string().min(8).max(255)),
});

export const login = actionClient
    .schema(schema)
    .outputSchema(z.object({ token: z.string() }))
    .action(
        async ({ parsedInput: { email, password } }) => {
            const response = await api.post<{
                token: string;
            }>("auth/login", { json: { email, password } });

            if (!response.ok) {
                throw new Error("Email atau password salah");
            }

            return await response.json();
        },
        {
            onSuccess: ({ data }) => {
                if (!data) {
                    throw new Error("Data tidak ditemukan");
                }

                cookies().set("session_token", data.token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 60 * 60 * 24, // 1 day
                    path: "/",
                });

                serverToast.success("Berhasil login");

                redirect("/dashboard");
            },
        }
    );
