import { Queue } from 'bullmq';
import { NextResponse } from "next/server";

export async function GET(req: Request , {params} : {params: Promise<{authorizedKey: string}>}) {
    const {authorizedKey} = await params
    
    if(authorizedKey !== process.env.JOBS_AUTHORIZE_KEY) {
        return NextResponse.json({
            status: 403, 
            message: "authorized token is wrong"

        }, {
            status: 403,
        })
    }

    const jobQueue = new Queue('jobs');
    await jobQueue.add("update-currency", {task:"update-currency", time: new Date().toISOString()});

    // after running all cronjobs
    return NextResponse.json({
            status: 200, 
            message:"all cronjobs runned successfully"
    }, {
        status: 200,
    })
}