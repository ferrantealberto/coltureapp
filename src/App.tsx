import React, { useState, useEffect } from 'react';
import TimeSlider from './components/TimeSlider';
import CropSuggestionCard from './components/CropSuggestionCard';
import DataVisualization from './components/DataVisualization';
import fetchData from './services/apiService';
import { LucideIcon, Sun, Cloud, Droplet, Wind, Thermometer, Info } from 'lucide-react';

interface Translation {
  [key: string]: string;
}

const translations: { [key: string]: Translation } = {
  it: {
    appTitle: 'App per Approfondimenti Agricoli',
    timeSliderLabel: 'Seleziona il periodo:',
    timeSliderMonthLabel: 'Mese:',
    timeSliderSeasonLabel: 'Stagione:',
    soilDataTitle: 'Dati del Suolo',
    weatherDataTitle: 'Dati Meteo',
    nutrients: 'Nutrienti',
    ph: 'pH',
    organicMatter: 'Materia Organica',
    humidity: 'Umidità',
    temperature: 'Temperatura',
    precipitation: 'Precipitazioni',
    windSpeed: 'Velocità del Vento',
    cropSuggestions: 'Suggerimenti per le Colture',
    compatibilityScore: 'Punteggio di Compatibilità',
    enterSoilData: 'Inserisci i dati del suolo',
    enterWeatherData: 'Inserisci i dati meteo',
    nitrogen: 'Azoto (N)',
    phosphorus: 'Fosforo (P)',
    potassium: 'Potassio (K)',
    phValue: 'pH',
    organicMatterValue: 'Materia Organica',
    humidityValue: 'Umidità',
    temperatureValue: 'Temperatura',
    precipitationValue: 'Precipitazioni',
    windSpeedValue: 'Velocità del vento',
    verifyCropAvailability: 'Verifica Coltura Disponibile',
    legendTitle: 'Legenda Colture per Mese',
    legendButton: 'Legenda',
    month: [
      'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
      'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
    ],
    season: ['Primavera', 'Estate', 'Autunno', 'Inverno']
  },
  en: {
    appTitle: 'Agricultural Insights App',
    timeSliderLabel: 'Select Period:',
    timeSliderMonthLabel: 'Month:',
    timeSliderSeasonLabel: 'Season:',
    soilDataTitle: 'Soil Data',
    weatherDataTitle: 'Weather Data',
    nutrients: 'Nutrients',
    ph: 'pH',
    organicMatter: 'Organic Matter',
    humidity: 'Humidity',
    temperature: 'Temperature',
    precipitation: 'Precipitation',
    windSpeed: 'Wind Speed',
    cropSuggestions: 'Crop Suggestions',
    compatibilityScore: 'Compatibility Score',
    enterSoilData: 'Enter Soil Data',
    enterWeatherData: 'Enter Weather Data',
    nitrogen: 'Nitrogen (N)',
    phosphorus: 'Phosphorus (P)',
    potassium: 'Potassium (K)',
    phValue: 'pH',
    organicMatterValue: 'Organic Matter',
    humidityValue: 'Humidity',
    temperatureValue: 'Temperature',
    precipitationValue: 'Precipitation',
    windSpeedValue: 'Wind Speed',
    verifyCropAvailability: 'Verify Crop Availability',
    legendTitle: 'Crop Legend by Month',
    legendButton: 'Legend',
    month: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    season: ['Spring', 'Summer', 'Autumn', 'Winter']
  },
};

// Define a type for crop suggestions
interface CropSuggestion {
  cropName: string;
  compatibilityScore: number;
  imageUrl: string;
  wikipediaLink: string; // Changed from resourceURL to wikipediaLink
}

function App() {
  const [time, setTime] = useState(0);
  const [timeType, setTimeType] = useState<'month' | 'season'>('month');
  const [soilData, setSoilData] = useState<{ [key: string]: number }>({
    N: 0,
    P: 0,
    K: 0,
    pH: 7,
    organicMatter: 2,
    humidity: 50,
  });
  const [weatherData, setWeatherData] = useState<{ [key: string]: number }>({
    temperature: 20,
    humidity: 60,
    precipitation: 10,
    windSpeed: 5,
  });
  const [cropSuggestions, setCropSuggestions] = useState<CropSuggestion[]>([]);
  const [historicalData, setHistoricalData] = useState<any>([]);
  const [language, setLanguage] = useState('it'); // Default to Italian
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showGraph, setShowGraph] = useState(true);
  const [showLegend, setShowLegend] = useState(false);

  const t = translations[language];

  useEffect(() => {
    const loadData = async () => {
      const data: any = await fetchData('/data', time);
      setHistoricalData(data.historicalData);
    };

    loadData();
  }, [time]);

  const fetchCropSuggestions = () => {
    let month;
    if (timeType === 'month') {
      month = Math.floor(time / 8.33) + 1; // Convert time to month (1-12)
    } else {
      const seasonIndex = Math.floor(time / 25); // Assuming 100 / 4 = 25 for each season
      month = (seasonIndex * 3) + 1; // Map season to the first month of the season
    }
    let suggestions: CropSuggestion[] = [];

    // Crop Suggestions based on month and conditions
    if (month === 3 || month === 4 || month === 5 || month === 6) { // Spring
      if (soilData.pH > 6 && soilData.organicMatter > 1.5 && weatherData.temperature > 15) {
        suggestions.push({ cropName: 'Pomodoro', compatibilityScore: 85, imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Pomodoro', wikipediaLink: 'https://it.wikipedia.org/wiki/Pomodoro' });
      }
    }
    if (month === 7 || month === 8 || month === 9) { // Summer
      if (soilData.pH > 6 && soilData.organicMatter > 1.5 && weatherData.temperature > 20) {
        suggestions.push({ cropName: 'Mais', compatibilityScore: 75, imageUrl: 'https://via.placeholder.com/150/FFFF00/000000?text=Mais', wikipediaLink: 'https://it.wikipedia.org/wiki/Mais' });
      }
    }
    if (month === 5 || month === 6 || month === 7) { // Late Spring/Early Summer
      if (soilData.humidity > 60 && weatherData.precipitation > 20) {
        suggestions.push({ cropName: 'Riso', compatibilityScore: 90, imageUrl: 'https://via.placeholder.com/150/008000/FFFFFF?text=Riso', wikipediaLink: 'https://it.wikipedia.org/wiki/Riso' });
      }
    }
    if (month === 1 || month === 2 || month === 3) { // Winter/Early Spring
      if (soilData.pH > 6.5 && soilData.organicMatter > 2 && weatherData.temperature > 10) {
        suggestions.push({ cropName: 'Spinaci', compatibilityScore: 80, imageUrl: 'https://via.placeholder.com/150/008000/FFFFFF?text=Spinaci', wikipediaLink: 'https://it.wikipedia.org/wiki/Spinacio' });
      }
    }
    if (month === 10 || month === 11 || month === 12) { // Autumn/Winter
      if (soilData.pH > 6 && soilData.organicMatter > 1.5 && weatherData.temperature > 10) {
        suggestions.push({ cropName: 'Cavolo', compatibilityScore: 70, imageUrl: 'https://via.placeholder.com/150/800080/FFFFFF?text=Cavolo', wikipediaLink: 'https://it.wikipedia.org/wiki/Cavolo' });
      }
    }

    setCropSuggestions(suggestions);
    setShowSuggestions(true);
  };

  const handleTimeChange = (newTime: number) => {
    setTime(newTime);
  };

  const handleTimeTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeType(event.target.value as 'month' | 'season');
  };

  const handleSoilDataChange = (field: string, value: string) => {
    setSoilData(prev => ({ ...prev, [field]: parseFloat(value) }));
  };

  const handleWeatherDataChange = (field: string, value: string) => {
    setWeatherData(prev => ({ ...prev, [field]: parseFloat(value) }));
  };

  const getIconForWeather = (weatherType: string): LucideIcon => {
    switch (weatherType) {
      case 'temperature':
        return Thermometer;
      case 'humidity':
        return Droplet;
      case 'precipitation':
        return Cloud;
      case 'windSpeed':
        return Wind;
      default:
        return Sun;
    }
  };

  const legendData = [
    {
      month: [3, 4, 5, 6],
      crop: 'Pomodoro',
      soil: { pH: '> 6', organicMatter: '> 1.5' },
      weather: { temperature: '> 15' },
    },
    {
      month: [7, 8, 9],
      crop: 'Mais',
      soil: { pH: '> 6', organicMatter: '> 1.5' },
      weather: { temperature: '> 20' },
    },
    {
      month: [5, 6, 7],
      crop: 'Riso',
      soil: { humidity: '> 60' },
      weather: { precipitation: '> 20' },
    },
    {
      month: [1, 2, 3],
      crop: 'Spinaci',
      soil: { pH: '> 6.5', organicMatter: '> 2' },
      weather: { temperature: '> 10' },
    },
    {
      month: [10, 11, 12],
      crop: 'Cavolo',
      soil: { pH: '> 6', organicMatter: '> 1.5' },
      weather: { temperature: '> 10' },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">{t.appTitle}</h1>

        <TimeSlider onTimeChange={handleTimeChange} timeType={timeType} t={t} />

        <div className="mb-4">
          <label htmlFor="timeType" className="block text-sm font-medium text-gray-700">{t.timeSliderLabel}</label>
          <select
            id="timeType"
            value={timeType}
            onChange={handleTimeTypeChange}
            className="mt-1 p-2 w-full border rounded-md"
          >
            <option value="month">{t.timeSliderMonthLabel}</option>
            <option value="season">{t.timeSliderSeasonLabel}</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{t.enterSoilData}</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t.nitrogen}</label>
              <input type="number" className="mt-1 p-2 w-full border rounded-md" value={soilData.N} onChange={(e) => handleSoilDataChange('N', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t.phosphorus}</label>
              <input type="number" className="mt-1 p-2 w-full border rounded-md" value={soilData.P} onChange={(e) => handleSoilDataChange('P', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t.potassium}</label>
              <input type="number" className="mt-1 p-2 w-full border rounded-md" value={soilData.K} onChange={(e) => handleSoilDataChange('K', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t.phValue}</label>
              <input type="number" className="mt-1 p-2 w-full border rounded-md" value={soilData.pH} onChange={(e) => handleSoilDataChange('pH', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t.organicMatterValue}</label>
              <input type="number" className="mt-1 p-2 w-full border rounded-md" value={soilData.organicMatter} onChange={(e) => handleSoilDataChange('organicMatter', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t.humidityValue}</label>
              <input type="number" className="mt-1 p-2 w-full border rounded-md" value={weatherData.humidity} onChange={(e) => handleWeatherDataChange('humidity', e.target.value)} />
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{t.enterWeatherData}</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t.temperatureValue}</label>
              <input type="number" className="mt-1 p-2 w-full border rounded-md" value={weatherData.temperature} onChange={(e) => handleWeatherDataChange('temperature', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t.humidityValue}</label>
              <input type="number" className="mt-1 p-2 w-full border rounded-md" value={weatherData.humidity} onChange={(e) => handleWeatherDataChange('humidity', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t.precipitationValue}</label>
              <input type="number" className="mt-1 p-2 w-full border rounded-md" value={weatherData.precipitation} onChange={(e) => handleWeatherDataChange('precipitation', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t.windSpeedValue}</label>
              <input type="number" className="mt-1 p-2 w-full border rounded-md" value={weatherData.windSpeed} onChange={(e) => handleWeatherDataChange('windSpeed', e.target.value)} />
            </div>
          </div>
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={fetchCropSuggestions}
        >
          {t.verifyCropAvailability}
        </button>

        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-2 focus:outline-none focus:shadow-outline"
          onClick={() => setShowLegend(!showLegend)}
        >
          {t.legendButton} <Info size={16} className="inline ml-1" />
        </button>

        {showLegend && (
          <div className="bg-white shadow-md rounded-lg p-4 mt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{t.legendTitle}</h3>
            <ul>
              {legendData.map((item, index) => (
                <li key={index} className="mb-2">
                  <strong>{item.crop}:</strong> {t.month.filter((_, i) => item.month.includes(i + 1)).join(', ')}
                  <ul>
                    {item.soil && (
                      <li>
                        {t.soilDataTitle}: {Object.entries(item.soil).map(([key, value]) => `${key}: ${value}`).join(', ')}
                      </li>
                    )}
                    {item.weather && (
                      <li>
                        {t.weatherDataTitle}: {Object.entries(item.weather).map(([key, value]) => `${key}: ${value}`).join(', ')}
                      </li>
                    )}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}

        {showSuggestions && (
          <>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{t.cropSuggestions}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {cropSuggestions.map((crop, index) => (
                <CropSuggestionCard
                  key={index}
                  cropName={crop.cropName}
                  compatibilityScore={crop.compatibilityScore}
                  imageUrl={crop.imageUrl}
                  wikipediaLink={crop.wikipediaLink} // Pass wikipediaLink
                  t={t}
                />
              ))}
            </div>
          </>
        )}

        {showGraph && historicalData && <DataVisualization data={historicalData} />}

        <div className="bg-white shadow-md rounded-lg overflow-hidden p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{t.soilDataTitle}</h3>
          {soilData && (
            <div>
              <p>{t.nutrients}: N - {soilData.N}, P - {soilData.P}, K - {soilData.K}</p>
              <p>{t.ph}: {soilData.pH}</p>
              <p>{t.organicMatter}: {soilData.organicMatter}</p>
              <p>{t.humidity}: {soilData.humidity}</p>
            </div>
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden p-4 mt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{t.weatherDataTitle}</h3>
          {weatherData && (
            <div>
              <p><Thermometer size={16} className="inline mr-1" /> {t.temperature}: {weatherData.temperature}°C</p>
              <p><Droplet size={16} className="inline mr-1" /> {t.humidity}: {weatherData.humidity}%</p>
              <p><Cloud size={16} className="inline mr-1" /> {t.precipitation}: {weatherData.precipitation} mm</p>
              <p><Wind size={16} className="inline mr-1" /> {t.windSpeed}: {weatherData.windSpeed} m/s</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
