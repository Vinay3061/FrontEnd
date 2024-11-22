'use client';

import { useState, useEffect } from 'react';

export default function Driverlist() {
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApiResponse();
  }, []);

  const fetchApiResponse = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch API response: ${response.statusText}`);
      }
      const data = await response.text(); // Parse as plain text
      setApiResponse(data);
    } catch (error) {
      setError('Error fetching API response. Please try again later.');
      console.error('Fetch API error:', error); // Log the error for debugging
    } finally {
      setLoading(false); // Ensure loading state is updated
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">API Response:</h1>
      <div className="bg-gray-100 p-4 border rounded text-black overflow-auto">
        {apiResponse}
      </div>
    </div>
  );
}
