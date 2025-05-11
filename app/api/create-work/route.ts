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
    const newWork = {
      id: body.id || Date.now().toString(),
      title: body.title,
      content: body.content,
      createdAt: body.createdAt || new Date().toISOString(),
      thumbnail1: body.thumbnail1 || "",
      thumbnail2: body.thumbnail2 || "",
      tags: body.tags,
    };

    // Append the new work to the Google Sheets
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.NEXT_PUBLIC_SPREADSHEET_ID,
      range: "Works",
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [
            newWork.id,
            newWork.title,
            newWork.thumbnail1,
            newWork.thumbnail2,
            newWork.content,
            newWork.createdAt,
            JSON.stringify(newWork.tags),
          ],
        ],
      },
    });

    // Respond with the created work
    return NextResponse.json({ newWork, success: true }, { status: 201 });
  } catch (error) {
    console.error("Error creating work:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the work." },
      { status: 500 }
    );
  }
}
