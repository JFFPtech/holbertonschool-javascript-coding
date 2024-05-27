import express from 'express';
import routes from './routes/index.js';

const app = express();
const port = 1245;

app.use('/', routes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

export default app;
