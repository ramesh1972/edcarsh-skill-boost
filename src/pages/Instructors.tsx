import TitleComponent from '@/components/common/TitleComponent';
import InstructorDashCard from '@/components/instructors/InstructorDashCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Instructor } from '@/types';
import { getAllInstructors } from '@/adapters/superadminDataAdapter';
import { getOrgInstructors } from '@/adapters/orgDataAdapter';


const Instructors = () => {
  const orgId = 0;
  const instructors: Instructor[] = getOrgInstructors(orgId);
  return (
    <div className="min-h-full">
      <div className="container mx-auto px-4 py-12 space-y-8">
        <TitleComponent
          title="Instructors"
          subtitle="Meet our expert instructors who bring real-world experience to every course."
          iconName="instructor"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructors.map((instructor) => (
            <InstructorDashCard key={instructor.id} instructor={instructor} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-xl border-0 hover:scale-[1.025] transition-transform duration-200 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Want to Become an Instructor?</CardTitle>
              <CardDescription>
                Share your expertise and earn up to $100/hour teaching crash courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg">Apply to Teach</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Instructors;
