// `node --import ./scripts/lib/register-ts.mjs <script>` to import src/*.ts.
import { register } from 'node:module'
register('./ts-hooks.mjs', import.meta.url)
