// Declaring typscript types for the data structure
export interface ApodData {
  copyright?: string; // Optional, as some entries don't have it
  date: string; // Format: YYYY-MM-DD
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
};

export interface ApodsData {
  [key: string]: ApodData; // Index signature for numbered keys
  timestamp: string; // ISO 8601 format timestamp
};