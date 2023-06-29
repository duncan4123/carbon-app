import { expect } from '@playwright/test';
import { cleanForkTest } from './fixture';

cleanForkTest.describe('Pause strategy', () => {
  cleanForkTest('Strategy pause modal snapshot', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Manage' }).first().click();
    await page.getByRole('button', { name: 'Pause Strategy' }).first().click();
    const pauseStrategyModal = await page.getByTestId('modal');

    expect(await pauseStrategyModal.screenshot()).toMatchSnapshot(
      'strategy-pause.png'
    );
  });

  cleanForkTest('Strategy paused successfully', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Manage' }).first().click();
    await page.getByRole('button', { name: 'Pause Strategy' }).first().click();

    const pauseStrategyModal = await page.getByTestId('modal');
    await pauseStrategyModal
      .getByRole('button', { name: 'Pause Strategy' })
      .first()
      .click();
    await pauseStrategyModal.waitFor({ state: 'hidden' });
    const notification = await page.getByText(
      'Your strategy was successfully paused.'
    );

    await expect(notification).toBeVisible();
  });
});
