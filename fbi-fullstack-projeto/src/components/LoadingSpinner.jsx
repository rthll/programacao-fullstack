import React from 'react';
import { Loader } from 'lucide-react';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-12">
    <Loader className="w-8 h-8 animate-spin text-blue-600" />
    <span className="ml-2 text-gray-600">Carregando...</span>
  </div>
);

export default LoadingSpinner;