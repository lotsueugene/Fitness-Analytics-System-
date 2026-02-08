require('dotenv').config();
const { healthMetricsCounter } = require('./healthReader.js');
const { processWorkoutsData } = require('./workoutReader.js');


async function processFiles() {
  try {
    const workouts = await processWorkoutsData('./data/workouts.csv');
    const health = await healthMetricsCounter('./data/health-metrics.json');

    console.log(`Processing data for: ${process.env.USER_NAME}`);
    console.log('📁 Reading workout data...');
    console.log(`Total workouts: ${workouts.totalWorkouts}`);
    console.log(`Total minutes: ${workouts.totalMinutes}`);
    console.log('📁 Reading health data...');
    console.log(`Total health entries: ${health.totalCount}
        
        `);

    if(workouts.totalMinutes >= process.env.WEEKLY_GOAL){
        console.log(' === SUMMARY ===')
        console.log(`Workouts found: ${workouts.totalWorkouts}`)
        console.log(`Total workout minutes: ${workouts.totalMinutes}`)
        console.log(`Health entries found: ${health.totalCount}`)
        console.log(`Weekly goal: ${process.env.WEEKLY_GOAL}`)
        console.log(`🎉 Congratulations ${process.env.USER_NAME}! You have exceeded your weekly goal! `)
    } else {
        console.log(' === SUMMARY ===')
        console.log(`Workouts found: ${workouts.totalWorkouts}`)
        console.log(`Total workout minutes: ${workouts.totalMinutes}`)
        console.log(`Health entries found: ${health.totalCount}`)
        console.log(`Weekly goal: ${process.env.WEEKLY_GOAL}`)
        console.log(`${process.env.USER_NAME}! You did not meet your weekly goal! `)
    }
  } catch(error) {
    	console.log("Something went wrong:", error.message);
    }
}

processFiles();

