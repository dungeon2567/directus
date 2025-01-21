import { IconChevronRight, IconHeart, IconLogout, IconMessage, IconPlayerPause, IconSettings, IconStar, IconSwitchHorizontal, IconTrash } from '@tabler/icons-react';
import { Avatar, Group, Menu, Text, UnstyledButton, useMantineTheme } from '@mantine/core';
import classes from './UserButton.module.css';
import { useSupabaseClient, useUser } from '../SessionContext';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

const user = {
    name: 'Jane Spoonfighter',
    email: 'janspoon@fighter.dev',
    image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
};



export function UserButton() {
    const theme = useMantineTheme();
    const user = useUser();
    const supabase = useSupabaseClient();
    const router = useRouter();

    const supabaseLogout = useCallback(async () => {
        try {
            const { error } = await supabase.auth.signOut(); // Sign out user
            if (error) throw error; // Handle error if logout fails
            router.push('/login'); // Redirect to login page after logout
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }, [router]); // Add dependencies to the hook

    return (
        <Menu
            width={260}
            position="right-start"
            transitionProps={{ transition: 'pop-top-right' }}
            withinPortal
        >
            <Menu.Target>
                <UnstyledButton className={classes.user}>
                    <Group>
                        <Avatar
                            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                            radius="xl"
                        />

                        <div style={{ flex: 1 }}>
                            <Text size="sm" fw={500}>
                                {user?.user_metadata?.name}
                            </Text>

                            <Text c="dimmed" size="xs">
                                {user?.email}
                            </Text>
                        </div>

                        <IconChevronRight size={14} stroke={1.5} />
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item
                    leftSection={<IconHeart size={16} color={theme.colors.red[6]} stroke={1.5} />}
                >
                    Liked posts
                </Menu.Item>
                <Menu.Item
                    leftSection={<IconStar size={16} color={theme.colors.yellow[6]} stroke={1.5} />}
                >
                    Saved posts
                </Menu.Item>
                <Menu.Item
                    leftSection={<IconMessage size={16} color={theme.colors.blue[6]} stroke={1.5} />}
                >
                    Your comments
                </Menu.Item>

                <Menu.Label>Settings</Menu.Label>
                <Menu.Item leftSection={<IconSettings size={16} stroke={1.5} />}>
                    Account settings
                </Menu.Item>
                <Menu.Item leftSection={<IconSwitchHorizontal size={16} stroke={1.5} />}>
                    Change account
                </Menu.Item>
                <Menu.Item leftSection={<IconLogout size={16} stroke={1.5} />} onClick={supabaseLogout}>Logout</Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item leftSection={<IconPlayerPause size={16} stroke={1.5} />}>
                    Pause subscription
                </Menu.Item>
                <Menu.Item color="red" leftSection={<IconTrash size={16} stroke={1.5} />}>
                    Delete account
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}