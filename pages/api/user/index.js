import { NextResponse } from 'next/server'


export default async function GET(request) {
    return NextResponse.json({ success: true }, )
}