import { fetcher } from "@/lib/api";
import { SessionData } from "@/types/api";
import useSWR from "swr";

export const useSession = () => {
    const { data } = useSWR<SessionData>("/api/sessions", fetcher);

    return data;
};
