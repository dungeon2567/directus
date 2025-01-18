'use client';

import { useState } from 'react';
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import {
  TextInput,
  PasswordInput,
  Button,
  Container,
  Paper,
  Text,
  Group,
  Anchor,
} from '@mantine/core';

export default function Login() {
  const supabase = createClientComponentClient<any>();

  // Type the state variables
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Type the event parameter
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        throw error;
      }
      alert('Login successful!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Text size="lg">
        Welcome back! Log in to your account
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleLogin}>
          <TextInput
            label="Email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Text color="red" size="sm" mt="sm">
              {error}
            </Text>
          )}

          <Button type="submit" fullWidth mt="xl" loading={loading}>
            Log in
          </Button>
        </form>

        <Group mt="md">
          <Anchor href="/forgot-password" size="sm">
            Forgot password?
          </Anchor>
          <Anchor href="/register" size="sm">
            Don't have an account? Register
          </Anchor>
        </Group>
      </Paper>
    </Container>
  );
}