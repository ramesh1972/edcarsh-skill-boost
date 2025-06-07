import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import TitleComponent from '@/components/common/TitleComponent';

const Contact = () => {
  return (
    <div className="min-h-full ">
      <div className="container mx-auto px-4 py-12 space-y-8">
        <TitleComponent
          title="Contact Us"
          subtitle="Have questions or need help? Reach out and our team will get back to you quickly."
          iconName="contact"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-xl border-0 rounded-xl p-8 hover:scale-[1.025] transition-transform duration-200">
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <Input placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <Input placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input type="email" placeholder="john@example.com" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <Input placeholder="Course inquiry, technical support, etc." />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea 
                  placeholder="Tell us how we can help you..."
                  rows={5}
                />
              </div>

              <Button className="w-full" size="lg">Send Message</Button>
            </CardContent>
          </div>

          <div className="space-y-6">
            <div className="bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-xl border-0 rounded-xl p-8 hover:scale-[1.025] transition-transform duration-200">
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  Multiple ways to reach our support team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">support@edcrash.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">123 Learning Street<br />Education City, EC 12345</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Support Hours</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri: 9AM-6PM EST<br />Weekend: 10AM-4PM EST</p>
                  </div>
                </div>
              </CardContent>
            </div>

            <div className="bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-xl border-0 rounded-xl p-8 hover:scale-[1.025] transition-transform duration-200">
              <CardHeader>
                <CardTitle>Quick Help</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Course Enrollment Questions
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Technical Support
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Instructor Applications
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Corporate Training
                </Button>
              </CardContent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
