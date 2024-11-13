import React, { useEffect, useState } from 'react';
import { Card, Table, Container, Row, Col } from 'react-bootstrap';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement,
} from 'chart.js';

// Registering all necessary components for Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement // Ensure BarElement is registered
);

const AnalyticsDashboard = () => {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await fetch('https://munchmate-deploy-backend.onrender.com/analytics/info'); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAnalyticsData(data);
            } catch (err) {
                setError('Error fetching data: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    if (loading) {
        return <div style={styles.loading}>Loading...</div>;
    }

    if (error) {
        return <div style={styles.error}>{error}</div>;
    }

    if (!analyticsData || !analyticsData.success) {
        return <div style={styles.noData}>No data available</div>;
    }

    const {
        userAnalytics,
        orderAnalytics,
        reviewAnalytics,
    } = analyticsData;

    // Prepare data for the New Users Over Time chart
    const newUsersChartData = {
        labels: userAnalytics.newUsers.map(user => user._id), // Dates
        datasets: [
            {
                label: 'New Users',
                data: userAnalytics.newUsers.map(user => user.count), // Counts
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    const newUsersChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: 'New Users Over Time',
            },
        },
    };

    // Prepare data for the Most Reviewed Items Bar chart
    const mostReviewedItemsData = {
        labels: reviewAnalytics.mostReviewedItems.map(item => item._id), // Item Names
        datasets: [
            {
                label: 'Review Counts',
                data: reviewAnalytics.mostReviewedItems.map(item => item.count), // Counts
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const mostReviewedItemsOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: 'Most Reviewed Items',
            },
        },
    };

    // Prepare data for the Average Rating Doughnut chart
    const averageRatingData = {
        labels: ['Average Rating', 'Remaining'],
        datasets: [
            {
                label: 'Average Rating',
                data: [reviewAnalytics.averageRating[0].avgRating, 5 - reviewAnalytics.averageRating[0].avgRating], // Assuming rating out of 5
                backgroundColor: ['rgba(255, 206, 86, 0.5)', 'rgba(201, 203, 207, 0.5)'],
                borderColor: ['rgba(255, 206, 86, 1)', 'rgba(201, 203, 207, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const averageRatingOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: 'Average Rating Distribution',
            },
        },
    };

    // Prepare data for the Total Users Doughnut chart
    const totalUsersData = {
        labels: ['Total Users', 'Inactive Users'],
        datasets: [
            {
                label: 'User Status',
                data: [userAnalytics.totalUsers, userAnalytics.totalUsers - userAnalytics.activeUsers],
                backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(201, 203, 207, 0.5)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(201, 203, 207, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const totalUsersOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: 'Total Users vs Inactive Users',
            },
        },
    };

    return (
        <Container style={styles.analyticsContainer}>
            <h2 style={styles.title}>Analytics Dashboard</h2>

            {/* User Analytics */}
            <Card style={styles.card}>
                <Card.Body>
                    <Card.Title style={styles.cardTitle}>User Analytics</Card.Title>
                    <Row>
                        <Col sm={6}>
                            <h5>Total Users: {userAnalytics.totalUsers}</h5>
                            <h5>Active Users: {userAnalytics.activeUsers}</h5>
                            <h5>Last Week Users: {userAnalytics.lastWeekUsers}</h5>
                            <h5>This Week Users: {userAnalytics.thisWeekUsers}</h5>
                            <h5>Growth Rate: {userAnalytics.growthRate}%</h5>
                        </Col>
                    </Row>
                    <h6 style={styles.subTitle}>New Users Over Time</h6>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userAnalytics.newUsers.map(user => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {/* Line Chart for New Users */}

                    <div style={{ height: "500px", "width": "800px", "display": "flex", "justifyContent": "spaceAround", "alignItems": "center","marginLeft" :"150px"}}><Line data={newUsersChartData} options={newUsersChartOptions} /></div>
                    
                    <h6 style={styles.subTitle}>Total Users vs Active Users</h6>
                    <div style={{ height: "500px", "width": "800px", "display": "flex", "justifyContent": "center", "alignItems": "center","marginLeft" :"150px" }}><Doughnut data={totalUsersData} options={totalUsersOptions} /></div>
                </Card.Body>
            </Card>

            {/* Order Analytics */}
            <Card style={styles.card}>
                <Card.Body>
                    <Card.Title style={styles.cardTitle}>Order Analytics</Card.Title>
                    <h5>Total Orders: {orderAnalytics.totalOrders}</h5>
                </Card.Body>
            </Card>

            {/* Review Analytics */}
            <Card style={styles.card}>
                <Card.Body>
                    <Card.Title style={styles.cardTitle}>Review Analytics</Card.Title>
                    <h5>Total Reviews: {reviewAnalytics.totalReviews}</h5>
                    <h6 style={styles.subTitle}>Average Rating: {reviewAnalytics.averageRating[0].avgRating}</h6>
                    <h6 style={styles.subTitle}>Most Reviewed Items</h6>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviewAnalytics.mostReviewedItems.map(item => (
                                <tr key={item._id}>
                                    <td>{item._id}</td>
                                    <td>{item.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {/* Bar Chart for Most Reviewed Items */}
                    <Bar data={mostReviewedItemsData} options={mostReviewedItemsOptions} />

                </Card.Body>
            </Card>
        </Container>
    );
};

// Inline styles
const styles = {
    analyticsContainer: {
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px',
    },
    loading: {
        textAlign: 'center',
        fontSize: '1.5rem',
        color: '#007bff',
    },
    error: {
        textAlign: 'center',
        color: '#dc3545',
        fontSize: '1.5rem',
    },
    noData: {
        textAlign: 'center',
        fontSize: '1.5rem',
        color: '#6c757d',
    },
    title: {
        color: '#343a40',
    },
    card: {
        marginBottom: '20px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    },
    cardTitle: {
        fontSize: '1.5rem',
        color: '#343a40',
    },
    subTitle: {
        marginTop: '20px',
        fontWeight: 'bold',
    },
    table: {
        marginTop: '20px',
    },
};
export default AnalyticsDashboard;

