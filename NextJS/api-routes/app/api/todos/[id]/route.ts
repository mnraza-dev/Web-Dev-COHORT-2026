import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
    params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: RouteContext) {
    const { id } = await params;

    try {
        if (!id) {
            return NextResponse.json({
                success: false,
                message: "bhai params nhi h",
                status: 400
            })
        }
        const todo = await prisma.todo.findUnique({
            where: {
                id,
            },
        })

        if (!todo) {
            return NextResponse.json({
                success: false,
                error: "todo not found",
                status: 404
            })
        }
        return NextResponse.json({
            success: true,
            data: todo
        },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json({
            success: false,
            error: "Failed to find todo",
            status: 500
        })
    }
}

export async function PUT(
    request: NextRequest,
    { params }: RouteContext
  ) {
    const { id } = await params;

    try {
      const { title, completed } = await request.json();
  
      if (!id) {
        return NextResponse.json(
          {
            success: false,
            message: "ID is required",
          },
          { status: 400 }
        );
      }

      const data: { title?: string; completed?: boolean } = {};
      if (title !== undefined) data.title = title;
      if (completed !== undefined) data.completed = completed;

      if (Object.keys(data).length === 0) {
        return NextResponse.json(
          {
            success: false,
            message: "Title or completed is required",
          },
          { status: 400 }
        );
      }
  
      const todo = await prisma.todo.update({
        where: {
          id,
        },
        data,
      });
  
      return NextResponse.json(
        {
          success: true,
          data: todo,
        },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to update todo",
        },
        { status: 500 }
      );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: RouteContext
  ) {
    const { id } = await params;

    try {
      if (!id) {
        return NextResponse.json(
          {
            success: false,
            message: "ID is required",
          },
          { status: 400 }
        );
      }
  
      await prisma.todo.delete({
        where: {
          id,
        },
      });
  
      return NextResponse.json(
        {
          success: true,
          message: "Todo deleted!",
        },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to delete todo",
        },
        { status: 500 }
      );
    }
}