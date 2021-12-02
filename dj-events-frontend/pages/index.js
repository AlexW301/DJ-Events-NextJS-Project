import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"

const HomePage = ({events}) => {
  console.log(events)
  return (
    <Layout>
      <h1>Upcoming Events</h1>
    </Layout>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  return {
    props: {
      events
    }
  }
}

export default HomePage;
