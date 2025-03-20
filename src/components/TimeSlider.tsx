import React, { useState } from 'react';

interface TimeSliderProps {
  onTimeChange: (time: number) => void;
  timeType: 'month' | 'season';
  t: { [key: string]: string | string[] };
}

const TimeSlider: React.FC<TimeSliderProps> = ({ onTimeChange, timeType, t }) => {
  const [time, setTime] = useState(0);

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(event.target.value);
    setTime(newTime);
    onTimeChange(newTime);
  };

  let periodLabel = '';
  if (timeType === 'month') {
    periodLabel = (t.month as string[])[Math.floor(time / 8.33)];
  } else {
    const seasonIndex = Math.floor(time / 25);
    periodLabel = (t.season as string[])[seasonIndex];
  }

  return (
    <div className="mb-4">
      <label htmlFor="timeSlider" className="block text-sm font-medium text-gray-700">
        {t.timeSliderLabel}
      </label>
      <input
        type="range"
        id="timeSlider"
        min="0"
        max="99"
        value={time}
        onChange={handleTimeChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <p className="text-sm text-gray-500">{timeType === 'month' ? `${t.timeSliderMonthLabel} ${periodLabel}` : `${t.timeSliderSeasonLabel} ${periodLabel}`}</p>
    </div>
  );
};

export default TimeSlider;
