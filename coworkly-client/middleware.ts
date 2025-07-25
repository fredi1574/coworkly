import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });

  await supabase.auth.getSession();

  // const supabase = createServerClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  //   {
  //     cookies: {
  //       getAll: () =>
  //         Object.entries(req.cookies).map(([key, value]) => ({
  //           name: key,
  //           value,
  //         })),
  //       setAll: (cookies) => {
  //         cookies.forEach(({ name, value, options }) => {
  //           res.cookies.set(name, value, options);
  //         });
  //       },
  //     },
  //   },
  // );

  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  // console.log("SESSION IN MIDDLEWARE:", session);

  if (!session && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*", "/actions/:path*"],
};
