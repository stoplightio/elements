import { screen } from '@testing-library/dom';
import userEvent, { TargetElement } from '@testing-library/user-event';

export async function chooseOption(select: TargetElement, option: string) {
  userEvent.click(select);
  await userEvent.selectOptions(screen.getByRole('listbox'), screen.getByRole('option', { name: option }));
}
