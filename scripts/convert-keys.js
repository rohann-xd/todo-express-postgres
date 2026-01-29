const fs = require("fs");
const path = require("path");

const keysDir = path.join(__dirname, "..", "keys");

const files = [
  {
    input: path.join(keysDir, "private.key"),
    output: path.join(keysDir, "private_env.txt"),
    name: "PRIVATE",
  },
  {
    input: path.join(keysDir, "public.key"),
    output: path.join(keysDir, "public_env.txt"),
    name: "PUBLIC",
  },
];

function convertKey({ input, output, name }) {
  if (!fs.existsSync(input)) {
    console.error(`❌ ${name} key not found at: ${input}`);
    process.exit(1);
  }

  const key = fs.readFileSync(input, "utf8");

  const escaped = key.replace(/\r?\n/g, "\\n").trim();

  fs.writeFileSync(output, escaped);

  console.log(`✅ ${name} key converted → ${path.basename(output)}`);
}

files.forEach(convertKey);

console.log("\n🚀 Keys are now ENV-ready.");
console.log("⚠️  NEVER commit these files.");
