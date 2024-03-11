import { harfLatinidenOsmaniye } from "../nuve/harfLatinidenOsmaniye";

test("kelime başı i harfinin Osmani hali", () => {
  const netice = harfLatinidenOsmaniye("i", "", false, false, false);
  expect(netice).toBe("اي");
});
