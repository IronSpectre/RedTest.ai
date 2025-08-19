import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Plus, 
  Pill, 
  Calendar, 
  Clock,
  AlertTriangle,
  CheckCircle,
  Edit,
  Trash2,
  Search,
  Bell,
  Activity,
  Zap,
  Target,
  TrendingUp
} from "lucide-react";

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  prescribedBy: string;
  prescribedDate: string;
  startDate: string;
  endDate?: string;
  purpose: string;
  status: 'Active' | 'Completed' | 'Discontinued';
  sideEffects?: string[];
  notes?: string;
  reminderEnabled: boolean;
  nextDose?: string;
}

export function MedicinePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingMedicine, setIsAddingMedicine] = useState(false);
  const [medicines, setMedicines] = useState<Medicine[]>([
    {
      id: '1',
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      prescribedBy: 'Dr. Sarah Chen',
      prescribedDate: '2023-12-01',
      startDate: '2023-12-01',
      endDate: '2024-06-01',
      purpose: 'Type 2 Diabetes management',
      status: 'Active',
      sideEffects: ['Nausea', 'Stomach upset'],
      notes: 'Take with meals to reduce stomach upset',
      reminderEnabled: true,
      nextDose: '2024-01-08T08:00:00Z'
    },
    {
      id: '2',
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      prescribedBy: 'Dr. Michael Wong',
      prescribedDate: '2023-11-15',
      startDate: '2023-11-15',
      purpose: 'High blood pressure',
      status: 'Active',
      reminderEnabled: true,
      nextDose: '2024-01-08T09:00:00Z'
    },
    {
      id: '3',
      name: 'Amoxicillin',
      dosage: '250mg',
      frequency: 'Three times daily',
      prescribedBy: 'Dr. James Liu',
      prescribedDate: '2023-12-20',
      startDate: '2023-12-20',
      endDate: '2023-12-27',
      purpose: 'Bacterial infection',
      status: 'Completed',
      reminderEnabled: false
    },
    {
      id: '4',
      name: 'Atorvastatin',
      dosage: '20mg',
      frequency: 'Once daily (evening)',
      prescribedBy: 'Dr. Amanda Tan',
      prescribedDate: '2023-10-10',
      startDate: '2023-10-10',
      purpose: 'High cholesterol',
      status: 'Active',
      sideEffects: ['Muscle pain'],
      reminderEnabled: true,
      nextDose: '2024-01-08T20:00:00Z'
    },
    {
      id: '5',
      name: 'Omeprazole',
      dosage: '20mg',
      frequency: 'Once daily',
      prescribedBy: 'Dr. Robert Kim',
      prescribedDate: '2023-09-05',
      startDate: '2023-09-05',
      endDate: '2023-11-05',
      purpose: 'Acid reflux',
      status: 'Discontinued',
      notes: 'Patient experienced headaches',
      reminderEnabled: false
    }
  ]);

  const [newMedicine, setNewMedicine] = useState<Partial<Medicine>>({
    name: '',
    dosage: '',
    frequency: '',
    prescribedBy: '',
    prescribedDate: '',
    startDate: '',
    endDate: '',
    purpose: '',
    status: 'Active',
    reminderEnabled: false,
    notes: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Discontinued': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <Activity className="w-4 h-4 text-green-600" />;
      case 'Completed': return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case 'Discontinued': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return null;
    }
  };

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.prescribedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeMedicines = medicines.filter(m => m.status === 'Active');
  const completedMedicines = medicines.filter(m => m.status === 'Completed');
  const discontinuedMedicines = medicines.filter(m => m.status === 'Discontinued');

  const handleAddMedicine = () => {
    if (newMedicine.name && newMedicine.dosage && newMedicine.frequency) {
      const medicine: Medicine = {
        id: Date.now().toString(),
        name: newMedicine.name,
        dosage: newMedicine.dosage,
        frequency: newMedicine.frequency,
        prescribedBy: newMedicine.prescribedBy || 'Unknown',
        prescribedDate: newMedicine.prescribedDate || new Date().toISOString().split('T')[0],
        startDate: newMedicine.startDate || new Date().toISOString().split('T')[0],
        endDate: newMedicine.endDate,
        purpose: newMedicine.purpose || '',
        status: newMedicine.status as 'Active' | 'Completed' | 'Discontinued' || 'Active',
        reminderEnabled: newMedicine.reminderEnabled || false,
        notes: newMedicine.notes
      };
      
      setMedicines([medicine, ...medicines]);
      setNewMedicine({
        name: '',
        dosage: '',
        frequency: '',
        prescribedBy: '',
        prescribedDate: '',
        startDate: '',
        endDate: '',
        purpose: '',
        status: 'Active',
        reminderEnabled: false,
        notes: ''
      });
      setIsAddingMedicine(false);
    }
  };

  const upcomingReminders = activeMedicines.filter(m => m.reminderEnabled && m.nextDose);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Medicine Tracker</h1>
          <p className="text-gray-600">Track your medications and prescriptions</p>
        </div>
        <Dialog open={isAddingMedicine} onOpenChange={setIsAddingMedicine}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Medicine
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Medicine</DialogTitle>
              <DialogDescription>
                Enter the details of your new medication
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="medicine-name">Medicine Name</Label>
                <Input
                  id="medicine-name"
                  placeholder="e.g., Metformin"
                  value={newMedicine.name}
                  onChange={(e) => setNewMedicine({...newMedicine, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dosage">Dosage</Label>
                  <Input
                    id="dosage"
                    placeholder="e.g., 500mg"
                    value={newMedicine.dosage}
                    onChange={(e) => setNewMedicine({...newMedicine, dosage: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select value={newMedicine.frequency} onValueChange={(value) => setNewMedicine({...newMedicine, frequency: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Once daily">Once daily</SelectItem>
                      <SelectItem value="Twice daily">Twice daily</SelectItem>
                      <SelectItem value="Three times daily">Three times daily</SelectItem>
                      <SelectItem value="Four times daily">Four times daily</SelectItem>
                      <SelectItem value="As needed">As needed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="prescribed-by">Prescribed By</Label>
                <Input
                  id="prescribed-by"
                  placeholder="e.g., Dr. Sarah Chen"
                  value={newMedicine.prescribedBy}
                  onChange={(e) => setNewMedicine({...newMedicine, prescribedBy: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="purpose">Purpose</Label>
                <Input
                  id="purpose"
                  placeholder="e.g., Type 2 Diabetes management"
                  value={newMedicine.purpose}
                  onChange={(e) => setNewMedicine({...newMedicine, purpose: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional notes..."
                  value={newMedicine.notes}
                  onChange={(e) => setNewMedicine({...newMedicine, notes: e.target.value})}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddingMedicine(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddMedicine} className="bg-red-600 hover:bg-red-700">
                  Add Medicine
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Medications</p>
                <p className="text-2xl font-bold text-green-600">{activeMedicines.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-blue-600">{completedMedicines.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming Reminders</p>
                <p className="text-2xl font-bold text-orange-600">{upcomingReminders.length}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Bell className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Medicines</p>
                <p className="text-2xl font-bold text-gray-900">{medicines.length}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Pill className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search medicines, doctors, or purposes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Medicine Lists */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active ({activeMedicines.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedMedicines.length})</TabsTrigger>
          <TabsTrigger value="all">All Medicines ({medicines.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2 text-green-600" />
                Active Medications
              </CardTitle>
              <CardDescription>
                Medications you are currently taking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Medicine</TableHead>
                      <TableHead>Dosage &amp; Frequency</TableHead>
                      <TableHead>Prescribed By</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Next Dose</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeMedicines.filter(medicine =>
                      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      medicine.prescribedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      medicine.purpose.toLowerCase().includes(searchTerm.toLowerCase())
                    ).map((medicine) => (
                      <TableRow key={medicine.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <Pill className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <div className="font-medium">{medicine.name}</div>
                              <div className="text-sm text-gray-500">
                                Started: {new Date(medicine.startDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{medicine.dosage}</div>
                            <div className="text-sm text-gray-600">{medicine.frequency}</div>
                          </div>
                        </TableCell>
                        <TableCell>{medicine.prescribedBy}</TableCell>
                        <TableCell>{medicine.purpose}</TableCell>
                        <TableCell>
                          {medicine.nextDose && (
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-sm">
                                {new Date(medicine.nextDose).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
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
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
                Completed Medications
              </CardTitle>
              <CardDescription>
                Medications you have finished taking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Medicine</TableHead>
                      <TableHead>Dosage &amp; Frequency</TableHead>
                      <TableHead>Prescribed By</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {completedMedicines.concat(discontinuedMedicines).filter(medicine =>
                      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      medicine.prescribedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      medicine.purpose.toLowerCase().includes(searchTerm.toLowerCase())
                    ).map((medicine) => (
                      <TableRow key={medicine.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                              <Pill className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                              <div className="font-medium">{medicine.name}</div>
                              <div className="text-sm text-gray-500">
                                {new Date(medicine.startDate).toLocaleDateString()} - {medicine.endDate ? new Date(medicine.endDate).toLocaleDateString() : 'Ongoing'}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{medicine.dosage}</div>
                            <div className="text-sm text-gray-600">{medicine.frequency}</div>
                          </div>
                        </TableCell>
                        <TableCell>{medicine.prescribedBy}</TableCell>
                        <TableCell>{medicine.purpose}</TableCell>
                        <TableCell>
                          {medicine.endDate && (
                            <span className="text-sm text-gray-600">
                              {Math.ceil((new Date(medicine.endDate).getTime() - new Date(medicine.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(medicine.status)}
                            <Badge className={getStatusColor(medicine.status)}>
                              {medicine.status}
                            </Badge>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Pill className="w-5 h-5 mr-2 text-red-600" />
                All Medications
              </CardTitle>
              <CardDescription>
                Complete history of all your medications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Medicine</TableHead>
                      <TableHead>Dosage &amp; Frequency</TableHead>
                      <TableHead>Prescribed By</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMedicines.map((medicine) => (
                      <TableRow key={medicine.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                              <Pill className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                              <div className="font-medium">{medicine.name}</div>
                              <div className="text-sm text-gray-500">
                                {new Date(medicine.startDate).toLocaleDateString()} - {medicine.endDate ? new Date(medicine.endDate).toLocaleDateString() : 'Ongoing'}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{medicine.dosage}</div>
                            <div className="text-sm text-gray-600">{medicine.frequency}</div>
                          </div>
                        </TableCell>
                        <TableCell>{medicine.prescribedBy}</TableCell>
                        <TableCell>{medicine.purpose}</TableCell>
                        <TableCell>
                          {medicine.endDate ? (
                            <span className="text-sm text-gray-600">
                              {Math.ceil((new Date(medicine.endDate).getTime() - new Date(medicine.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                            </span>
                          ) : (
                            <span className="text-sm text-gray-600">Ongoing</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(medicine.status)}
                            <Badge className={getStatusColor(medicine.status)}>
                              {medicine.status}
                            </Badge>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}