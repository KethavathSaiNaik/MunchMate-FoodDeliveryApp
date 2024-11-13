const User = require('../models/Users')
const Orders = require('../models/Orders')
const Fooditem = require('../models/Fooditem')
const Reviews = require('../models/Review')
const Donations = require('../models/Donation')
const express = require('express');
const router = express.Router();
router.get("/info", async (req, res) => {
    const thirtyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 30));
    // Get the current date
    const today = new Date();

    // Calculate the start of this week (current week's Sunday)
    const thisWeekStart = new Date(today);
    thisWeekStart.setDate(today.getDate() - today.getDay()); // Set the date to the previous Sunday (start of the week)
    thisWeekStart.setHours(0, 0, 0, 0); // Set the time to midnight at the start of the day

    // Calculate the end of this week (upcoming Saturday)
    const thisWeekEnd = new Date(thisWeekStart);
    thisWeekEnd.setDate(thisWeekStart.getDate() + 6); // Set the date to the upcoming Saturday (end of the week)
    thisWeekEnd.setHours(23, 59, 59, 999); // Set the time to the end of the day

    // Calculate the start of last week (previous week's Sunday)
    const lastWeekStart = new Date(thisWeekStart);
    lastWeekStart.setDate(thisWeekStart.getDate() - 7); // Move to the previous Sunday's date
    lastWeekStart.setHours(0, 0, 0, 0); // Set the time to midnight at the start of the day

    // Calculate the end of last week (previous week's Saturday)
    const lastWeekEnd = new Date(lastWeekStart);
    lastWeekEnd.setDate(lastWeekStart.getDate() + 6); // Set the date to the previous Saturday
    lastWeekEnd.setHours(23, 59, 59, 999); // Set the time to the end of the day

  



    try {
        // User Analytics
        const totalUsers = await User.countDocuments();
        const activeUsers = await User.countDocuments({ date: { $gte: thirtyDaysAgo } });
        const lastWeekUsers = await User.countDocuments({ date: { $gte: lastWeekStart, $lt: lastWeekEnd } });
        const thisWeekUsers = await User.countDocuments({ date: { $gte: thisWeekStart, $lt: thisWeekEnd } });
        const growthRate = lastWeekUsers ? ((thisWeekUsers - lastWeekUsers) / lastWeekUsers) * 100 : 0;
        const newUsers = await User.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$date" }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Order Analytics
        const totalOrders = await Orders.countDocuments();
     

        // Review Analytics
        const totalReviews = await Reviews.countDocuments();
        const averageRating = await Reviews.aggregate([
            { $group: { _id: null, avgRating: { $avg: "$rating" } } }
        ]);
    
        const mostReviewedItems = await Reviews.aggregate([
            { $group: { _id: "$itemOrdered", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // Send response with success: true
        res.json({
            success: true,
            userAnalytics: {
                totalUsers,
                activeUsers,
                lastWeekUsers,
                thisWeekUsers,
                growthRate,
                newUsers
            },
            orderAnalytics: {
                totalOrders
               
            },
            reviewAnalytics: {
                totalReviews,
                averageRating,
                mostReviewedItems
            }
        });

    } catch (error) {
        // Send error response
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }

})
module.exports = router;