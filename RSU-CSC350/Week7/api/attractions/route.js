import { NextResponse } from "next/server";
import { mySQLPool } from "@/utils/db";

export async function GET(request) {
    const promisePool = mySQLPool.promise()
    const [rows, fields] = await promisePool.query("SELECT * FROM attractions;") 

    return NextResponse.json(rows);
}