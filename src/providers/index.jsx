"use client"


const { default: AuthProvider } = require("./AuthProviders")


export const Providers = ({ children }) => {
    return <AuthProvider>
        {children}
    </AuthProvider>
}