
import { NextResponse } from "next/server";
import {hash} from 'bcrypt';
import { db } from "../../../../lib/utils/db";



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
        const newUser = await db.user.create({
            data:{
                username,
                email,
                password : hashedPassword
            }
        }) 
       const {password: newUserPassword, ...rest} = newUser; 

        return NextResponse.json({user:rest,message:"User Created successfully"},{status:201}); 
    } catch (error) {
            return NextResponse.json({message:"Error while creating user"},{status: 409})
    }
}

