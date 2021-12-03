import React from 'react';
import Layout from '@/components/Layout';
import {API_URL} from "@/config/index";
import Link from "next/link";
import Image from "next/image";
import {FaPencilAlt, FaTimes} from "react-icons/fa"
//Styles
import styles from "@/styles/Event.module.css";

export default function EventPage({evt}) {
    const deleteEvent = (e) => {
        console.log('delete')
    }

    return (
        <Layout>
            <div className={styles.event}>
                <div className={styles.controls}>
                    <Link href={`/events/edit/${evt.id}`}>
                        <a>
                            <FaPencilAlt /> Edit Event
                        </a>
                    </Link>
                    <a href="#" className={styles.delete} onClick={deleteEvent}>
                        <FaTimes /> Delete Event
                    </a>
                </div>
                <span>
                    {evt.date} at {evt.time}
                </span>
                <h1>{evt.name}</h1>
                {evt.image && (
                    <div className={styles.image}>
                        <Image src={evt.image} width={960} height={600} alt='event image' />
                    </div>   
                )}
                <h3>Performers:</h3>
                <p>{evt.performers}</p>
                <h3>Description:</h3>
                <p>{evt.description}</p>
                <h3>Venue: {evt.venue}</h3>
                <p>{evt.address}</p>

                <Link href='/events'>
                    <a className={styles.back}>
                        {'<'} Go Back
                    </a>
                </Link>
            </div>
        </Layout>
    )
}

export async function getStaticPaths() {
    const res = await fetch(`${API_URL}/api/events`);
    const events = await res.json();

    const paths = events.map(evt => ({
        params: {slug: evt.slug}
    }))

    return {
        paths: paths,
        fallback: true
        // Set fallback to false | Will show a 404 error if the path is not found
        // Set fallback to true  | Will search for path if it isnt found ... revalidate...
    }

    // Example of what the paths actuallly look like....BELOW.....
    // return {
    //     paths: [
    //         {params: {slug: 'slugvalue1}},
    //         {params: {slug: 'slugvalue2}},
    //         {params: {slug: 'slugvalue3}},
    //     ]
    // }
}

export async function getStaticProps({params: {slug}}) {
    const res = await fetch(`${API_URL}/api/events/${slug}`);
    const events = await res.json();

    return {
        props: {
            evt: events[0]
        },
        revalidate: 1
    }
}


// export async function getServerSideProps({query: {slug}}) {
//     const res = await fetch(`${API_URL}/api/events/${slug}`);
//     const events = await res.json();

//     return {
//         props: {
//             evt: events[0]
//         }
//     }
// }