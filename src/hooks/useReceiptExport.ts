import { useState } from 'react';
import { Receipt } from '@/types';

// This is a stub to allow the application to build.
// In a real application, this hook would contain the logic for PDF generation.
export const useReceiptExport = () => {
  const [isPdfLoading, setIsPdfLoading] = useState(false);

  const downloadPDF = (receipt: Receipt) => { /* Mock implementation */ };
  return { downloadPDF, isPdfLoading };
};