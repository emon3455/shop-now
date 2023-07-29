const { default: AuthProvider } = require("./AuthProviders")

const Providers = ({children})=>{
    return <AuthProvider>{children}</AuthProvider>
}