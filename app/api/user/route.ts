import { NextResponse } from "next/server";
import { db } from "../../../lib/utils/db";

export async function GET() {
  try {

    const users = await db.user.findMany();
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = body;

    if (!email) {
      return NextResponse.json({ error: "Email address is required" }, {
        status: 400,
      });
    }

    const deleteUser = await db.user.delete({
      where: {
        email:email
      },
    });

    if (!deleteUser) {
      return NextResponse.json({ error: "User not found" }, {
        status: 404,
      });
    }

    try {
      return NextResponse.json({ body, message: "User Deleted Successfully" }, {
        status: 200,
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Failed to send response" }, {
        status: 500,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An unexpected error occurred" }, {
      status: 500,
    });
  }
}

export async function PUT(req:Request) {
  try {
    const body = await req.json();
    const {email, username,password} = body;

    const updateUser = await db.user.update({
      where: {email:email},
      data: {
        email: 'updated email',
      },
    });
    return NextResponse.json({message : "user email is updated "},{status:200});

  } catch (error) {
    return NextResponse.json({message:"Error has occurred "},{status:500});
  }
}
