import { createServer } from 'http'
import {handleRequest} from "./routes/router";

const server = createServer(handleRequest);

server.listen(4200, () => {
    console.log('Server is running on http://localhost:4200');
});
