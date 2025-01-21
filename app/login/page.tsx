"use client";

import {
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  TextInput,
  Title,
  Alert,
} from '@mantine/core';
import { useState } from 'react';
import { IconAlertCircle } from '@tabler/icons-react';
import classes from './Login.module.css';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const supabase = createClient();

  // Login handler
  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setError(error.message);
      } else {

        router?.push('/');  // Adjust this route as needed
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Register handler
  const handleRegister = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({ email, password });

      if (error) {
        setError(error.message);
      } else {
        // Handle successful registration
        console.log('Registration successful');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back to Supabase App!
        </Title>

        {error && (
          <Alert
            variant="outline"
            icon={<IconAlertCircle size={16} />}
            title="Error"
            color="red"
            mb="md"
            withCloseButton
          >
            {error}
          </Alert>
        )}

        <TextInput
          label="Email address"
          placeholder="hello@gmail.com"
          size="md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Checkbox label="Keep me logged in" mt="xl" size="md" />
        <Button
          fullWidth
          mt="xl"
          size="md"
          onClick={handleLogin}
          loading={loading}
        >
          Login
        </Button>
        <Button
          fullWidth
          mt="md"
          size="md"
          variant="outline"
          onClick={handleRegister}
          disabled={loading}
        >
          Register
        </Button>
      </Paper>
    </div>
  );
}