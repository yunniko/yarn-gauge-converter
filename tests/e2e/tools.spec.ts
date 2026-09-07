import { expect, test } from "@playwright/test";

test("hook size converter finds equivalents for a known size", async ({ page }) => {
  await page.goto("/hook-size");
  await page.getByLabel("Metric size in mm").fill("5");
  const result = page.getByTestId("result");
  await expect(result).toContainText("H/8");
  await expect(result).toContainText("6");
});

test("needle size converter finds equivalents for a known size", async ({ page }) => {
  await page.goto("/needle-size");
  await page.getByLabel("Metric size in mm").fill("4");
  const result = page.getByTestId("result");
  await expect(result).toContainText("US");
  await expect(result).toContainText("6");
  await expect(result).toContainText("8");
});

test("gauge calculator adjusts a stitch count and shows steps", async ({ page }) => {
  await page.goto("/gauge");
  await page.getByLabel("Pattern gauge stitches").fill("20");
  await page.getByLabel("Pattern gauge width").fill("4");
  await page.getByLabel("Your gauge stitches").fill("22");
  await page.getByLabel("Your gauge width").fill("4");
  await page.getByLabel("Pattern count to adjust").fill("100");

  const result = page.getByTestId("result");
  await expect(result).toContainText("110");
});

test("yarn weight chart lists all 8 categories", async ({ page }) => {
  await page.goto("/yarn-weight");
  await expect(page.getByRole("heading", { name: /#0 — Lace/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: /#7 — Jumbo/ })).toBeVisible();
});

test("homepage links reach every tool", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Gauge calculator" }).click();
  await expect(page).toHaveURL(/\/gauge$/);
});
