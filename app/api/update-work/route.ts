import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function PUT(request: Request) {
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

    // Find the row in the Google Sheet based on the data in column A
    const getResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.NEXT_PUBLIC_SPREADSHEET_ID,
      range: "Works!A:A", // Assuming column A contains the IDs
    });

    const rows = getResponse.data.values || [];
    const rowIndex = rows.findIndex((row) => row[0] === body.id);

    if (rowIndex === -1) {
      return NextResponse.json(
        { error: "Work with the specified ID not found." },
        { status: 404 }
      );
    }

    // update the work in the Google Sheets
    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.NEXT_PUBLIC_SPREADSHEET_ID,
      range: `Works!A${rowIndex + 1}`, // Assuming the ID is in column A
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [
            body.id,
            body.title,
            body.thumbnail1 || "",
            body.thumbnail2 || "",
            body.content,
            body.createdAt || new Date().toISOString(),
            JSON.stringify(body.tags),
          ],
        ],
      },
    });
    // Simulate saving the data (replace with actual database logic)

    // Respond with the created work
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error creating work:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the work." },
      { status: 500 }
    );
  }
}
