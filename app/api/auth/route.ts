import { NextResponse } from "next/server";
import { db } from "../../../lib/utils/db";
import { hash } from "bcrypt";
var jwt = require('jsonwebtoken');

//SECTION - For getting user API Endpoint
export async function GET() {
  try {

    const users = await db.user.findMany();
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

//SECTION - For Deleting user Api Endpoint
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { email} = body;

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

//SECTION - For update user Api Endpoint

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

//SECTION -  For Creating Api Endpoint

export async function POST(req: Request){
    try {
        const body = await req.json();
        

        const {email,username,password} =body;

        // Check if email already exits
        const existingUserByEmail = await db.user.findUnique({
            where : {email:email}
        });
        if(existingUserByEmail){
            return NextResponse.json({user : null,message:"User with this email already exist"},{status:409});
        }

        // check if username is already exist

        const existingUserByUsername = await db.user.findUnique({
            where : {username:username}
        });
        if(existingUserByUsername){
            return NextResponse.json({user : null,message:"User with this username already exist"},{status:409});
        }
        const hashedPassword = await hash(password,10)
        const token = jwt.sign({ username,email }, 'secretKeyhaiye');
        const newUser = await db.user.create({
            data:{
                username,
                email,
                password : hashedPassword
            }
        })
       const {password: newUserPassword, ...rest} = newUser; 

        const response = NextResponse.json({user:rest,message:"User Created successfully"},{status:201}) 
        response.cookies.set('token',token);
        return response;
    } catch (error) {
            return NextResponse.json({message:"Error while creating user"},{status: 409})
    }
}

