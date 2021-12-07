import React, {useState} from "react";
import {FaImage} from "react-icons/fa";
import {useRouter} from "next/router";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import {API_URL, APP_URL} from "@/config/index";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";
//Styles
import styles from "@/styles/Form.module.css";
//React-Toastify for error message and success messages
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//Moment is date/time formatter package
import moment from "moment";

export default function EditEventPage({evt}) {
    const [values, setValues] = useState({
        name: evt.name,
        performers: evt.performers,
        venue: evt.venue,
        address: evt.address,
        date: evt.date,
        time: evt.time,
        description: evt.description
    })

    const [imagePreview, setImagePreview] = useState(evt.image ? evt.image.formats.thumbnail.url : null)

    const [showModal, setShowModal] = useState(false)

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        //Validation
        const hasEmptyFields = Object.values(values).some((element) => element == '')

        if(hasEmptyFields) {
            toast.error('please fill in all fields')
        }

        const res = await fetch(`${API_URL}/events/${evt.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        if(!res.ok) {
            toast.error('Something Went Wrong!')
        } else {
            const evt = await res.json()
            router.push(`/events/${evt.slug}`)
        }
    }

    const handleInputChange = (e) => {
        // destructure the name and value attribut of the current form element from e.target
        const {name, value} = e.target
        // Spread rest of values and keep the same, while taking the current form element by name and setting the value to value
        setValues({...values, [name]: value })
    }

    const imageUploaded = (e) => {
        console.log('uploaded')
    }

    return (
        <Layout title='Add New Event'>
            <Link href='/events'>Go Back</Link>
            <h1>Edit Event</h1>
            <ToastContainer />
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor='name'>Event Name</label>
                        <input type='text' id='name' name='name' value={values.name} onChange={handleInputChange}/>
                    </div>  
                    <div>
                        <label htmlFor='performers'>Performers</label>
                        <input type='text' name='performers' id='performers' value={values.performers} onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor='venue'>Venue</label>
                        <input type='text' name='venue' id='venue' value={values.venue} onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor='address'>Address</label>
                        <input type='text' name='address' id='address' value={values.address} onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor='date'>Date</label>
                        <input type='date' name='date' id='date' value={moment(values.date).format('yyyy-MM-DD')} onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor='time'>Time</label>
                        <input type='text' name='time' id='time' value={values.time} onChange={handleInputChange}/>
                    </div>
                </div>

                <div>
                    <label htmlFor='description'>Event Description</label>
                    <textarea type='text' name='description' id='description' value={values.description} onChange={handleInputChange}></textarea>
                </div>

                <input type='submit' value='Update Event' className='btn'></input>
            </form>

            <h2>Event Image</h2>
            {imagePreview ? (
                <Image src={imagePreview} height={100} width={170} alt='event image' />
               ) : ( 
                <div>
                    <p>No image uploaded</p>
                </div>
            )}

            <div>
                <button onClick={() => setShowModal(true)} className='btn-secondary'>
                    <FaImage/> Set Image
                </button>
            </div>

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <ImageUpload evtId={evt.id} imageUploaded={imageUploaded}/>
            </Modal>
        </Layout>
    )
}

export async function getServerSideProps({params: {id}}) {
    const res = await fetch(`${API_URL}/events/${id}`)
    const evt = await res.json()

    return {
        props: {
            evt
        }
    }
}