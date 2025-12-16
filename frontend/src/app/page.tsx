import Link from 'next/link';
import { HeaderHero } from '@/components/layout/HeaderHero';
import { LandingCard } from '@/components/ui/LandingCard';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/Card';

export default function HomePage() {
  const services = [
    {
      title: 'Candidate Screening',
      description: 'Advanced screening processes to identify the best talent for your organization.',
      icon: '🔍',
    },
    {
      title: 'Skills Assessments',
      description: 'Comprehensive technical and behavioral assessments for candidates.',
      icon: '📊',
    },
    {
      title: 'CV Preparation',
      description: 'Professional CV writing and review services to help you stand out.',
      icon: '📝',
    },
    {
      title: 'Registration Services',
      description: 'Easy registration process with secure payment options.',
      icon: '✅',
    },
    {
      title: 'Vacancy Posting',
      description: 'Post job vacancies and reach thousands of qualified candidates.',
      icon: '💼',
    },
    {
      title: 'Recruitment Support',
      description: 'End-to-end recruitment support from posting to onboarding.',
      icon: '🤝',
    },
  ];

  const testimonials = [
    {
      name: 'Abebe Kebede',
      role: 'Software Engineer',
      company: 'Tech Corp',
      content: 'RECURIGHT helped me find my dream job. The assessment process was thorough and the support was excellent!',
      avatar: '👨‍💼',
    },
    {
      name: 'Sara Mohammed',
      role: 'HR Manager',
      company: 'Finance Solutions',
      content: 'We\'ve hired 15+ talented professionals through RECURIGHT. Their screening process is top-notch.',
      avatar: '👩‍💼',
    },
    {
      name: 'Daniel Tesfaye',
      role: 'Marketing Specialist',
      company: 'Creative Agency',
      content: 'The CV preparation service transformed my resume. I got 3 interview calls within a week!',
      avatar: '👨‍💻',
    },
  ];

  return (
      <main className="flex-grow">
        <HeaderHero />

        {/* Services Section */}
        <section className="py-20 bg-gray-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="section-title">Our Services</h2>
              <p className="section-subtitle">
                Comprehensive recruitment solutions for candidates and employers
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index}>
                  <LandingCard
                    icon={<div className="text-4xl">{service.icon}</div>}
                    title={service.title}
                    description={service.description}
                  />
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/services">
                <Button size="lg" variant="outline">
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white dark:bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="section-title">What Our Users Say</h2>
              <p className="section-subtitle">
                Success stories from candidates and employers
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="relative">
                  <CardContent className="p-6">
                    <div className="text-5xl mb-4">{testimonial.avatar}</div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                      "{testimonial.content}""
                    </p>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* About Section Teaser */}
        <section className="py-20 bg-gradient-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  About RECURIGHT
                </h2>
                <p className="text-xl text-white/90 mb-6">
                  We are Ethiopia's premier professional recruitment solutions provider, dedicated to connecting exceptional talent with outstanding opportunities.
                </p>
                <p className="text-lg text-white/80 mb-8">
                  Our mission is to transform the recruitment landscape through innovative technology, rigorous screening processes, and personalized service.
                </p>
                <Link href="/about">
                  <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                    Learn More About Us
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-primary-600 mb-2">10K+</div>
                    <p className="text-gray-600">Active Candidates</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-primary-600 mb-2">500+</div>
                    <p className="text-gray-600">Employers</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-primary-600 mb-2">2K+</div>
                    <p className="text-gray-600">Jobs Posted</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-primary-600 mb-2">95%</div>
                    <p className="text-gray-600">Success Rate</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-50 dark:bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of professionals and companies using RECURIGHT
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/jobs">
                <Button size="lg" variant="primary">
                  Browse Jobs
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
  );
}
