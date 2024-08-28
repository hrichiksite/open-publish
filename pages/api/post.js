import { createClient } from 'redis';
import { createId } from '@paralleldrive/cuid2';


export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
    }

    try {
        const { text } = req.body;

        // Generate a unique ID
        const id = createId();

        // Connect to Redis
        const client = await createClient({
            url: process.env.KV_URL,
        })
            .on('error', err => console.log('Redis Client Error', err))
            .connect();
        // Push the text to Redis with the unique ID
        await client.set(id, text);

        // Close the Redis connection
        await client.disconnect();

        res.status(200).json({ id });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}