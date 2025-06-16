import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod validation schema
const jobApplySchema = z.object({
  preferredSalary: z
    .number({
      required_error: "Salary expectation is required",
      invalid_type_error: "Salary must be a number",
    })
    .min(1, "Salary must be greater than 0")
    .max(1000000000, "Salary must be reasonable"),
  salaryPeriod: z
    .string({
      required_error: "Please select a salary period",
    })
    .min(1, "Please select a salary period"),
  coverLetter: z
    .string()
    .max(1000, "Cover letter must be less than 1000 characters")
    .optional(),
});

type FormData = z.infer<typeof jobApplySchema>;

interface JobApplyFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mockJobDetails: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSubmitApplication: (data: any) => void;
  cancelSubmitApplication: () => void;
}

export default function JobApplyForm({
  mockJobDetails,
  handleSubmitApplication,
  cancelSubmitApplication,
}: JobApplyFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      preferredSalary: 0,
      salaryPeriod: "monthly",
      coverLetter: "",
    },
    resolver: zodResolver(jobApplySchema),
  });

  const onSubmit = (data: FormData) => {
    const obj = { ...data };
    reset();
    handleSubmitApplication(obj);
  };

  const onCancel = () => {
    reset();
    cancelSubmitApplication();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatSalary = (salary: any) => {
    return `$${salary.min.toLocaleString()} - $${salary.max.toLocaleString()} ${
      salary.currency
    } ${salary.period}`;
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Salary Expectations */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="preferredSalary">Preferred Salary *</Label>
              <Input
                id="preferredSalary"
                type="number"
                placeholder="e.g. 120000"
                {...register("preferredSalary", {
                  valueAsNumber: true,
                })}
              />
              <p className="text-sm text-muted-foreground">
                Company range: {formatSalary(mockJobDetails.salary)}
              </p>

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
                render={({ field }) => (
                  <div className="w-full">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="annually">Annually</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="hourly">Hourly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
              {errors.salaryPeriod && (
                <p className="text-sm text-red-500">
                  {errors.salaryPeriod.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Cover Letter */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="coverLetter">
              Why are you interested in this position?
            </Label>
            <Textarea
              id="coverLetter"
              placeholder="Tell us why you're the perfect fit for this role..."
              rows={4}
              {...register("coverLetter")}
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
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </div>
      </form>
    </>
  );
}
