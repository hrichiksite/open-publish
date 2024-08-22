import { useRouter } from 'next/router'
import { MdPreview } from 'md-editor-rt';
//redis
import { createClient } from 'redis';
import styles from '../../styles/home.module.css'


//serverside rendering
export async function getServerSideProps({params, req, res}) {
    // Connect to Redis
    const client = await createClient({
        url: process.env.REDIS_URL
    })
        .on('error', err => console.log('Redis Client Error', err))
        .connect();
    // Get the text from Redis
    
    const text = await client.get(params.id) || '404: Not Found';
    console.log('id:', params.id)
    // Close the Redis connection
    await client.disconnect();

    res.setHeader('Cache-Control', 's-maxage=8600, stale-while-revalidate');

    return {
        props: {
            text
        }, // will be passed to the page component as props
    }
}

export default function Page({ text }) {
    const router = useRouter()

    return (<main className={styles.main}>
        <MdPreview modelValue={text} />
        <h2>
            by {router.query.id}
        </h2>
        </main>)
}
