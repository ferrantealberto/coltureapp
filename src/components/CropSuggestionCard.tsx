import React from 'react';

interface CropSuggestionCardProps {
  cropName: string;
  compatibilityScore: number;
  imageUrl: string;
  wikipediaLink: string; // Changed from resourceURL to wikipediaLink
  t: { [key: string]: string };
}

const CropSuggestionCard: React.FC<CropSuggestionCardProps> = ({ cropName, compatibilityScore, imageUrl, wikipediaLink, t }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {wikipediaLink ? (
        <a href={wikipediaLink} target="_blank" rel="noopener noreferrer" className="block p-4 text-blue-500 hover:underline">
          Learn more on Wikipedia
        </a>
      ) : (
        <p className="p-4">No information available</p>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{cropName}</h3>
        <p className="text-sm text-gray-600">{t.compatibilityScore}: {compatibilityScore}</p>
      </div>
    </div>
  );
};

export default CropSuggestionCard;
