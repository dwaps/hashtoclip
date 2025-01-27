#!/usr/bin/env node

import bcrypt from "bcrypt";
import clipboardy from "clipboardy";
import dotenv from "dotenv";

dotenv.config();

const [, , input] = process.argv;
const rounds = parseInt(process.env.BCRYPT_ROUNDS, 10);

if (!input) {
  console.error("\n!! Please provide a string to hash\n");
  process.exit(1);
}

bcrypt.hash(input, rounds || 10, (err, hash) => {
  if (err) {
    console.error("\n!! Error generating hash:", err);
    process.exit(1);
  }

  clipboardy
    .write(hash)
    .then(() => {
      console.log(
        `\n Hash generated with ${rounds} and copied to clipboards\n`
      );
      console.log(hash);
    })
    .catch(console.error);
});
