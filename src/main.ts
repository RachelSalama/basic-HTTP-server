import { createServer } from 'http'
import {handleRequest} from "./routes/router";
import { join } from 'path';

export const textFilePath: string = join(__dirname, 'assets/content.txt');
export const packageJsonPath: string = join(__dirname, '/../package.json');

const server = createServer(handleRequest);

const port = process.env.PORT || 4200; // Default to 4200 if PORT isn't defined

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
