import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ArrowLeft, CheckCircle } from "lucide-react";

interface RegisterPageProps {
  onBack: () => void;
}

export function RegisterPage({ onBack }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profession: "",
    customProfession: "",
    interest: "",
    newsletter: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that if "other" is selected, custom profession is provided
    if (formData.profession === "other" && !formData.customProfession.trim()) {
      return; // Form validation will handle this
    }
    
    setIsSubmitting(true);
    
    // Prepare data for submission
    const submissionData = {
      ...formData,
      finalProfession: formData.profession === "other" ? formData.customProfession : formData.profession
    };
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Form submitted:", submissionData);
    
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Thank You for Your Interest!
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-xl mx-auto">
            You're now on the waitlist! We'll be in touch soon with updates about RedTest.ai and early access opportunities.
          </p>
          <Button onClick={onBack} className="mb-4 bg-red-600 text-white hover:bg-red-700 text-lg py-3 px-8">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <Button 
            onClick={onBack} 
            variant="ghost" 
            className="mb-6 text-gray-600 hover:bg-red-600 hover:text-white transition-colors text-lg py-3 px-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Register Your Interest
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join the waitlist to be among the first to experience RedTest's AI health platform
            </p>
          </div>
        </div>

        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl md:text-3xl font-bold">Join the RedTest.ai Waitlist</CardTitle>
            <CardDescription className="text-lg text-gray-600 mt-4">
              Get early access to our AI health platform - just a few quick details needed
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 md:px-12 pb-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="firstName" className="text-lg font-medium">First Name *</Label>
                  <Input
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({...prev, firstName: e.target.value}))}
                    placeholder="Enter your first name"
                    className="h-12 text-lg px-4 border-2 border-gray-200 focus:border-red-500 focus:ring-red-500"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="lastName" className="text-lg font-medium">Last Name *</Label>
                  <Input
                    id="lastName"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({...prev, lastName: e.target.value}))}
                    placeholder="Enter your last name"
                    className="h-12 text-lg px-4 border-2 border-gray-200 focus:border-red-500 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="email" className="text-lg font-medium">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                  placeholder="Enter your email address"
                  className="h-12 text-lg px-4 border-2 border-gray-200 focus:border-red-500 focus:ring-red-500"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="profession" className="text-lg font-medium">What is your profession? *</Label>
                <Select 
                  value={formData.profession} 
                  onValueChange={(value) => setFormData(prev => ({...prev, profession: value, customProfession: value !== 'other' ? '' : prev.customProfession}))}
                  required
                >
                  <SelectTrigger className="h-12 text-lg px-4 border-2 border-gray-200 focus:border-red-500 focus:ring-red-500">
                    <SelectValue placeholder="Select your profession" />
                  </SelectTrigger>
                  <SelectContent className="text-lg">
                    <SelectItem value="physician">Physician/Doctor</SelectItem>
                    <SelectItem value="nurse">Nurse/Nursing Professional</SelectItem>
                    <SelectItem value="healthcare-admin">Healthcare Administrator</SelectItem>
                    <SelectItem value="researcher">Healthcare Researcher</SelectItem>
                    <SelectItem value="pharmacist">Pharmacist</SelectItem>
                    <SelectItem value="therapist">Therapist/Counselor</SelectItem>
                    <SelectItem value="tech">Healthcare Technology</SelectItem>
                    <SelectItem value="insurance">Insurance/Healthcare Finance</SelectItem>
                    <SelectItem value="patient-advocate">Patient Advocate</SelectItem>
                    <SelectItem value="student">Healthcare Student</SelectItem>
                    <SelectItem value="patient">Patient/Healthcare Consumer</SelectItem>
                    <SelectItem value="caregiver">Caregiver/Family Member</SelectItem>
                    <SelectItem value="other">Other (please specify)</SelectItem>
                  </SelectContent>
                </Select>
                
                {formData.profession === "other" && (
                  <div className="mt-3">
                    <Input
                      id="customProfession"
                      required
                      value={formData.customProfession}
                      onChange={(e) => setFormData(prev => ({...prev, customProfession: e.target.value}))}
                      placeholder="Please specify your profession"
                      className="h-12 text-lg px-4 border-2 border-gray-200 focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="interest" className="text-lg font-medium">What interests you most about RedTest.ai?</Label>
                <Select 
                  value={formData.interest} 
                  onValueChange={(value) => setFormData(prev => ({...prev, interest: value}))}
                >
                  <SelectTrigger className="h-12 text-lg px-4 border-2 border-gray-200 focus:border-red-500 focus:ring-red-500">
                    <SelectValue placeholder="Select your primary interest" />
                  </SelectTrigger>
                  <SelectContent className="text-lg">
                    <SelectItem value="personal">Managing my own health data</SelectItem>
                    <SelectItem value="family">Organizing family health records</SelectItem>
                    <SelectItem value="clinical">Using in clinical practice</SelectItem>
                    <SelectItem value="research">Healthcare research applications</SelectItem>
                    <SelectItem value="efficiency">Improving healthcare efficiency</SelectItem>
                    <SelectItem value="ai-capabilities">AI health analysis capabilities</SelectItem>
                    <SelectItem value="integration">System integration possibilities</SelectItem>
                    <SelectItem value="exploring">Just exploring what's available</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <Checkbox
                  id="newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({...prev, newsletter: checked as boolean}))
                  }
                  className="h-5 w-5 border-2 border-gray-300 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                />
                <Label htmlFor="newsletter" className="text-lg font-normal cursor-pointer">
                  Keep me updated with RedTest.ai news and early access opportunities
                </Label>
              </div>

              <div className="pt-6">
                <Button 
                  type="submit" 
                  className="w-full bg-red-600 hover:bg-red-700 text-xl py-4 h-auto shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Joining..." : "Join the Waitlist"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-12 text-center text-base text-gray-500">
          <p>
            By registering, you agree to our privacy policy. We'll only use your information to 
            contact you about RedTest updates and won't share it with third parties.
          </p>
        </div>
      </div>
    </div>
  );
}