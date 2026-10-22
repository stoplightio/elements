import { act, screen, waitFor } from '@testing-library/react';

const nextFrame = () => new Promise<void>(resolve => requestAnimationFrame(() => resolve()));

/**
 * Waits until a menu that was open has closed and given focus back to its button.
 *
 * React Aria restores focus to the button of a menu in an animation frame after the menu is gone. When a test goes on
 * to type in a field right after choosing a menu item, that can happen after the click on the field, and the
 * keystrokes then go to the button instead of the field.
 */
export async function waitForMenuToClose() {
  await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
  // a menu that stays open (checkbox items) is waited for above and fails the test, so there is no menu left here
  await act(async () => {
    await nextFrame();
    await nextFrame();
  });
}
