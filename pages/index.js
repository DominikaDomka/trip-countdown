// Trip Countdown App
import TripCountdown from '../components/TripCountdown'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 space-y-8">
      <TripCountdown />
    </div>
  )
}