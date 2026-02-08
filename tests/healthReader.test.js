const path = require('path');
const fs = require('fs/promises');
const { healthMetricsCounter } = require('../healthReader');

const TEST_FILE = path.join(__dirname, 'test-health.json');

const testData = {
    user: 'TestUser',
    metrics: [
        {
            date: '2026-02-06',
            type: 'sleep',
            duration: 7.5
        }
    ]
};

beforeAll(async () => {
    await fs.writeFile(TEST_FILE, JSON.stringify(testData));
});

afterAll(async () => {
    await fs.unlink(TEST_FILE);
});

describe('healthMetricsCounter', () => {

    test('reads a valid JSON file', async () => {
        const result = await healthMetricsCounter(TEST_FILE);

        expect(result).toBeDefined();
        expect(result).toHaveProperty('totalCount');
        expect(typeof result.totalCount).toBe('number');
        expect(result.totalCount).toBe(1);
    });

    test('handles missing file gracefully', async () => {
        const result = await healthMetricsCounter('missing.json');

        expect(result).toBeNull(); 
    });

});