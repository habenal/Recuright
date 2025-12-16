import React from 'react';

export const LandingCard: React.FC<{
  title: string;
  description: string;
  icon?: React.ReactNode;
}> = ({ title, description, icon }) => {
  return (
    <article className="card hover-lift" role="article" aria-labelledby={`card-${title.replace(/\s+/g, '-')}`} tabIndex={0}>
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center text-2xl shadow-sm" aria-hidden>
          {icon}
        </div>
        <div>
          <h3 id={`card-${title.replace(/\s+/g, '-')}`} className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </div>
      </div>
    </article>
  );
};
