import { onSuccess } from "../../utils/response";

test("onSuccess should exists", () => {
  expect(onSuccess).toBeDefined();
});

test("Testing onSuccess", () => {
  expect(onSuccess("test").success).toBeTruthy();
});
