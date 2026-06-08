import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const todos = await prisma.todo.findMany();
        return NextResponse.json({
            success: true,
            status: 200,
            data: todos
        })

    } catch (error) {
        return NextResponse.json({
            success: false,
            status: 500,
            error: "Failed to fetch the todos",
        })
    }
}

export async function POST(request: NextRequest) {
    try {
        const { title } = await request.json();
        if (!title) {
            return NextResponse.json({
                success: false,
                error: 'Tilte is required !',

            }, { status: 400 })
        }
        const todo = await prisma.todo.create({
            data: {
                title: title
            }
        })
        return NextResponse.json({
            success: true,
            data: todo,

        }, { status: 201 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            error: "Failed to create todo",
        },
            { status: 500 }
        )
    }

}

