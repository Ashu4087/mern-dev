import { __dirname } from '../server.js'
import fs from 'fs';

export const staticFileServe = (req, res) => {
    console.log(__dirname);
    const stFilePAth = path.join(__dirname,'/views/index.html');
    fs.access(stFilePAth), fs.constants.F_OK, (err) => {
        if (err) {
          console.error(`${stFilePAth} does not exist`);
          res.status(500).json({error: `${stFilePAth} exists`});
        } else {
          console.log(`${stFilePAth} exists`);
          res.sendFile(path.join(stFilePAth));
        }
      };
}