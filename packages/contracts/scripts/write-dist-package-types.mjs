import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentFilePath = fileURLToPath(import.meta.url);
const packageRoot = path.resolve(path.dirname(currentFilePath), "..");
const distRoot = path.join(packageRoot, "dist");

const outputs = [
  {
    directory: path.join(distRoot, "cjs"),
    packageJson: { type: "commonjs" }
  },
  {
    directory: path.join(distRoot, "esm"),
    packageJson: { type: "module" }
  }
];

for (const output of outputs) {
  await mkdir(output.directory, { recursive: true });
  await writeFile(
    path.join(output.directory, "package.json"),
    `${JSON.stringify(output.packageJson, null, 2)}\n`,
    "utf8"
  );
}
