import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "./utils/supabase/createMiddlewareSupabaseClient";

export async function middleware(request: NextRequest) {
  try {
    const { supabase, response } = createClient(request);

    // Refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
    await supabase.auth.getUser();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // For protected API handlers
    if (request.nextUrl.pathname.startsWith("/api/protected")) {
      // Check auth condition
      if (!session) {
        // No session. Return 401 error.
        return new Response(
          JSON.stringify({ result: "error", message: "Please log in." }),
          {
            status: 401,
          }
        );
      }
    }

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  } // For protected API handlers
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
