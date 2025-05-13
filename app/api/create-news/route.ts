import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the input
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: "Title and content are required." },
        { status: 400 }
      );
    }

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

    // Simulate saving the data (replace with actual database logic)
    const newNew = {
      id: body.id || Date.now().toString(),
      title: body.title,
      content: body.content,
      createdAt: body.createdAt || new Date().toISOString(),
      thumbnail1: body.thumbnail1 || "",
      thumbnail2: body.thumbnail2 || "",
      tags: body.tags,
    };

    // Append the new new to the Google Sheets
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.NEXT_PUBLIC_SPREADSHEET_ID,
      range: "News",
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [
            newNew.id,
            newNew.title,
            newNew.thumbnail1,
            newNew.thumbnail2,
            newNew.content,
            newNew.createdAt,
            JSON.stringify(newNew.tags),
          ],
        ],
      },
    });

    // Respond with the created new
    return NextResponse.json({ newNew, success: true }, { status: 201 });
  } catch (error) {
    console.error("Error creating new:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the new." },
      { status: 500 }
    );
  }
}
