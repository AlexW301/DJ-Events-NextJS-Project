import {useState} from "react";
import { API_URL } from "@/config/index";
//Styles
import styles from "@/styles/Form.module.css";

const ImageUpload = (evtId, imageUploaded) => {
    const [image, setImage] = useState(null)

    return (
        <div className={styles.form}>
            <h1>Upload Event Image</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.file}>

                </div>
            </form>
        </div>
    )
}

export default ImageUpload;