import TripCountdown from '../components/TripCountdown'

export default function Home({ serverDate }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 space-y-8">
      <TripCountdown serverDate={serverDate} />
    </div>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      serverDate: new Date().toISOString(),
    },
  }
}