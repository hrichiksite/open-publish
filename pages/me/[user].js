import { useRouter } from 'next/router'
import { MdPreview } from 'md-editor-rt';
//redis
import { createClient } from 'redis';
import styles from '../../styles/home.module.css'


//serverside rendering
export async function getServerSideProps({params, req, res}) {
    // Connect to Redis
    const client = await createClient({
        url: process.env.KV_URL,
    })
        .on('error', err => console.log('Redis Client Error', err))
        .connect();
    // Get the text from Redis
    
    const text = await client.get(params.user) || '404: Not Found';
    console.log('userpage:', params.user)
    // Close the Redis connection
    await client.disconnect();

    res.setHeader('Cache-Control', 's-maxage=8600, stale-while-revalidate');

    return {
        props: {
            text
        }, // will be passed to the page component as props
    }
}

export default function UserPage({ userdata }) {
    const router = useRouter()
    const { name, bio, links } = userdata


    return (<main className={styles.main}>
        {/* User page */}
        <h1>{name}</h1>
        <p>{bio}</p>
        <ul>
            {links.map(link => <li><a href={'/a/'+link.id}>{link.title}</a></li>)}
        </ul>
        </main>)
}
