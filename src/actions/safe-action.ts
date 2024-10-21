import { serverToast } from "@/lib/toast/server-toast";

import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient({
    handleServerError(e) {
        serverToast.error(e.message);
    },
});
