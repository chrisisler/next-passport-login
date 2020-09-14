import { promisify } from 'util';
import fs from 'fs';

import { User } from './interfaces';

const databasePath = 'database.json';

const readFile = promisify(fs.readFile);

export const getDatabase = (): Promise<{ users: User[] }> =>
  readFile(databasePath, 'utf8')
    .then(fileContent => ({ users: JSON.parse(fileContent) }))
    .catch(() => ({ users: [] }));
