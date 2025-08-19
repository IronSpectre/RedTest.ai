import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Progress } from "./ui/progress";
import { Textarea } from "./ui/textarea";
import { 
  RefreshCw, 
  Download, 
  FileText,
  ArrowRight,
  Globe,
  Settings,
  CheckCircle,
  AlertCircle,
  Upload,
  Zap,
  Target,
  FileDown,
  Info
} from "lucide-react";

interface ConversionRule {
  testName: string;
  originalUnit: string;
  targetUnit: string;
  conversionFactor: number;
  originalValue: string;
  convertedValue: string;
  originalReference: string;
  convertedReference: string;
}

interface CountryFormat {
  code: string;
  name: string;
  flag: string;
  currency: string;
  dateFormat: string;
  units: {
    glucose: string;
    cholesterol: string;
    hemoglobin: string;
    creatinine: string;
  };
  terminology: {
    bloodSugar: string;
    bloodPressure: string;
    heartRate: string;
  };
}

export function ConversionPage() {
  const [selectedSourceCountry, setSelectedSourceCountry] = useState<string>('');
  const [selectedTargetCountry, setSelectedTargetCountry] = useState<string>('');
  const [selectedReport, setSelectedReport] = useState<string>('');
  const [conversionProgress, setConversionProgress] = useState(0);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionComplete, setConversionComplete] = useState(false);
  const [previewMode, setPreviewMode] = useState<'original' | 'converted'>('original');

  const countries: CountryFormat[] = [
    {
      code: 'SG',
      name: 'Singapore',
      flag: '🇸🇬',
      currency: 'SGD',
      dateFormat: 'DD/MM/YYYY',
      units: {
        glucose: 'mmol/L',
        cholesterol: 'mmol/L',
        hemoglobin: 'g/dL',
        creatinine: 'μmol/L'
      },
      terminology: {
        bloodSugar: 'Blood Glucose',
        bloodPressure: 'Blood Pressure',
        heartRate: 'Heart Rate'
      }
    },
    {
      code: 'US',
      name: 'United States',
      flag: '🇺🇸',
      currency: 'USD',
      dateFormat: 'MM/DD/YYYY',
      units: {
        glucose: 'mg/dL',
        cholesterol: 'mg/dL',
        hemoglobin: 'g/dL',
        creatinine: 'mg/dL'
      },
      terminology: {
        bloodSugar: 'Blood Sugar',
        bloodPressure: 'Blood Pressure',
        heartRate: 'Heart Rate'
      }
    },
    {
      code: 'TH',
      name: 'Thailand',
      flag: '🇹🇭',
      currency: 'THB',
      dateFormat: 'DD/MM/YYYY',
      units: {
        glucose: 'mg/dL',
        cholesterol: 'mg/dL',
        hemoglobin: 'g/dL',
        creatinine: 'mg/dL'
      },
      terminology: {
        bloodSugar: 'ระดับน้ำตาลในเลือด',
        bloodPressure: 'ความดันโลหิต',
        heartRate: 'อัตราการเต้นของหัวใจ'
      }
    },
    {
      code: 'GB',
      name: 'United Kingdom',
      flag: '🇬🇧',
      currency: 'GBP',
      dateFormat: 'DD/MM/YYYY',
      units: {
        glucose: 'mmol/L',
        cholesterol: 'mmol/L',
        hemoglobin: 'g/dL',
        creatinine: 'μmol/L'
      },
      terminology: {
        bloodSugar: 'Blood Glucose',
        bloodPressure: 'Blood Pressure',
        heartRate: 'Heart Rate'
      }
    },
    {
      code: 'AE',
      name: 'UAE',
      flag: '🇦🇪',
      currency: 'AED',
      dateFormat: 'DD/MM/YYYY',
      units: {
        glucose: 'mmol/L',
        cholesterol: 'mmol/L',
        hemoglobin: 'g/dL',
        creatinine: 'μmol/L'
      },
      terminology: {
        bloodSugar: 'مستوى السكر في الدم',
        bloodPressure: 'ضغط الدم',
        heartRate: 'معدل نبضات القلب'
      }
    }
  ];

  const availableReports = [
    { id: '1', name: 'Complete Blood Count - December 2023', size: '2.3 MB' },
    { id: '2', name: 'Lipid Panel - November 2023', size: '1.8 MB' },
    { id: '3', name: 'Comprehensive Metabolic Panel - October 2023', size: '2.1 MB' },
    { id: '4', name: 'Thyroid Function Test - September 2023', size: '1.5 MB' }
  ];

  const mockConversionRules: ConversionRule[] = [
    {
      testName: 'Glucose (Fasting)',
      originalUnit: 'mg/dL',
      targetUnit: 'mmol/L',
      conversionFactor: 0.0555,
      originalValue: '110',
      convertedValue: '6.1',
      originalReference: '70-100 mg/dL',
      convertedReference: '3.9-5.6 mmol/L'
    },
    {
      testName: 'Total Cholesterol',
      originalUnit: 'mg/dL',
      targetUnit: 'mmol/L',
      conversionFactor: 0.0259,
      originalValue: '195',
      convertedValue: '5.0',
      originalReference: '&lt;200 mg/dL',
      convertedReference: '&lt;5.2 mmol/L'
    },
    {
      testName: 'Creatinine',
      originalUnit: 'mg/dL',
      targetUnit: 'μmol/L',
      conversionFactor: 88.4,
      originalValue: '1.2',
      convertedValue: '106',
      originalReference: '0.7-1.3 mg/dL',
      convertedReference: '62-115 μmol/L'
    },
    {
      testName: 'HDL Cholesterol',
      originalUnit: 'mg/dL',
      targetUnit: 'mmol/L',
      conversionFactor: 0.0259,
      originalValue: '45',
      convertedValue: '1.2',
      originalReference: '&gt;40 mg/dL',
      convertedReference: '&gt;1.0 mmol/L'
    }
  ];

  const handleConversion = () => {
    if (!selectedSourceCountry || !selectedTargetCountry || !selectedReport) return;
    
    setIsConverting(true);
    setConversionProgress(0);
    setConversionComplete(false);
    
    const interval = setInterval(() => {
      setConversionProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsConverting(false);
          setConversionComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const getCountryByCode = (code: string) => countries.find(c => c.code === code);
  const sourceCountry = getCountryByCode(selectedSourceCountry);
  const targetCountry = getCountryByCode(selectedTargetCountry);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Report Conversion</h1>
          <p className="text-gray-600">Convert medical reports between different country formats and units</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Conversion Settings
          </Button>
          <Button className="bg-red-600 hover:bg-red-700">
            <Upload className="w-4 h-4 mr-2" />
            Upload Report
          </Button>
        </div>
      </div>

      {/* Conversion Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="w-5 h-5 mr-2 text-red-600" />
            Conversion Setup
          </CardTitle>
          <CardDescription>
            Select the source and target countries for your report conversion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Source Country */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Source Country</label>
              <Select value={selectedSourceCountry} onValueChange={setSelectedSourceCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select source country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      <span className="flex items-center">
                        <span className="mr-2">{country.flag}</span>
                        {country.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {sourceCountry && (
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• Date Format: {sourceCountry.dateFormat}</p>
                  <p>• Glucose Unit: {sourceCountry.units.glucose}</p>
                  <p>• Cholesterol Unit: {sourceCountry.units.cholesterol}</p>
                </div>
              )}
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-red-600" />
              </div>
            </div>

            {/* Target Country */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Target Country</label>
              <Select value={selectedTargetCountry} onValueChange={setSelectedTargetCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select target country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      <span className="flex items-center">
                        <span className="mr-2">{country.flag}</span>
                        {country.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {targetCountry && (
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• Date Format: {targetCountry.dateFormat}</p>
                  <p>• Glucose Unit: {targetCountry.units.glucose}</p>
                  <p>• Cholesterol Unit: {targetCountry.units.cholesterol}</p>
                </div>
              )}
            </div>
          </div>

          {/* Report Selection */}
          <div className="mt-6 space-y-3">
            <label className="text-sm font-medium">Select Report to Convert</label>
            <Select value={selectedReport} onValueChange={setSelectedReport}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a report from your uploads" />
              </SelectTrigger>
              <SelectContent>
                {availableReports.map((report) => (
                  <SelectItem key={report.id} value={report.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{report.name}</span>
                      <span className="text-gray-500 text-sm ml-2">({report.size})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Convert Button */}
          <div className="mt-6">
            <Button 
              onClick={handleConversion}
              disabled={!selectedSourceCountry || !selectedTargetCountry || !selectedReport || isConverting}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              {isConverting ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Converting Report...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Convert Report
                </>
              )}
            </Button>
          </div>

          {/* Progress */}
          {isConverting && (
            <div className="mt-4">
              <Progress value={conversionProgress} className="mb-2" />
              <p className="text-sm text-gray-600">
                Converting units and formatting... {conversionProgress}%
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Conversion Results */}
      {conversionComplete && (
        <div className="space-y-6">
          {/* Success Message */}
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div>
                  <h3 className="font-semibold text-green-900">Conversion Complete!</h3>
                  <p className="text-green-700">
                    Your report has been successfully converted from {sourceCountry?.name} to {targetCountry?.name} format.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview Toggle */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Conversion Preview</h2>
            <div className="flex items-center space-x-2">
              <Button
                variant={previewMode === 'original' ? 'default' : 'outline'}
                onClick={() => setPreviewMode('original')}
                size="sm"
              >
                Original Format
              </Button>
              <Button
                variant={previewMode === 'converted' ? 'default' : 'outline'}
                onClick={() => setPreviewMode('converted')}
                size="sm"
              >
                Converted Format
              </Button>
            </div>
          </div>

          {/* Conversion Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-red-600" />
                Unit Conversions Applied
              </CardTitle>
              <CardDescription>
                Review the conversions applied to your medical report
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Test Name</TableHead>
                      <TableHead>Original Value</TableHead>
                      <TableHead>Converted Value</TableHead>
                      <TableHead>Original Reference</TableHead>
                      <TableHead>Converted Reference</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockConversionRules.map((rule, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{rule.testName}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{rule.originalValue}</div>
                            <div className="text-sm text-gray-500">{rule.originalUnit}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium text-green-600">{rule.convertedValue}</div>
                            <div className="text-sm text-gray-500">{rule.targetUnit}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-600">{rule.originalReference}</TableCell>
                        <TableCell className="text-gray-600">{rule.convertedReference}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">
                            Converted
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Additional Changes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="w-5 h-5 mr-2 text-blue-600" />
                Additional Format Changes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Original Format ({sourceCountry?.name})</h4>
                  <div className="space-y-2 text-sm">
                    <p>• Date Format: {sourceCountry?.dateFormat}</p>
                    <p>• Terminology: {sourceCountry?.terminology.bloodSugar}</p>
                    <p>• Currency: {sourceCountry?.currency}</p>
                    <p>• Glucose Unit: {sourceCountry?.units.glucose}</p>
                    <p>• Cholesterol Unit: {sourceCountry?.units.cholesterol}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Converted Format ({targetCountry?.name})</h4>
                  <div className="space-y-2 text-sm">
                    <p>• Date Format: {targetCountry?.dateFormat}</p>
                    <p>• Terminology: {targetCountry?.terminology.bloodSugar}</p>
                    <p>• Currency: {targetCountry?.currency}</p>
                    <p>• Glucose Unit: {targetCountry?.units.glucose}</p>
                    <p>• Cholesterol Unit: {targetCountry?.units.cholesterol}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Download Options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileDown className="w-5 h-5 mr-2 text-red-600" />
                Download Converted Report
              </CardTitle>
              <CardDescription>
                Download your converted report in various formats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="bg-red-600 hover:bg-red-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Excel
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download HL7 FHIR
                </Button>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Conversion Notes</h4>
                    <ul className="text-sm text-blue-800 mt-1 space-y-1">
                      <li>• All numerical values have been converted using official medical conversion factors</li>
                      <li>• Reference ranges have been updated to match target country standards</li>
                      <li>• Date formats and terminology have been localized</li>
                      <li>• Original report structure and formatting have been preserved</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}