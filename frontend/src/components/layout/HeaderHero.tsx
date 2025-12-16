import React from 'react';
import Link from 'next/link';

export const HeaderHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="relative container mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 fade-in">
            Connecting Talent with <span className="text-yellow-300">Opportunity</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6 max-w-3xl mx-auto fade-in" style={{ animationDelay: '80ms' }}>
            Ethiopia's leading professional recruitment platform. Find your next career move or discover exceptional talent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center stagger-fade">
            <Link href="/auth/register?role=candidate" className="btn btn-lg btn-primary fade-in" aria-label="Register as candidate">
              <span>Register as Candidate</span>
              <span aria-hidden className="ml-2 transition-transform" style={{ display: 'inline-block' }}>→</span>
            </Link>
            <Link href="/auth/register?role=employer" className="btn btn-lg btn-outline text-white fade-in" aria-label="Post a vacancy">
              <span>Post a Vacancy</span>
              <span aria-hidden className="ml-2 transition-transform" style={{ display: 'inline-block' }}>↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
