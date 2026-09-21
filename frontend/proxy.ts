import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export default async function proxy(request: NextRequest) {
	const accessToken = request.cookies.get('access_token')?.value
    const refreshToken = request.cookies.get('refresh_token')?.value

    if (!accessToken && refreshToken) {
        const refreshApi = axios.create({
            baseURL: process.env.BACKEND_SERVER_URI,
            headers: { cookie: `refresh_token=${refreshToken}` },
        });

        const refresh_response = await refreshApi.post("/api/auth/refresh")

        const response = NextResponse.next()
        response.cookies.set("access_token", refresh_response.data.access_token, {
            httpOnly: false,
            secure: true,
            maxAge: 60 * 15 // 15 минут
        })

        return response
    }
    
    return NextResponse.next()
}