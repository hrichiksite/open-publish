import { createClient } from 'redis';
import { createId } from '@paralleldrive/cuid2';


export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
    }

    try {
        const { name, username, about } = req.body;

        // Generate a unique ID
        const id = createId();

        // Connect to Redis
        const client = await createClient({
            url: process.env.KV_URL,
        })
            .on('error', err => console.log('Redis Client Error', err))
            .connect();

        //check if the username already exists
        const user = await client.json.query({ username }).run();
        if (user) {
            res.status(400).json({ error: 'Username already exists' });
            return;
        }
        //sanitize the username
        //check if the username is alphanumeric
        if (!username.match(/^[0-9a-zA-Z]+$/)) {
            res.status(400).json({ error: 'Username should be alphanumeric' });
            return;
        }
        //check if the username is between 3 and 20 characters
        if (username.length < 3 || username.length > 20) {
            res.status(400).json({ error: 'Username should be between 3 and 20 characters' });
            return;
        }
        //check bio
        //check if the bio is under 100 characters
        if (about.length > 100) {
            res.status(400).json({ error: 'Bio should be between 3 and 100 characters' });
            return;
        }
        //TODO: check name
        // Push the text to Redis with the unique ID
        await client.set(id, { name, username, about });

        // Close the Redis connection
        await client.disconnect();

        res.status(200).json({ id });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}