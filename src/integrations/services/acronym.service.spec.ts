import AcronymService from "../../services/AcronymService";

const acronymService: AcronymService = new AcronymService();

test("Acronym functions should exists", () => {
  expect(acronymService.filterAcronyms).toBeDefined();
  expect(acronymService.findByAcronym).toBeDefined();
  expect(acronymService.randomAcronym).toBeDefined();
  expect(acronymService.saveAcronym).toBeDefined();
  expect(acronymService.updateAcronym).toBeDefined();
  expect(acronymService.removeAcronym).toBeDefined();
  expect(acronymService.totalAcronyms).toBeDefined();
});

describe("AcronymService tests", () => {
  test("Testing acronym save", async () => {
    expect(
      await acronymService.saveAcronym({ name: "test", value: "test" })
    ).toBeTruthy();
  });

  test("Testing acronym update", async () => {
    expect(
      await acronymService.updateAcronym({ name: "test", value: "test update" })
    ).toBeTruthy();
  });

  test("Testing acronym remove", async () => {
    expect(await acronymService.removeAcronym("test")).toBeTruthy();
  });

  test("Testing acronym filter", async () => {
    expect(
      (await acronymService.filterAcronyms(0, 5, "X")).length
    ).toBeGreaterThanOrEqual(0);
  });

  test("Testing acronym search", async () => {
    expect((await acronymService.findByAcronym("Y?")).name).toEqual("Y?");
  });

  test("Testing acronym random", async () => {
    expect((await acronymService.randomAcronym(5)).length).toBeGreaterThan(0);
  });

  test("Testing acronym total", async () => {
    expect(await acronymService.totalAcronyms()).toBeGreaterThanOrEqual(0);
  });
});
