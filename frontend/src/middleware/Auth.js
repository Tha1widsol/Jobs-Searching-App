import { useAuth } from "../contexts/AuthContext"
import { Navigate, Outlet, useLocation } from "react-router-dom"

export default function AuthMiddleware() {
    const { accessToken } = useAuth()
    const location = useLocation()

    return (accessToken ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />)

}