'use strict';

import express from 'express';
import path from 'node:path';

const app = express()
const port = 3000

app.set('views', path.join('views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index'))

app.listen(port, () => console.log(`Example app listening on port ${port}`));