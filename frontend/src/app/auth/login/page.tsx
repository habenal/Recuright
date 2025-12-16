'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setIsLoading(true);

        // Basic validation
        const newErrors: Record<string, string> = {};
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }

        try {
            // TODO: Replace with actual API call
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                // Store token
                localStorage.setItem('token', data.token);
                // Redirect based on role
                const role = data.user.role.toLowerCase();
                router.push(`/${role}/dashboard`);
            } else {
                const error = await response.json();
                setErrors({ general: error.message || 'Login failed' });
            }
        } catch (error) {
            setErrors({ general: 'An error occurred. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
            <div className="w-full max-w-md">
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
                        <CardTitle className="text-2xl">Welcome Back</CardTitle>
                        <CardDescription>Sign in to your account to continue</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {errors.general && (
                                <div className="p-4 bg-danger-50 border border-danger-200 rounded-lg text-danger-700 text-sm">
                                    {errors.general}
                                </div>
                            )}

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
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                error={errors.password}
                                leftIcon={
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                }
                            />

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                </label>
                                <Link href="/auth/forgot-password" className="text-sm text-primary-600 hover:text-primary-700">
                                    Forgot password?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                className="w-full"
                                isLoading={isLoading}
                            >
                                Sign In
                            </Button>

                            <div className="text-center text-sm text-gray-600">
                                Don't have an account?{' '}
                                <Link href="/auth/register" className="text-primary-600 hover:text-primary-700 font-medium">
                                    Register here
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
