import React, { useState } from 'react';

interface ProcessNodeProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const ProcessNode: React.FC<ProcessNodeProps> = ({ title, description, icon, isActive, onClick }) => {
  return (
    <div 
      className={`
        relative flex flex-col items-center transition-all duration-300 cursor-pointer
        ${isActive ? 'scale-110' : 'hover:scale-105'}
      `}
      onClick={onClick}
    >
      <div 
        className={`
          w-16 h-16 rounded-full flex items-center justify-center z-10 transition-colors duration-300
          ${isActive 
            ? 'bg-sky-600 text-white dark:bg-sky-500' 
            : 'bg-cloud-200 text-sky-600 dark:bg-cloud-700 dark:text-sky-400'}
        `}
      >
        {icon}
      </div>
      <h3 className="mt-2 font-medium text-lg">{title}</h3>
      
      {isActive && (
        <div className="mt-4 p-4 bg-white dark:bg-cloud-800 rounded-lg shadow-lg max-w-xs animate-fade-in">
          <p className="text-sm text-cloud-600 dark:text-cloud-300">{description}</p>
        </div>
      )}
    </div>
  );
};

export const EtlDiagram: React.FC = () => {
  const [activeNode, setActiveNode] = useState<'extract' | 'transform' | 'load'>('extract');
  
  const handleNodeClick = (node: 'extract' | 'transform' | 'load') => {
    setActiveNode(node);
  };
  
  return (
    <div className="w-full py-8">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 lg:gap-16">
        {/* Extract Node */}
        <ProcessNode 
          title="Extract"
          description="Pull raw weather data from the OpenWeatherMap API. This phase handles API authentication, request formation, and data retrieval."
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H9.5V8.415a1 1 0 10-2 0V13H5.5z" />
              <path d="M9.5 13h2a1 1 0 110 2h-2a1 1 0 110-2z" />
            </svg>
          }
          isActive={activeNode === 'extract'}
          onClick={() => handleNodeClick('extract')}
        />
        
        {/* Connecting arrow */}
        <div className="w-16 h-0 border-t-2 border-cloud-300 dark:border-cloud-600 hidden md:block">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cloud-500 dark:text-cloud-400 -mt-2 ml-12" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
        
        {/* Transform Node */}
        <ProcessNode 
          title="Transform"
          description="Clean and restructure the raw weather data. This includes unit conversion, data validation, filtering, and preparing it for storage."
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          }
          isActive={activeNode === 'transform'}
          onClick={() => handleNodeClick('transform')}
        />
        
        {/* Connecting arrow */}
        <div className="w-16 h-0 border-t-2 border-cloud-300 dark:border-cloud-600 hidden md:block">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cloud-500 dark:text-cloud-400 -mt-2 ml-12" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
        
        {/* Load Node */}
        <ProcessNode 
          title="Load"
          description="Store the processed weather data in a Supabase database for later use. This includes handling the database schema, connection, and data insertion."
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
              <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
              <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
            </svg>
          }
          isActive={activeNode === 'load'}
          onClick={() => handleNodeClick('load')}
        />
      </div>
      
      {/* Dynamic content based on active node */}
      <div className="mt-12 pt-8 border-t border-cloud-200 dark:border-cloud-700">
        {activeNode === 'extract' && (
          <div className="animate-fade-in">
            <h4 className="text-xl font-medium mb-4">Data Extraction Process</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="mb-4">The extraction phase of our ETL pipeline connects to the OpenWeatherMap API and retrieves raw weather data for specified locations. This involves:</p>
                <ul className="list-disc list-inside mb-4 space-y-2 text-cloud-600 dark:text-cloud-400">
                  <li>API authentication using your API key</li>
                  <li>Forming properly structured API requests</li>
                  <li>Handling rate limiting and request throttling</li>
                  <li>Error handling for failed API calls</li>
                  <li>Parsing the JSON response</li>
                </ul>
              </div>
              <div className="bg-cloud-100 dark:bg-cloud-800 p-4 rounded-lg">
                <h5 className="text-base font-medium mb-2">Sample Extraction Code</h5>
                <pre className="text-xs overflow-x-auto font-mono">
                  <code className="language-python">
{`import requests

def extract_weather_data(api_key, city):
    """Extract weather data from OpenWeatherMap API."""
    base_url = "https://api.openweathermap.org/data/2.5/weather"
    params = {
        "q": city,
        "appid": api_key,
        "units": "metric"
    }
    
    response = requests.get(base_url, params=params)
    response.raise_for_status()
    
    return response.json()`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )}
        
        {activeNode === 'transform' && (
          <div className="animate-fade-in">
            <h4 className="text-xl font-medium mb-4">Data Transformation Process</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="mb-4">The transformation phase processes and cleans the raw weather data to make it suitable for analysis and storage. Key activities include:</p>
                <ul className="list-disc list-inside mb-4 space-y-2 text-cloud-600 dark:text-cloud-400">
                  <li>Data cleaning and validation</li>
                  <li>Unit conversion (e.g., Kelvin to Celsius)</li>
                  <li>Timestamp standardization</li>
                  <li>Extracting relevant data points</li>
                  <li>Creating calculated fields</li>
                  <li>Formatting data for database storage</li>
                </ul>
              </div>
              <div className="bg-cloud-100 dark:bg-cloud-800 p-4 rounded-lg">
                <h5 className="text-base font-medium mb-2">Sample Transformation Code</h5>
                <pre className="text-xs overflow-x-auto font-mono">
                  <code className="language-python">
{`def transform_weather_data(raw_data):
    """Transform raw weather data into structured format."""
    transformed = {
        "city_id": raw_data["id"],
        "city_name": raw_data["name"],
        "country": raw_data["sys"]["country"],
        "timestamp": raw_data["dt"],
        "temperature": raw_data["main"]["temp"],
        "feels_like": raw_data["main"]["feels_like"],
        "humidity": raw_data["main"]["humidity"],
        "pressure": raw_data["main"]["pressure"],
        "wind_speed": raw_data["wind"]["speed"],
        "wind_direction": raw_data["wind"].get("deg", 0),
        "weather_main": raw_data["weather"][0]["main"],
        "weather_description": raw_data["weather"][0]["description"],
        "collected_at": datetime.now().isoformat()
    }
    
    return transformed`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )}
        
        {activeNode === 'load' && (
          <div className="animate-fade-in">
            <h4 className="text-xl font-medium mb-4">Data Loading Process</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="mb-4">The loading phase stores the transformed weather data in a Supabase database for later retrieval and analysis. This phase handles:</p>
                <ul className="list-disc list-inside mb-4 space-y-2 text-cloud-600 dark:text-cloud-400">
                  <li>Database connection establishment</li>
                  <li>Query preparation and parameterization</li>
                  <li>Data insertion or updating</li>
                  <li>Transaction management</li>
                  <li>Handling database errors</li>
                  <li>Verifying successful data loading</li>
                </ul>
              </div>
              <div className="bg-cloud-100 dark:bg-cloud-800 p-4 rounded-lg">
                <h5 className="text-base font-medium mb-2">Sample Loading Code</h5>
                <pre className="text-xs overflow-x-auto font-mono">
                  <code className="language-python">
{`from supabase import create_client

def load_weather_data(supabase_url, supabase_key, data):
    """Load transformed weather data into Supabase."""
    supabase = create_client(supabase_url, supabase_key)
    
    # Insert data into 'weather_data' table
    result = supabase.table('weather_data') \
                    .insert(data) \
                    .execute()
    
    if hasattr(result, 'error') and result.error:
        raise Exception(f"Error loading data: {result.error}")
    
    return result.data`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EtlDiagram;