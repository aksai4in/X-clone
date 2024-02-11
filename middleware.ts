import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { withAuth } from "next-auth/middleware";
export default withAuth({
  pages: {
    signIn: "/",
  },
});

export const config = {
  matcher: ["/((?!register|login|signup|$).*)"],
};
