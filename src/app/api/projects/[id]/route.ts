import { NextResponse } from "next/server";
import { ObjectId } from 'mongodb';
import connectMongoDB from "@/lib/db";
import ProjectDetailsModel from "@/models/project-details.model";

export async function PATCH(request) {
    try {
        const { id } = params;
        const updateData = await request.json();

        // Check if the id is a valid ObjectId
        if (!ObjectId.isValid(id)) {
            return NextResponse.json(
                {
                    status: 400,
                    message: "Invalid project ID format",
                },
                { status: 400 }
            );
        }

        await connectMongoDB();
        const res = await ProjectDetailsModel.findByIdAndUpdate(id, { ...updateData });

        return NextResponse.json(
            {
                status: 200,
                message: "Request success",
                data: res
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function GET(request, { params }) {
    const { id } = params;

    const projectName = id;
    let projectsFields = {
        _id: 1,
        projectName: 1,
        // clientName: 1,
        // city: 1,
        // budget: 1,
        // completedYear: 1,
        projectPictures: 1,
    }

    await connectMongoDB();

    try {
        const res = await ProjectDetailsModel.findOne({ projectName: projectName }, projectsFields);

        if (!res) {
            return NextResponse.json(
                {
                    status: 404,
                    message: "Project not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                status: 200,
                message: "Request success",
                data: res
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                status: 500,
                message: "Internal Server Error",
                error: error.message,
            },
            { status: 500 }
        );
    }
}