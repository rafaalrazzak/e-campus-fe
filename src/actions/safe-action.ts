import { serverToast } from "@/lib/toast/server-toast";

import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient({
    async handleServerError(e) {
        await serverToast.error(e.message);
    },
});
