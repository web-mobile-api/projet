import cron from "node-cron";
import prisma from "../../database/databaseORM.js";

export const statusCleanUp = () => {
    cron.schedule("*/2 * * * *", async () => {
        console.log("Running cleanup job to mark inactive users as offline...");
    
        const inactivityThreshold = new Date(Date.now() - 5 * 60 * 1000);
    
        try {
            await prisma.account.updateMany({
                where: {
                    online: true,
                    last_online: { lt: inactivityThreshold },
                },
                data: {
                    online: false
                },
            });
            console.log("Inactive users marked as offline.");
        } catch (error) {
            console.error("Error marking users as offline:", error);
        }
    });
}