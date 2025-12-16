'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [query, setQuery] = useState('');

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/jobs', label: 'Jobs' },
        { href: '/services', label: 'Services' },
        { href: '/employers', label: 'Employers' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <nav className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3" aria-label="RECURIGHT home">
                        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">R</span>
                        </div>
                        <div className="hidden sm:block">
                            <div className="font-bold text-xl gradient-text">RECURIGHT</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Professional Recruitment Solutions</div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex lg:flex items-center space-x-1" role="navigation" aria-label="Main navigation">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-slate-800 hover:text-primary-600 transition-colors font-medium"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Search + Auth Buttons */}
                    <div className="hidden lg:flex items-center space-x-3">
                        <div className="relative hidden lg:block">
                            <input
                                aria-label="Search jobs or services"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search jobs, services..."
                                className="input w-72"
                            />
                            <button
                                onClick={() => { if (query) window.location.href = `/jobs?q=${encodeURIComponent(query)}` }}
                                className="absolute right-1 top-1/2 -translate-y-1/2 btn btn-ghost"
                                aria-label="Search"
                            >
                                🔎
                            </button>
                        </div>
                        <Link href="/auth/login">
                            <Button variant="ghost" size="sm">
                                Login
                            </Button>
                        </Link>
                        <Link href="/auth/register">
                            <Button variant="primary" size="sm">
                                Register
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
                        aria-label="Toggle menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isMobileMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-gray-200 dark:border-slate-800 animate-slide-down" role="menu">
                    <div className="px-4 py-4 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-slate-800 hover:text-primary-600 transition-colors font-medium"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-4 space-y-2">
                            <Link href="/auth/login" className="block">
                                <Button variant="outline" size="sm" className="w-full">
                                    Login
                                </Button>
                            </Link>
                            <Link href="/auth/register" className="block">
                                <Button variant="primary" size="sm" className="w-full">
                                    Register
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};
