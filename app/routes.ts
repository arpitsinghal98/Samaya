import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),

    // Authentication routes
    route("api/auth/signup", "routes/api.auth.signup.tsx"),
    route("api/auth/login", "routes/api.auth.login.tsx"),
    route("api/auth/logout", "routes/api.auth.logout.tsx"),
    route("api/auth/verify-email", "routes/api.auth.verify-email.tsx"),

    // App routes
    route("dashboard", "routes/dashboard.tsx"),
    route("verify", "routes/verify.tsx"),
] satisfies RouteConfig;
