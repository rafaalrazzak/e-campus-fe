import ky from "ky";

export const api = ky.create({
    prefixUrl: process.env.API_URL,
    throwHttpErrors: false,
});

export const fetcher = (url: string) => fetch(url).then((res) => res.json());
