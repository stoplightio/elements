import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

export async function chooseOption(select: Element, option: string) {
  await userEvent.click(select);
  await userEvent.selectOptions(screen.getByRole('listbox'), screen.getByRole('option', { name: option }));
}
