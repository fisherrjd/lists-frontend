import React from "react";

const authEndpoints = [
    {
        method: "GET",
        path: "/auth/test",
        description: "Test endpoint to check if AuthController is working.",
        request: null,
        response: '"AuthController is working!"',
    },
    {
        method: "POST",
        path: "/auth/register",
        description: "Register a new user.",
        request: "RegisterRequest (JSON)",
        response: "UserResponse or ErrorResponse",
    },
    {
        method: "POST",
        path: "/auth/login",
        description: "Authenticate a user and return an AuthResponse.",
        request: "LoginRequest (JSON)",
        response: "AuthResponse or ErrorResponse",
    },
    {
        method: "POST",
        path: "/auth/logout",
        description: "Logout the current user (requires Authorization header).",
        request: "Authorization: Bearer <token>",
        response: '"User logged out!" or ErrorResponse',
    },
];

export default function AuthEndpointsDisplay() {
    return (
        <div style={{ padding: 24 }}>
            <h2>Authentication API Endpoints</h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid #ccc", padding: 8 }}>Method</th>
                        <th style={{ border: "1px solid #ccc", padding: 8 }}>Path</th>
                        <th style={{ border: "1px solid #ccc", padding: 8 }}>Description</th>
                        <th style={{ border: "1px solid #ccc", padding: 8 }}>Request</th>
                        <th style={{ border: "1px solid #ccc", padding: 8 }}>Response</th>
                    </tr>
                </thead>
                <tbody>
                    {authEndpoints.map((ep, i) => (
                        <tr key={i}>
                            <td style={{ border: "1px solid #ccc", padding: 8 }}>{ep.method}</td>
                            <td style={{ border: "1px solid #ccc", padding: 8 }}>{ep.path}</td>
                            <td style={{ border: "1px solid #ccc", padding: 8 }}>{ep.description}</td>
                            <td style={{ border: "1px solid #ccc", padding: 8 }}>{ep.request}</td>
                            <td style={{ border: "1px solid #ccc", padding: 8 }}>{ep.response}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
