import React from 'react';
import { AuthLayout } from '@/components/templates';
import { Button, Input, Label } from '@/components/atoms';

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState('');
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Forgot password:', { email });
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle="We've sent a password reset link to your email address."
      >
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-muted-foreground">
            If an account with email {email} exists, you will receive a password
            reset link shortly.
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="w-full"
          >
            Back to form
          </Button>
          <div className="text-center text-sm">
            <a
              href="/signin"
              className="font-medium text-primary hover:text-primary/80"
            >
              Back to sign in
            </a>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="Enter your email address and we'll send you a reset link."
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1"
            placeholder="Enter your email"
          />
        </div>

        <Button type="submit" className="w-full">
          Send reset link
        </Button>

        <div className="text-center text-sm">
          <a
            href="/signin"
            className="font-medium text-primary hover:text-primary/80"
          >
            Back to sign in
          </a>
        </div>
      </form>
    </AuthLayout>
  );
}
