import { useState } from 'react';
import { Upload } from 'lucide-react';
import Papa from 'papaparse';
import { Button } from './ui/Button';
import api from '../api/axios';

const REQUIRED_HEADERS = ['tipo', 'pais', 'ciudad', 'localidad', 'edad', 'genero', 'mes', 'año']

export const FileUpload = () => {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFiles = async () => {
    if (!csvFile) {
      setError('Please select CSV file');
      return false;
    }

    try {
      // Read CSV headers
      const csvText = await csvFile.text();
      const { data, errors } = Papa.parse(csvText, { header: true });
      if (errors.length > 0) {
        setError('Invalid CSV format');
        return false;
      }

      const csvHeaders = Object.keys(data[0] as Record<string, string>);
      const missingFields = REQUIRED_HEADERS.filter(field => !csvHeaders.includes(field));

      if (missingFields.length > 0) {
        setError(`Missing required fields in CSV: ${missingFields.join(', ')}`);
        return false;
      }

      return true;
    } catch (err) {
      setError('Error validating files');
      return false;
    }
  };

  const handleUpload = async () => {
    setError(null);
    setIsUploading(true);

    try {
      const isValid = await validateFiles();
      if (!isValid) return;

      // Get presigned URLs
      const { data } = await api.post<{ url: string; }>('/incidents/upload');

      // Upload files to presigned URLs
      await fetch(data.url, {
        method: 'PUT',
        body: csvFile,
        headers: {
          'Content-Type': 'text/csv',
        },
      });

      setCsvFile(null);
    } catch (err) {
      setError('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">CSV File</label>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
            className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#D9ED92] file:text-[#184E77] hover:file:bg-[#B5E48C]"
          />
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <Button
          onClick={handleUpload}
          isLoading={isUploading}
          disabled={!csvFile || isUploading}
          className="w-full"
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload Files
        </Button>
      </div>
    </div>
  );
};