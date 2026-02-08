const path = require('path');
const fs = require('fs');
const { processWorkoutsData } = require('../workoutReader');

const TEST_CSV_FILE = path.join(__dirname, 'test-workout.csv');

const testCsvData = `date,type,duration
2026-02-06,cardio,30
2026-02-07,strength,45
2026-02-08,yoga,20`;

beforeAll(() => {
    fs.writeFileSync(TEST_CSV_FILE, testCsvData);
});

afterAll(() => {
    try {
        fs.unlinkSync(TEST_CSV_FILE);
    } catch {}
});

describe('processWorkoutsData', () => {

    test('reads and processes a valid CSV file', async () => {
        const result = await processWorkoutsData(TEST_CSV_FILE);

        expect(result).toBeDefined();
        expect(result).toHaveProperty('totalWorkouts');
        expect(result).toHaveProperty('totalMinutes');

        expect(result.totalWorkouts).toBe(3);
        expect(result.totalMinutes).toBe(95);
    });

    test('handles missing CSV file gracefully', async () => {
        const result = await processWorkoutsData('missing.csv');
        expect(result).toBeNull();
    });

});