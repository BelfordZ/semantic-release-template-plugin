import { prepare, verifyConditions } from "./index";
import SemanticReleaseError from "./semantic-release-error";
import * as fs from "fs";
import * as path from "path";
import * as util from "util";

const appendFile = util.promisify(fs.appendFile);
const readFile = util.promisify(fs.readFile);

const p = path.resolve(process.cwd(), "./foobar");

const touchFile = () => {
  fs.closeSync(fs.openSync(p, "w"));
};

const removeFile = () => {
  return fs.unlinkSync(p);
};

const testData = { awesomeness: 123 };
const testTemplate = "foo <%= version %> bar <%= awesomeness %>";

describe("template plugin", () => {

  describe("verifyConditions", () => {

    it("can error on verifyConditions", async () => {
      await expect(verifyConditions({ documentLocation: "./foobar", templateData: testData }, {}))
        .rejects
        .toBeInstanceOf(SemanticReleaseError);
    });

    it("can pass verifyConditions", async () => {
      touchFile();
      const valid = await verifyConditions({ documentLocation: "./foobar", templateData: testData }, {});
      expect(valid).toBe(true);
      removeFile();
    });
  });

  describe("prepare", () => {

    it("can fail if no next release version", () => {
      touchFile();
      return prepare({ documentLocation: "./foobar", templateData: testData }, {}).catch((e: SemanticReleaseError) => {
        expect(e.message).toContain("No nextRelease version");
        removeFile();
      });
    });

    it("can pass prepare and set the version", async () => {
      touchFile();
      await appendFile(p, testTemplate);
      const prepared = await prepare(
        { documentLocation: "./foobar", templateData: testData },
        { nextRelease: { version: "1.0.0" } },
      );
      const file = await readFile(p, "utf8");
      expect(file).toEqual("foo 1.0.0 bar 123");
      removeFile();
    });
  });
});
