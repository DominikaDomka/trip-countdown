import TimeZoneConverter from '../components/TimeZoneConverter'
import CurrencyConverter from '../components/CurrencyConverter'
import TripCountdown from '../components/TripCountdown'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 space-y-8">
      <TimeZoneConverter />
      <CurrencyConverter />
      <TripCountdown />
    </div>
  )
}