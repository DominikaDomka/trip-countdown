import React, { useState, useEffect } from 'react';

const TripCountdown = ({ serverDate }) => {
  const [tripDate, setTripDate] = useState('');
  const [tripLocation, setTripLocation] = useState('');
  const [daysLeft, setDaysLeft] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Load saved data from localStorage on component mount
    const savedDate = localStorage.getItem('tripDate');
    const savedLocation = localStorage.getItem('tripLocation');
    if (savedDate) setTripDate(savedDate);
    if (savedLocation) setTripLocation(savedLocation);
  }, []);

  useEffect(() => {
    if (tripDate) {
      // Save date to localStorage whenever it changes
      localStorage.setItem('tripDate', tripDate);

      const calculateCountdown = () => {
        const now = new Date(serverDate);
        const trip = new Date(tripDate);
        
        console.log('Server date:', serverDate);
        console.log('Trip date:', tripDate);
        console.log('Parsed now:', now);
        console.log('Parsed trip:', trip);
        
        // Reset hours to midnight for both dates to ensure accurate day calculation
        now.setHours(0, 0, 0, 0);
        trip.setHours(0, 0, 0, 0);
        
        const timeDiff = trip.getTime() - now.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        console.log('Days difference:', daysDiff);
        
        setDaysLeft(daysDiff);

        // Assuming a maximum countdown of 365 days
        const maxDays = 365;
        const calculatedProgress = Math.max(0, Math.min(100, ((maxDays - Math.max(0, daysDiff)) / maxDays) * 100));
        setProgress(calculatedProgress);
      };

      calculateCountdown();

      // Set up an interval to recalculate the countdown every hour
      const intervalId = setInterval(calculateCountdown, 60 * 60 * 1000);

      return () => clearInterval(intervalId);
    }
  }, [tripDate, serverDate]);

  const handleDateChange = (e) => {
    setTripDate(e.target.value);
  };

  const handleLocationChange = (e) => {
    const newLocation = e.target.value;
    setTripLocation(newLocation);
    localStorage.setItem('tripLocation', newLocation);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-green-700 py-4 px-6 rounded-t-lg">
        <h2 className="text-xl font-semibold text-white">Trip Countdown</h2>
      </div>
      <div className="space-y-5 p-6 border border-gray-200 rounded-b-lg">
        <div className="space-y-2">
          <label htmlFor="trip-location" className="text-sm font-medium text-green-800">
            Where are you going?
          </label>
          <input
            id="trip-location"
            type="text"
            value={tripLocation}
            onChange={handleLocationChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter trip location"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="trip-date" className="text-sm font-medium text-green-800">
            Date of your trip:
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
                ? `${daysLeft} days until your trip${tripLocation ? ` to ${tripLocation}` : ''}!` 
                : daysLeft === 0 
                  ? `Your trip${tripLocation ? ` to ${tripLocation}` : ''} is today!` 
                  : `Your trip${tripLocation ? ` to ${tripLocation}` : ''} date is in the past.`}
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