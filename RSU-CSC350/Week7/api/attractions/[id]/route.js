import { NextResponse } from "next/server";
import { mySQLPool } from "@/utils/db";

export async function GET(request, { params }) {
    const id = params.id;
    const promisePool = mySQLPool.promise()
    const [rows, fields] = await promisePool.query("SELECT * FROM attractions WHERE id = ?;", [ id ]) 

    return NextResponse.json(rows[0]);
}