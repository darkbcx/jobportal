import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { useForm, Controller } from "react-hook-form";

type FormData = {
  fullName: string;
  email: string;
  phone?: string;
  preferredSalary: number;
  salaryPeriod: string;
  coverLetter?: string;
};

type JobApplyDialogProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mockJobDetails: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSubmitApplication: (data: any) => void;
  open: boolean;
  onClose: () => void;
};

export default function JobApplyDialog({
  mockJobDetails,
  handleSubmitApplication,
  open,
  onClose,
}: JobApplyDialogProps) {
  console.log("open", open);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      salaryPeriod: "annually",
    },
  });

  const onSubmit = (data: FormData) => {
    const obj = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      preferredSalary: data.preferredSalary,
      salaryPeriod: data.salaryPeriod,
      coverLetter: data.coverLetter,
    };
    reset();
    handleSubmitApplication(obj);
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatSalary = (salary: any) => {
    return `$${salary.min.toLocaleString()} - $${salary.max.toLocaleString()} ${
      salary.currency
    } ${salary.period}`;
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Apply for {mockJobDetails.title}</DialogTitle>
          <DialogDescription>
            Fill out the form below to submit your application to{" "}
            {mockJobDetails.company.name}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  {...register("fullName", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />
                {errors.fullName && (
                  <p className="text-sm text-red-500">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone", {
                  pattern: {
                    value: /^[\+]?[1-9][\d]{0,15}$/,
                    message: "Invalid phone number",
                  },
                })}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Salary Expectations */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Salary Expectations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="preferredSalary">Preferred Salary *</Label>
                <Input
                  id="preferredSalary"
                  type="number"
                  placeholder="e.g. 120000"
                  {...register("preferredSalary", {
                    required: "Salary expectation is required",
                    min: {
                      value: 1,
                      message: "Salary must be greater than 0",
                    },
                    valueAsNumber: true,
                  })}
                />
                {errors.preferredSalary && (
                  <p className="text-sm text-red-500">
                    {errors.preferredSalary.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="salaryPeriod">Period</Label>
                <Controller
                  name="salaryPeriod"
                  control={control}
                  rules={{ required: "Please select a salary period" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="annually">Annually</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="hourly">Hourly</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.salaryPeriod && (
                  <p className="text-sm text-red-500">
                    {errors.salaryPeriod.message}
                  </p>
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Company range: {formatSalary(mockJobDetails.salary)}
            </p>
          </div>

          {/* Cover Letter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Cover Letter</h3>
            <div className="space-y-2">
              <Label htmlFor="coverLetter">
                Why are you interested in this position?
              </Label>
              <Textarea
                id="coverLetter"
                placeholder="Tell us why you're the perfect fit for this role..."
                rows={4}
                {...register("coverLetter", {
                  maxLength: {
                    value: 1000,
                    message: "Cover letter must be less than 1000 characters",
                  },
                })}
              />
              {errors.coverLetter && (
                <p className="text-sm text-red-500">
                  {errors.coverLetter.message}
                </p>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
