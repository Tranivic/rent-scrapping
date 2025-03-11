const WorkerNodes = require('worker-nodes');
const { PrismaClient } = require('@prisma/client');
const convertMilliseconds = require('@utils/utils').convert_milliseconds;
const prisma = new PrismaClient();
const path = require('path');

const data = {
    workers: [],
    routine_initiated: false

};

exports.init_routine = async () => {
    const currentWorkers = await prisma.Workers.findMany() ?? null;
    try {
        if (!data.routine_initiated || data.workers.length !== currentWorkers.length) {
            console.log("Wainting for routine...");
            data.workers = currentWorkers;
            const intervals = data.workers.map(worker => worker.intervalMs).filter((item, pos, self) => self.indexOf(item) === pos);
            if (intervals.length) {
                console.log(`Intervals routine: ${intervals.map(interval => convertMilliseconds(interval))}`);
                intervals.forEach(interval => {
                    const workerNodes = new WorkerNodes(path.resolve(__dirname, './scrap_task.js'));
                    setInterval(async () => {
                        data.workers = await prisma.Workers.findMany();
                        const workersFromThisInterval = data.workers.filter(worker => worker.intervalMs === interval);
                        for (const worker of workersFromThisInterval) {
                            await workerNodes.call(worker).catch(err => {
                                console.error(`Error processing worker ${worker.id}:`, err);
                            });
                        }
                    }, interval);
                });
                data.routine_initiated = true;
                console.log("Routine initializing...");
            }
            return;
        }
        console.log("Routine initialized...");
    } catch (error) {
        console.error("Error initializing routine:", error);
        throw error;
    }
};