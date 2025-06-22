import { Card, CardContent } from "./ui/card";
import { JobPosting } from "@/lib/types";
import { Building2, MapPin, Clock, DollarSign } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useState } from "react";

export default function JobListItem({
  job,
  viewDetails,
}: {
  job: JobPosting;
  viewDetails: (id: string) => void;
}) {
  const maxSkillDisplayed = 3;
  const [showAllSkills, setShowAllSkills] = useState(false);
  const skills = job.required_skills || [];
  const hasMoreSkills = skills.length > maxSkillDisplayed;
  const displayedSkills = showAllSkills
    ? skills
    : skills.slice(0, maxSkillDisplayed);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-end md:items-start gap-4">
          <div className="flex-1 space-y-3">
            <h3 className="text-xl font-semibold">{job.title}</h3>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Building2 className="h-4 w-4" />
                <span>{job.employer?.company_name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{job.employment_type}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {displayedSkills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
              {hasMoreSkills && !showAllSkills && (
                <button
                  onClick={() => setShowAllSkills(true)}
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  +{skills.length - 3} more
                </button>
              )}
            </div>
          </div>

          <div className="text-right space-y-3">
            <div className="flex items-center justify-end space-x-1">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-xl font-semibold">
                {job.salary_min} - {job.salary_max}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              {job.salary_currency}
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => viewDetails(job.id.toString())}
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
