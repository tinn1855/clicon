import React, { useState } from 'react';
import { PageLayout } from '@/components/templates';
import {
  Button,
  Heading1,
  Heading2,
  Heading3,
  Card,
  CardContent,
  Input,
  Textarea,
  Label,
} from '@/components/atoms';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  HelpCircle,
  Headphones,
  FileText,
} from 'lucide-react';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Our Store',
    details: ['123 Tech Street', 'Silicon Valley, CA 94025', 'United States'],
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+1 (555) 123-4567', '+1 (555) 987-6543', 'Mon-Fri: 9AM-6PM PST'],
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: [
      'support@clicon.com',
      'sales@clicon.com',
      'We reply within 24 hours',
    ],
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    details: [
      'Monday - Friday: 9AM - 6PM',
      'Saturday: 10AM - 4PM',
      'Sunday: Closed',
    ],
    color: 'bg-orange-100 text-orange-600',
  },
];

const faqItems = [
  {
    question: 'How long does shipping take?',
    answer:
      'Standard shipping takes 3-5 business days. Express shipping is available for 1-2 day delivery.',
  },
  {
    question: 'What is your return policy?',
    answer:
      'We offer a 30-day return policy for most items. Products must be in original condition with packaging.',
  },
  {
    question: 'Do you offer international shipping?',
    answer:
      'Yes, we ship to over 25 countries worldwide. Shipping costs and times vary by destination.',
  },
  {
    question: 'How can I track my order?',
    answer:
      "Once your order ships, you'll receive a tracking number via email to monitor your package.",
  },
];

const supportOptions = [
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Get instant help from our support team',
    action: 'Start Chat',
    available: 'Available 24/7',
  },
  {
    icon: Headphones,
    title: 'Phone Support',
    description: 'Speak directly with our specialists',
    action: 'Call Now',
    available: 'Mon-Fri 9AM-6PM',
  },
  {
    icon: FileText,
    title: 'Help Center',
    description: 'Browse our comprehensive guides',
    action: 'Visit Help Center',
    available: 'Self-service',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 py-12 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Heading1 className="text-white mb-6 text-3xl lg:text-5xl">
              Contact Us
            </Heading1>
            <p className="text-lg lg:text-xl text-white/90 leading-relaxed">
              We'd love to hear from you. Send us a message and we'll respond as
              soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div
                    className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${info.color}`}
                  >
                    <info.icon className="h-8 w-8" />
                  </div>
                  <Heading3 className="mb-3 text-lg">{info.title}</Heading3>
                  <div className="space-y-1">
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-sm text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Heading2 className="mb-6 text-2xl lg:text-3xl">
                Send us a Message
              </Heading2>
              <Card>
                <CardContent className="p-6">
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your full name"
                            required
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@example.com"
                            required
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="What is this about?"
                          required
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us more about your inquiry..."
                          required
                          rows={6}
                          className="mt-1 resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  ) : (
                    <div className="text-center py-8">
                      <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                      <Heading3 className="mb-2 text-green-600">
                        Message Sent!
                      </Heading3>
                      <p className="text-muted-foreground">
                        Thank you for contacting us. We'll get back to you
                        within 24 hours.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Support Options */}
            <div>
              <Heading2 className="mb-6 text-2xl lg:text-3xl">
                Other Ways to Reach Us
              </Heading2>
              <div className="space-y-4">
                {supportOptions.map((option, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <option.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <Heading3 className="mb-1">{option.title}</Heading3>
                          <p className="text-muted-foreground text-sm mb-2">
                            {option.description}
                          </p>
                          <p className="text-xs text-muted-foreground mb-3">
                            {option.available}
                          </p>
                          <Button variant="outline" size="sm">
                            {option.action}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Heading2 className="mb-4 text-2xl lg:text-3xl flex items-center justify-center gap-2">
              <HelpCircle className="h-8 w-8 text-primary" />
              Frequently Asked Questions
            </Heading2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Quick answers to common questions. Can't find what you're looking
              for? Contact us directly.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <Card key={index} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-6">
                  <Heading3 className="mb-3 text-lg">{item.question}</Heading3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Heading2 className="mb-4 text-2xl lg:text-3xl">
              Visit Our Store
            </Heading2>
            <p className="text-muted-foreground">
              Come see our products in person at our flagship location
            </p>
          </div>

          <div className="bg-muted rounded-lg h-64 lg:h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Interactive map would be displayed here
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                123 Tech Street, Silicon Valley, CA 94025
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
