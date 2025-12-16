'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export default function RegisterPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        role: 'CANDIDATE',
        firstName: '',
        lastName: '',
        phone: '',
        agreeToTerms: false,
    });

    // Read `role` query param on the client to avoid prerender/useSearchParams issues
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const roleParam = params.get('role');
            if (roleParam) {
                setFormData((prev) => ({ ...prev, role: roleParam }));
            }
        }
    }, []);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    const roleOptions = [
        { value: 'CANDIDATE', label: 'Candidate - Looking for Jobs' },
        { value: 'EMPLOYER', label: 'Employer - Hiring Talent' },
        { value: 'RECRUITER', label: 'Recruiter - Professional Services' },
    ];

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        }

        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsLoading(true);

        try {
            // TODO: Replace with actual API call
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    role: formData.role,
                    profile: {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        phone: formData.phone,
                    },
                }),
            });

            if (response.ok) {
                const data = await response.json();
                // Store token
                localStorage.setItem('token', data.token);
                // Redirect to payment or dashboard
                if (formData.role === 'CANDIDATE') {
                    router.push('/payments/registration');
                } else {
                    router.push(`/${formData.role.toLowerCase()}/dashboard`);
                }
            } else {
                const error = await response.json();
                setErrors({ general: error.message || 'Registration failed' });
            }
        } catch (error) {
            setErrors({ general: 'An error occurred. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4 py-12">
            <div className="w-full max-w-2xl">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center space-x-3">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
                            <span className="text-primary-600 font-bold text-2xl">R</span>
                        </div>
                        <div className="text-white">
                            <div className="font-bold text-2xl">RECURIGHT</div>
                            <div className="text-sm opacity-90">Professional Recruitment</div>
                        </div>
                    </Link>
                </div>

                <Card className="shadow-2xl">
                    <CardHeader>
                        <CardTitle className="text-2xl">Create Your Account</CardTitle>
                        <CardDescription>Join thousands of professionals on RECURIGHT</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {errors.general && (
                                <div className="p-4 bg-danger-50 border border-danger-200 rounded-lg text-danger-700 text-sm">
                                    {errors.general}
                                </div>
                            )}

                            <Select
                                label="I am registering as"
                                options={roleOptions}
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                error={errors.role}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="First Name"
                                    type="text"
                                    placeholder="John"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    error={errors.firstName}
                                />
                                <Input
                                    label="Last Name"
                                    type="text"
                                    placeholder="Doe"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    error={errors.lastName}
                                />
                            </div>

                            <Input
                                label="Email Address"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                error={errors.email}
                                leftIcon={
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                }
                            />

                            <Input
                                label="Phone Number"
                                type="tel"
                                placeholder="+251-XXX-XXX-XXX"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                error={errors.phone}
                                leftIcon={
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                }
                            />

                            <Input
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                error={errors.password}
                                helperText="Must be at least 8 characters"
                                leftIcon={
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                }
                            />

                            <Input
                                label="Confirm Password"
                                type="password"
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                error={errors.confirmPassword}
                                leftIcon={
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                }
                            />

                            <div>
                                <label className="flex items-start">
                                    <input
                                        type="checkbox"
                                        className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                        checked={formData.agreeToTerms}
                                        onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                                    />
                                    <span className="ml-2 text-sm text-gray-600">
                                        I agree to the{' '}
                                        <Link href="/terms" className="text-primary-600 hover:text-primary-700">
                                            Terms of Service
                                        </Link>{' '}
                                        and{' '}
                                        <Link href="/privacy" className="text-primary-600 hover:text-primary-700">
                                            Privacy Policy
                                        </Link>
                                    </span>
                                </label>
                                {errors.agreeToTerms && (
                                    <p className="mt-1 text-sm text-danger-600">{errors.agreeToTerms}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                className="w-full"
                                isLoading={isLoading}
                            >
                                Create Account
                            </Button>

                            <div className="text-center text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link href="/auth/login" className="text-primary-600 hover:text-primary-700 font-medium">
                                    Sign in here
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <div className="mt-6 text-center">
                    <Link href="/" className="text-white hover:text-white/80 text-sm">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
