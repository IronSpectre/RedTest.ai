import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Input } from "./ui/input";
import { 
  Upload, 
  FileText, 
  Image as ImageIcon, 
  Download, 
  Trash2,
  Eye,
  Search,
  Filter,
  Calendar,
  FileCheck,
  AlertCircle,
  CheckCircle,
  Clock,
  FolderOpen
} from "lucide-react";

interface Report {
  id: string;
  name: string;
  type: 'Blood Test' | 'X-Ray' | 'MRI' | 'Ultrasound' | 'Prescription' | 'Discharge Summary';
  date: string;
  uploadDate: string;
  status: 'Processing' | 'Completed' | 'Error';
  size: string;
  hospital: string;
  doctor: string;
}

export function ReportsPage() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      name: 'Complete Blood Count - December 2023',
      type: 'Blood Test',
      date: '2023-12-06',
      uploadDate: '2023-12-08',
      status: 'Completed',
      size: '2.3 MB',
      hospital: 'Singapore General Hospital',
      doctor: 'Dr. Sarah Chen'
    },
    {
      id: '2',
      name: 'Chest X-Ray Follow-up',
      type: 'X-Ray',
      date: '2023-11-15',
      uploadDate: '2023-11-20',
      status: 'Completed',
      size: '5.7 MB',
      hospital: 'Mount Elizabeth Hospital',
      doctor: 'Dr. Michael Wong'
    },
    {
      id: '3',
      name: 'Cardiac MRI Scan',
      type: 'MRI',
      date: '2023-10-22',
      uploadDate: '2023-10-25',
      status: 'Processing',
      size: '45.2 MB',
      hospital: 'National Heart Centre',
      doctor: 'Dr. James Liu'
    },
    {
      id: '4',
      name: 'Medication Prescription',
      type: 'Prescription',
      date: '2023-12-01',
      uploadDate: '2023-12-02',
      status: 'Completed',
      size: '1.1 MB',
      hospital: 'Raffles Medical',
      doctor: 'Dr. Amanda Tan'
    },
    {
      id: '5',
      name: 'Abdominal Ultrasound',
      type: 'Ultrasound',
      date: '2023-09-18',
      uploadDate: '2023-09-20',
      status: 'Error',
      size: '8.9 MB',
      hospital: 'Tan Tock Seng Hospital',
      doctor: 'Dr. Robert Kim'
    }
  ]);

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Add new report to the list
          const newReport: Report = {
            id: Date.now().toString(),
            name: files[0].name,
            type: 'Blood Test',
            date: new Date().toISOString().split('T')[0],
            uploadDate: new Date().toISOString().split('T')[0],
            status: 'Processing',
            size: `${(files[0].size / 1024 / 1024).toFixed(1)} MB`,
            hospital: 'Unknown',
            doctor: 'TBD'
          };
          
          setReports(prev => [newReport, ...prev]);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Processing': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'Error': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || report.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Medical Reports</h1>
          <p className="text-gray-600">Upload, manage, and analyze your medical reports</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
          <Button className="bg-red-600 hover:bg-red-700">
            <Upload className="w-4 h-4 mr-2" />
            Upload Report
          </Button>
        </div>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FolderOpen className="w-5 h-5 mr-2 text-red-600" />
            Upload New Report
          </CardTitle>
          <CardDescription>
            Drag &amp; drop or click to upload medical reports (PDF, JPG, PNG up to 50MB)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-400 transition-colors cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => document.getElementById('report-upload')?.click()}
          >
            <div className="flex justify-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-red-600" />
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <p className="text-lg font-medium text-gray-900 mb-2">
              Drop medical reports here or click to browse
            </p>
            <p className="text-gray-500 mb-4">
              Supports PDF, JPG, PNG, DICOM files up to 50MB
            </p>
            
            <input
              id="report-upload"
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png,.dcm"
              multiple
              onChange={(e) => handleFileUpload(e.target.files)}
            />
            
            {isUploading && (
              <div className="mb-4">
                <Progress value={uploadProgress} className="mb-2" />
                <p className="text-sm text-gray-600">Processing report... {uploadProgress}%</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search reports, doctors, or hospitals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="all">All Types</option>
            <option value="Blood Test">Blood Test</option>
            <option value="X-Ray">X-Ray</option>
            <option value="MRI">MRI</option>
            <option value="Ultrasound">Ultrasound</option>
            <option value="Prescription">Prescription</option>
            <option value="Discharge Summary">Discharge Summary</option>
          </select>
        </div>
      </div>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-red-600" />
              Your Reports ({filteredReports.length})
            </span>
            <Badge variant="outline" className="text-red-600 border-red-600">
              {reports.filter(r => r.status === 'Completed').length} Processed
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Hospital</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{report.name}</div>
                          <div className="text-sm text-gray-500">
                            Uploaded: {new Date(report.uploadDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{report.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                        {new Date(report.date).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{report.hospital}</TableCell>
                    <TableCell>{report.doctor}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(report.status)}
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{report.size}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}