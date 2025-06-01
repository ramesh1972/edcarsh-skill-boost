
import React from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center animate-slide-in-up">
          <h1 className="text-4xl font-bold mb-4 hover-color-shift">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-in-up animate-delay-200">
            Get in touch with our team. We're here to help you succeed in your learning journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="animate-slide-in-left hover-lift hover-glow">
            <CardHeader>
              <CardTitle className="hover-color-shift">Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="animate-slide-in-left animate-delay-200">
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <Input placeholder="John" className="hover-border-glow" />
                </div>
                <div className="animate-slide-in-right animate-delay-200">
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <Input placeholder="Doe" className="hover-border-glow" />
                </div>
              </div>
              
              <div className="animate-slide-in-left animate-delay-300">
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input type="email" placeholder="john@example.com" className="hover-border-glow" />
              </div>

              <div className="animate-slide-in-right animate-delay-300">
                <label className="block text-sm font-medium mb-2">Subject</label>
                <Input placeholder="Course inquiry, technical support, etc." className="hover-border-glow" />
              </div>

              <div className="animate-slide-in-up animate-delay-400">
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea 
                  placeholder="Tell us how we can help you..."
                  rows={5}
                  className="hover-border-glow"
                />
              </div>

              <Button className="w-full hover-lift hover-glow animate-slide-in-up animate-delay-500" size="lg">
                Send Message
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6 animate-slide-in-right">
            <Card className="hover-lift hover-glow">
              <CardHeader>
                <CardTitle className="hover-color-shift">Get in Touch</CardTitle>
                <CardDescription>
                  Multiple ways to reach our support team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 hover-color-shift animate-slide-in-right animate-delay-200">
                  <Mail className="w-5 h-5 text-primary hover-scale" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">support@edcrash.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 hover-color-shift animate-slide-in-right animate-delay-300">
                  <Phone className="w-5 h-5 text-primary hover-scale" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 hover-color-shift animate-slide-in-right animate-delay-400">
                  <MapPin className="w-5 h-5 text-primary hover-scale" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">123 Learning Street<br />Education City, EC 12345</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 hover-color-shift animate-slide-in-right animate-delay-500">
                  <Clock className="w-5 h-5 text-primary hover-scale" />
                  <div>
                    <p className="font-medium">Support Hours</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri: 9AM-6PM EST<br />Weekend: 10AM-4PM EST</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift hover-glow animate-slide-in-right animate-delay-700">
              <CardHeader>
                <CardTitle className="hover-color-shift">Quick Help</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start hover-border-glow hover-scale-small">
                  Course Enrollment Questions
                </Button>
                <Button variant="outline" className="w-full justify-start hover-border-glow hover-scale-small">
                  Technical Support
                </Button>
                <Button variant="outline" className="w-full justify-start hover-border-glow hover-scale-small">
                  Instructor Applications
                </Button>
                <Button variant="outline" className="w-full justify-start hover-border-glow hover-scale-small">
                  Corporate Training
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
