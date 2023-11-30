import type { Meta, StoryObj } from '@storybook/svelte';
import { within, userEvent, expect } from '@storybook/test';

import Page from './Page.svelte';

const meta: Meta<Page> = {
  title: 'Example/Page',
  component: Page,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<Page>;

export const LoggedOut: Story = {};

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const LoggedIn: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = canvas.getByRole('button', { name: /Log in/i });
    await expect(loginButton).toBeInTheDocument();
    await userEvent.click(loginButton);
    await expect(loginButton).not.toBeInTheDocument();

    const logoutButton = canvas.getByRole('button', { name: /Log out/i });
    await expect(logoutButton).toBeInTheDocument();
  },
};
