import Layout from "@/components/Layout";
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";
//Styles
import styles from "@/styles/404.module.css";

const NotFoundPage = () => {
  return (
    <Layout title="Page Not Found">
      <div className={styles.error}>
        <h1>
          <FaExclamationTriangle /> 404
        </h1>
        <h4>Sorry, there is nothing here</h4>
        <Link href="/">
          <a>Go Back Home</a>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
