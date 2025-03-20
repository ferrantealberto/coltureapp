// apiService.ts
const API_KEY = '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'; // Replace with your actual API key
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

const fetchData = async (endpoint: string, time: number) => {
  // This function is no longer used to fetch crop data.
  // It will be used to fetch soil and weather data.
  try {
    const month = Math.floor(time / 8.33); // Assuming 12 months, 100 / 12 = ~8.33
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'google/gemini-1.0-pro-latest', // Or another suitable model
        messages: [
          {
            role: 'user',
            content: `Provide agricultural data for the current time, which corresponds to month ${month + 1}. Include soil data (nutrients, pH, organic matter, humidity), weather data (temperature, humidity, precipitation, wind speed), and historical data for a line chart. Return the data in JSON format.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    const parsedData = JSON.parse(content);
    return parsedData;

  } catch (error) {
    console.error('Error fetching data from OpenRouter:', error);
    // Provide fallback data or handle the error appropriately
    return {
      soilData: {
        nutrients: { N: 0, P: 0, K: 0 },
        pH: 0,
        organicMatter: 0,
        humidity: 0,
      },
      weatherData: {
        temperature: 0,
        humidity: 0,
        precipitation: 0,
        windSpeed: 0,
      },
      cropData: [],
      historicalData: [],
    };
  }
};

export default fetchData;
