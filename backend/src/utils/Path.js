import path from 'path';
import {fileURLToPath} from 'url';

class Path {
    constructor() {}

    dirname(url) {
        const __filename = fileURLToPath(url);
        const __dirname = path.dirname(__filename);
        return __dirname;
    }
}

export default new Path();