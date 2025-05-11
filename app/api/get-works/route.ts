/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET() {
  try {
    // Example: Fetch data or perform some logic
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        private_key: process.env.NEXT_PUBLIC_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    const workResults: any = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.NEXT_PUBLIC_SPREADSHEET_ID,
      range: `Works`,
    });

    const mappedResult = workResults.data.values.map((item: any) => {
      return {
        id: item[0],
        title: item[1],
        thumbnail1: item[2],
        thumbnail2: item[3],
        content: item[4],
        createdAt: new Date(item[5]),
        tags: JSON.parse(item[6]),
      };
    });

    return NextResponse.json({
      success: true,
      data: mappedResult,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch show times" },
      { status: 500 }
    );
  }
}
