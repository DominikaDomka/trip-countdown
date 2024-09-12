import React, { useState, useEffect } from 'react';

const TripCountdown = () => {
  const [tripDate, setTripDate] = useState('');
  const [daysLeft, setDaysLeft] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (tripDate) {
      const intervalId = setInterval(() => {
        const now = new Date();
        const trip = new Date(tripDate);
        const timeDiff = trip.getTime() - now.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        setDaysLeft(daysDiff);

        // Assuming a maximum countdown of 365 days
        const maxDays = 365;
        const calculatedProgress = Math.max(0, Math.min(100, ((maxDays - daysDiff) / maxDays) * 100));
        setProgress(calculatedProgress);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [tripDate]);

  const handleDateChange = (e) => {
    setTripDate(e.target.value);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-green-700 py-4 px-6 rounded-t-lg">
        <h2 className="text-xl font-semibold text-white">Trip Countdown</h2>
      </div>
      <div className="space-y-5 p-6 border border-gray-200 rounded-b-lg">
        <div className="space-y-2">
          <label htmlFor="trip-date" className="text-sm font-medium text-green-800">
            Date of your next trip:
          </label>
          <input
            id="trip-date"
            type="date"
            value={tripDate}
            onChange={handleDateChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        {daysLeft !== null && (
          <div className="space-y-3">
            <p className="text-lg font-medium text-green-800">
              {daysLeft > 0 
                ? `${daysLeft} days until your trip!` 
                : daysLeft === 0 
                  ? "Your trip is today!" 
                  : "Your trip date is in the past."}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-green-600 h-2.5 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripCountdown;