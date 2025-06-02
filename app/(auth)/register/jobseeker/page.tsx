"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  User,
  Mail,
  Lock,
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  GraduationCap,
  Clock,
  Upload,
  CheckCircle,
  X,
  Plus,
  Trash2,
} from "lucide-react";

// Complete validation schema
const registrationSchema = z
  .object({
    // Account Information
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phone: z.string().optional(),
    location: z.string().optional(),

    // Professional Information
    title: z.string().min(1, "Professional title is required"),
    experienceLevel: z.string().min(1, "Experience level is required"),
    skills: z.array(z.string()).min(1, "At least one skill is required"),
    bio: z.string().optional(),
    education: z
      .array(
        z.object({
          degree: z.string().optional(),
          institution: z.string().optional(),
          year: z.string().optional(),
        })
      )
      .min(1),

    // Job Preferences
    desiredRole: z.string().min(1, "Desired role is required"),
    desiredSalary: z.string().optional(),
    salaryPeriod: z.string(),
    desiredLocation: z.string().min(1, "Desired location is required"),
    remotePreference: z.string(),
    availability: z.string(),

    // Resume and Terms
    resume: z
      .any()
      .refine((file) => file && file.length > 0, "Resume is required"),
    acceptTerms: z
      .boolean()
      .refine(
        (val) => val === true,
        "You must accept the terms and conditions"
      ),
    receiveEmails: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegistrationFormData = z.infer<typeof registrationSchema>;

const experienceLevels = [
  "Entry Level",
  "Junior",
  "Mid-Level",
  "Senior",
  "Lead",
  "Manager",
  "Executive",
];

const popularSkills = [
  "JavaScript",
  "React",
  "TypeScript",
  "Node.js",
  "HTML/CSS",
  "Python",
  "Java",
  "SQL",
  "AWS",
  "Docker",
  "Git",
  "UI/UX Design",
  "Product Management",
  "Agile",
  "DevOps",
  "Data Analysis",
  "Machine Learning",
];

export default function JobseekerRegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [skillInput, setSkillInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 4;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phone: "",
      location: "",
      title: "",
      experienceLevel: "",
      skills: [],
      bio: "",
      education: [{ degree: "", institution: "", year: "" }],
      desiredRole: "",
      desiredSalary: "",
      salaryPeriod: "annually",
      desiredLocation: "",
      remotePreference: "hybrid",
      availability: "2_weeks",
      resume: null,
      acceptTerms: false,
      receiveEmails: true,
    },
    mode: "onChange",
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control: form.control,
    name: "education",
  });

  const watchedSkills = form.watch("skills");

  const addSkill = (skill: string) => {
    if (skill && !watchedSkills.includes(skill)) {
      const currentSkills = form.getValues("skills");
      form.setValue("skills", [...currentSkills, skill]);
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const currentSkills = form.getValues("skills");
    form.setValue(
      "skills",
      currentSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  const validateCurrentStep = async (): Promise<boolean> => {
    let fieldsToValidate: (keyof RegistrationFormData)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = [
          "email",
          "password",
          "confirmPassword",
          "firstName",
          "lastName",
        ];
        break;
      case 2:
        fieldsToValidate = ["title", "experienceLevel", "skills"];
        break;
      case 3:
        fieldsToValidate = ["desiredRole", "desiredLocation"];
        break;
      case 4:
        fieldsToValidate = ["resume", "acceptTerms"];
        break;
    }

    const result = await form.trigger(fieldsToValidate);
    return result;
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

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);

    try {
      // Here you would typically send the registration data to your backend
      console.log("Registration data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Redirect to success page or dashboard
      router.push("/job-seeker/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Your Job Seeker Profile
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Find your dream job by creating a comprehensive profile
          </p>
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
              Account
            </span>
            <span
              className={
                currentStep >= 2 ? "text-primary font-medium" : "text-gray-500"
              }
            >
              Professional
            </span>
            <span
              className={
                currentStep >= 3 ? "text-primary font-medium" : "text-gray-500"
              }
            >
              Preferences
            </span>
            <span
              className={
                currentStep >= 4 ? "text-primary font-medium" : "text-gray-500"
              }
            >
              Finish
            </span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && "Account Information"}
              {currentStep === 2 && "Professional Background"}
              {currentStep === 3 && "Job Preferences"}
              {currentStep === 4 && "Upload Resume & Finish"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 &&
                "Create your account and provide your personal details"}
              {currentStep === 2 &&
                "Tell us about your professional experience and skills"}
              {currentStep === 3 && "What kind of job are you looking for?"}
              {currentStep === 4 &&
                "Upload your resume and complete your registration"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Step 1: Account Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Login Details</h3>

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Mail className="w-4 h-4" /> Email Address
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="your.email@example.com"
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
                      <h3 className="text-lg font-medium">
                        Personal Information
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
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
                          name="lastName"
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
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number (Optional)</FormLabel>
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

                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" /> Current Location
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="City, Country" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Professional Background */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">
                        Professional Summary
                      </h3>

                      {/* Profesional Title */}
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Briefcase className="w-4 h-4" /> Professional
                              Title
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. Senior Frontend Developer"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Experience Level */}
                      <FormField
                        control={form.control}
                        name="experienceLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" /> Experience Level
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your experience level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {experienceLevels.map((level) => (
                                  <SelectItem key={level} value={level}>
                                    {level}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Professional Summary */}
                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Professional Summary</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Write a brief summary of your professional background, experience, and career goals..."
                                rows={4}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Skills</h3>

                      {/* Skills */}
                      <FormField
                        control={form.control}
                        name="skills"
                        render={() => (
                          <>
                            <FormItem>
                              <FormLabel>Add Your Skills</FormLabel>
                              <div className="flex gap-2">
                                <Input
                                  value={skillInput}
                                  onChange={(e) =>
                                    setSkillInput(e.target.value)
                                  }
                                  placeholder="e.g. JavaScript"
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault();
                                      addSkill(skillInput);
                                    }
                                  }}
                                />
                                <Button
                                  type="button"
                                  onClick={() => addSkill(skillInput)}
                                  variant="outline"
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                              <FormMessage />

                              <div className="flex flex-wrap gap-2 mt-2">
                                {watchedSkills.map((skill) => (
                                  <Badge
                                    key={skill}
                                    variant="secondary"
                                    className="pl-2 pr-1 py-1.5 flex items-center gap-1"
                                  >
                                    {skill}
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      className="h-5 w-5 p-0 rounded-full"
                                      onClick={() => removeSkill(skill)}
                                    >
                                      <X className="h-3 w-3" />
                                    </Button>
                                  </Badge>
                                ))}
                              </div>

                              <div className="mt-4">
                                <p className="text-sm text-muted-foreground mb-2">
                                  Popular skills:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {popularSkills.map((skill) => (
                                    <Badge
                                      key={skill}
                                      variant="outline"
                                      className="cursor-pointer hover:bg-secondary"
                                      onClick={() => addSkill(skill)}
                                    >
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </FormItem>
                          </>
                        )}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Education</h3>
                        <Button
                          type="button"
                          onClick={() =>
                            appendEducation({
                              degree: "",
                              institution: "",
                              year: "",
                            })
                          }
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <Plus className="w-4 h-4" /> Add Education
                        </Button>
                      </div>

                      {educationFields.map((field, index) => (
                        <div
                          key={field.id}
                          className="space-y-4 p-4 border rounded-md"
                        >
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">
                              Education #{index + 1}
                            </h4>
                            {educationFields.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeEducation(index)}
                                className="h-8 w-8 p-0 text-red-500"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`education.${index}.degree`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center gap-2">
                                    <GraduationCap className="w-4 h-4" />{" "}
                                    Degree/Certificate
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="e.g. Bachelor of Science in Computer Science"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`education.${index}.institution`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Institution</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="e.g. University of Technology"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name={`education.${index}.year`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Year of Completion</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. 2020" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Job Preferences */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Job Preferences</h3>

                      <FormField
                        control={form.control}
                        name="desiredRole"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Briefcase className="w-4 h-4" /> Desired Role
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. Frontend Developer"
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
                          name="desiredSalary"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4" /> Desired
                                Salary
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="e.g. 80000"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="salaryPeriod"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Period</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="annually">
                                    Annually
                                  </SelectItem>
                                  <SelectItem value="monthly">
                                    Monthly
                                  </SelectItem>
                                  <SelectItem value="hourly">Hourly</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="desiredLocation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" /> Desired Location
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. New York, Remote"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Work Preferences</h3>

                      <FormField
                        control={form.control}
                        name="remotePreference"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" /> Remote Work
                              Preference
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="remote" id="remote" />
                                  <Label
                                    htmlFor="remote"
                                    className="font-normal"
                                  >
                                    Fully Remote
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="hybrid" id="hybrid" />
                                  <Label
                                    htmlFor="hybrid"
                                    className="font-normal"
                                  >
                                    Hybrid
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="onsite" id="onsite" />
                                  <Label
                                    htmlFor="onsite"
                                    className="font-normal"
                                  >
                                    On-site
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="availability"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Clock className="w-4 h-4" /> Availability to
                              Start
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="immediately">
                                  Immediately
                                </SelectItem>
                                <SelectItem value="2_weeks">
                                  2 Weeks Notice
                                </SelectItem>
                                <SelectItem value="1_month">
                                  1 Month Notice
                                </SelectItem>
                                <SelectItem value="3_months">
                                  3+ Months
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Upload Resume & Finish */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Upload Resume</h3>

                      <FormField
                        control={form.control}
                        name="resume"
                        render={({ field: { onChange, value, ...field } }) => (
                          <FormItem>
                            <FormLabel>Upload your resume/CV</FormLabel>
                            <FormControl>
                              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                                <p className="text-sm text-gray-600 mb-2">
                                  Drag and drop your resume here, or click to
                                  browse
                                </p>
                                <Input
                                  type="file"
                                  accept=".pdf,.doc,.docx"
                                  onChange={(e) => onChange(e.target.files)}
                                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
                                  {...field}
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                  Supported formats: PDF, DOC, DOCX (Max 5MB)
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
                          name="receiveEmails"
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
                                  I want to receive job alerts and career tips
                                  via email
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
