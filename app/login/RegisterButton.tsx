"use client";

import {
    Anchor,
    Text,
} from '@mantine/core';

export default function RegisterButton() {
    return <Text ta="center" mt="md">
        Don&apos;t have an account?{' '}
        <Anchor<'a'> href="#" fw={700} onClick={(event) => event.preventDefault()}>
            Register
        </Anchor>
    </Text>
}