const fs = require('fs');
const csv = require('csv-parser');

async function readWorkoutsData(filepath) {
    return new Promise((resolve, reject) => {
       const results = [];
        
       const stream = fs.createReadStream(filepath);

        stream.on('error', (error) => {
        reject(error);  
        });

        stream
        .pipe(csv())
        .on('data', (row) => {
        results.push(row);
        })
        .on('end', () => {
        resolve(results);
        })
        .on('error', (error) => {
        reject(error);
        });
    });
}


async function processWorkoutsData(filepath) {
    try{
    const workoutData = await readWorkoutsData(filepath);
    const totalWorkouts=workoutData.length

    let totalMinutes=0
    for (let i=0; i < workoutData.length; i++){
        const workouts = workoutData[i]
         totalMinutes+=parseInt(workouts.duration)
    }
    return{totalWorkouts, totalMinutes} } catch(error) {
    	if (error.code === 'ENOENT') { 
            console.log('❌ CSV file not found check the file path'); 
        } else { 
            console.log('❌ Error processing CSV file:', error.message); 
        } 
        return null;
    }
}

processWorkoutsData('./data/workouts.csv');

module.exports = {processWorkoutsData}