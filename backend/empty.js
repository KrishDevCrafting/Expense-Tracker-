
// npm install bcrypt
const bcrypt = require('bcrypt');

const hash = '$2b$10$citFFJ601xHrTisPlRJHIeL9h2YGFITfYS2JBM0qKTjKmVTHU.DDy';

async function check(plain) {
  const ok = await bcrypt.compare(plain, hash);
  console.log(ok ? 'Match ✅' : 'No match ❌');
}

check('yourCandidatePasswordHere');
