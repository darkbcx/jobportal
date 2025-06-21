"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Building,
  Mail,
  Lock,
  User,
  MapPin,
  Globe,
  Users,
  Calendar,
  Upload,
  CheckCircle,
  X,
  Plus,
  Phone,
  Briefcase,
  Home,
} from "lucide-react";

// Complete validation schema
const employerRegistrationSchema = z
  .object({
    // Account Information
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),

    // Company Information
    companyName: z.string().min(1, "Company name is required"),
    companySize: z.string().min(1, "Company size is required"),
    industry: z.string().min(1, "Industry is required"),
    website: z
      .string()
      .url("Please enter a valid website URL")
      .optional()
      .or(z.literal("")),
    companyDescription: z
      .string()
      .min(10, "Company description must be at least 10 characters"),
    foundedYear: z.string().optional(),
    companyType: z.string().min(1, "Company type is required"),

    // Contact Information
    contactFirstName: z.string().min(1, "Contact first name is required"),
    contactLastName: z.string().min(1, "Contact last name is required"),
    contactTitle: z.string().min(1, "Contact title is required"),
    contactPhone: z.string().optional(),
    headquarters: z.string().min(1, "Headquarters location is required"),
    officeLocations: z
      .array(z.string())
      .min(1, "At least one office location is required"),

    // Hiring Information
    hiringFor: z
      .array(z.string())
      .min(1, "At least one hiring category is required"),
    urgentHiring: z.boolean(),
    budgetRange: z.string().optional(),
    remotePolicy: z.string().min(1, "Remote work policy is required"),
    benefits: z.array(z.string()),

    // Verification
    companyLogo: z.any().optional(),
    verificationDocument: z
      .any()
      .refine(
        (file) => file && file.length > 0,
        "Verification document is required"
      ),
    acceptTerms: z
      .boolean()
      .refine(
        (val) => val === true,
        "You must accept the terms and conditions"
      ),
    receiveUpdates: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type EmployerRegistrationFormData = z.infer<typeof employerRegistrationSchema>;

const companySizes = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "501-1000 employees",
  "1000+ employees",
];

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Retail",
  "Manufacturing",
  "Consulting",
  "Media & Entertainment",
  "Real Estate",
  "Non-profit",
  "Government",
  "Other",
];

const companyTypes = [
  "Startup",
  "Private Company",
  "Public Company",
  "Non-profit",
  "Government Agency",
  "Consulting Firm",
  "Other",
];

export default function RegisterEmployerPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [locationInput, setLocationInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 3;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const form = useForm<EmployerRegistrationFormData>({
    resolver: zodResolver(employerRegistrationSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      companySize: "",
      industry: "",
      website: "",
      companyDescription: "",
      foundedYear: "",
      companyType: "",
      contactFirstName: "",
      contactLastName: "",
      contactTitle: "",
      contactPhone: "",
      headquarters: "",
      officeLocations: [],
      companyLogo: null,
      verificationDocument: null,
      acceptTerms: false,
      receiveUpdates: true,
    },
    mode: "onChange",
  });

  const watchedOfficeLocations = form.watch("officeLocations");

  const addOfficeLocation = (location: string) => {
    if (location && !watchedOfficeLocations.includes(location)) {
      const currentLocations = form.getValues("officeLocations");
      form.setValue("officeLocations", [...currentLocations, location]);
      setLocationInput("");
    }
  };

  const removeOfficeLocation = (locationToRemove: string) => {
    const currentLocations = form.getValues("officeLocations");
    form.setValue(
      "officeLocations",
      currentLocations.filter((location) => location !== locationToRemove)
    );
  };

  const validateCurrentStep = async (): Promise<boolean> => {
    let fieldsToValidate: (keyof EmployerRegistrationFormData)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = [
          "email",
          "password",
          "confirmPassword",
          "companyName",
          "companySize",
          "industry",
        ];
        break;
      case 2:
        fieldsToValidate = [
          "contactFirstName",
          "contactLastName",
          "contactTitle",
          "headquarters",
          "officeLocations",
        ];
        break;
      case 3:
        fieldsToValidate = ["verificationDocument", "acceptTerms"];
        break;
    }

    const result = await form.trigger(fieldsToValidate);
    return result;
    // return true;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleBack = () => {
    router.replace("/");
  };

  const onSubmit = async (data: EmployerRegistrationFormData) => {
    setIsSubmitting(true);

    try {
      // Here you would typically send the registration data to your backend
      console.log("Employer registration data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Redirect to success page or dashboard
      router.push("/employer/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex">
          <div>
            <Button variant="ghost" onClick={handleBack} className="p-0">
              <Home className="w-6 h-6" />
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center flex-1">
            <h1 className="text-center text-3xl font-bold text-gray-900">
              Create Your Employer Account
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Find the best talent for your company
            </p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 
                  ${
                    currentStep > index + 1
                      ? "bg-primary border-primary text-primary-foreground"
                      : currentStep === index + 1
                      ? "border-primary text-primary"
                      : "border-gray-300 text-gray-400"
                  }`}
              >
                {currentStep > index + 1 ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  index + 1
                )}
              </div>
            ))}
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between mt-2 text-sm">
            <span
              className={
                currentStep >= 1 ? "text-primary font-medium" : "text-gray-500"
              }
            >
              Company
            </span>
            <span
              className={
                currentStep >= 2 ? "text-primary font-medium" : "text-gray-500"
              }
            >
              Contact
            </span>
            <span
              className={
                currentStep >= 3 ? "text-primary font-medium" : "text-gray-500"
              }
            >
              Verification
            </span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && "Company Information"}
              {currentStep === 2 && "Contact Details & Location"}
              {currentStep === 3 && "Verification & Finish"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 &&
                "Tell us about your company and create your account"}
              {currentStep === 2 &&
                "Provide contact information and office locations"}
              {currentStep === 3 &&
                "Verify your company and complete registration"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Step 1: Company Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Account Setup</h3>

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Mail className="w-4 h-4" /> Company Email Address
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="hr@company.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Lock className="w-4 h-4" /> Password
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  placeholder="••••••••"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Lock className="w-4 h-4" /> Confirm Password
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  placeholder="••••••••"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Company Details</h3>

                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Building className="w-4 h-4" /> Company Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Acme Corporation"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="companySize"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Users className="w-4 h-4" /> Company Size
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select company size" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {companySizes.map((size) => (
                                    <SelectItem key={size} value={size}>
                                      {size}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="industry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Industry</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select industry" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {industries.map((industry) => (
                                    <SelectItem key={industry} value={industry}>
                                      {industry}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="website"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Globe className="w-4 h-4" /> Company Website
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="https://company.com"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="foundedYear"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" /> Founded Year
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="2020" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="companyType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select company type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {companyTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="companyDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about your company, mission, and culture..."
                                rows={4}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Contact Details & Location */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Primary Contact</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="contactFirstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <User className="w-4 h-4" /> First Name
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="John" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="contactLastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <User className="w-4 h-4" /> Last Name
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="contactTitle"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Briefcase className="w-4 h-4" /> Job Title
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="HR Manager" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="contactPhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Phone className="w-4 h-4" /> Phone Number
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="tel"
                                  placeholder="+1 (555) 123-4567"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Company Locations</h3>

                      <FormField
                        control={form.control}
                        name="headquarters"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" /> Headquarters
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="San Francisco, CA"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="officeLocations"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Office Locations</FormLabel>
                            <div className="flex gap-2">
                              <Input
                                {...field}
                                value={locationInput}
                                onChange={(e) =>
                                  setLocationInput(e.target.value)
                                }
                                placeholder="e.g. New York, NY"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    addOfficeLocation(locationInput);
                                  }
                                }}
                              />
                              <Button
                                type="button"
                                onClick={() => addOfficeLocation(locationInput)}
                                variant="outline"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                            <FormMessage />

                            <div className="flex flex-wrap gap-2 mt-2">
                              {watchedOfficeLocations.map((location) => (
                                <Badge
                                  key={location}
                                  variant="secondary"
                                  className="pl-2 pr-1 py-1.5 flex items-center gap-1"
                                >
                                  {location}
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="h-5 w-5 p-0 rounded-full"
                                    onClick={() =>
                                      removeOfficeLocation(location)
                                    }
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </Badge>
                              ))}
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Verification & Finish */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">
                        Company Verification
                      </h3>

                      <FormField
                        control={form.control}
                        name="companyLogo"
                        render={({ field: { onChange, value, ...field } }) => (
                          <FormItem>
                            <FormLabel>Company Logo (Optional)</FormLabel>
                            <FormControl>
                              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                                <p className="text-sm text-gray-600 mb-2">
                                  Upload your company logo
                                </p>
                                <Input
                                  type="file"
                                  accept=".png,.jpg,.jpeg,.svg"
                                  onChange={(e) => onChange(e.target.files)}
                                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
                                  {...field}
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                  Supported formats: PNG, JPG, JPEG, SVG (Max
                                  2MB)
                                </p>
                              </div>
                            </FormControl>
                            {value && value.length > 0 && (
                              <p className="text-sm text-green-600 flex items-center gap-1 mt-2">
                                <CheckCircle className="h-4 w-4" />{" "}
                                {value[0].name} uploaded successfully
                              </p>
                            )}
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="verificationDocument"
                        render={({ field: { onChange, value, ...field } }) => (
                          <FormItem>
                            <FormLabel>Company Verification Document</FormLabel>
                            <FormControl>
                              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                                <p className="text-sm text-gray-600 mb-2">
                                  Upload a business license, incorporation
                                  certificate, or tax document
                                </p>
                                <Input
                                  type="file"
                                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                                  onChange={(e) => onChange(e.target.files)}
                                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
                                  {...field}
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                  Supported formats: PDF, DOC, DOCX, PNG, JPG
                                  (Max 10MB)
                                </p>
                              </div>
                            </FormControl>
                            {value && value.length > 0 && (
                              <p className="text-sm text-green-600 flex items-center gap-1 mt-2">
                                <CheckCircle className="h-4 w-4" />{" "}
                                {value[0].name} uploaded successfully
                              </p>
                            )}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">
                        Terms & Conditions
                      </h3>

                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="acceptTerms"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-sm font-normal">
                                  I agree to the{" "}
                                  <a
                                    href="#"
                                    className="text-primary hover:underline"
                                  >
                                    Terms of Service
                                  </a>{" "}
                                  and{" "}
                                  <a
                                    href="#"
                                    className="text-primary hover:underline"
                                  >
                                    Privacy Policy
                                  </a>
                                </FormLabel>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="receiveUpdates"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-sm font-normal">
                                  I want to receive product updates and hiring
                                  tips via email
                                </FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button
                onClick={form.handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="min-w-[100px]"
              >
                {isSubmitting ? "Creating..." : "Create Account"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
