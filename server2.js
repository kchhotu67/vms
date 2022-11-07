const express = require('express');
var bodyParser = require('body-parser');
require('body-parser-xml-json')(bodyParser);
const source_business_router = require('./modules/source_business/routes/source_business_routes');
const voucher_router = require('./modules/voucher_batch/routes/voucher.routes');
const collection_id_router = require('./modules/collection_api/routes/collection_id.routes');
const collection_offering_router = require('./modules/collection_api/routes/collection_offer.routes');

const app = express();
app.use(express.json());
app.use('/api/v1/source_business', source_business_router);
app.use('/api/v1/voucher_batch', voucher_router);
app.use('/api/v1/collection_id', collection_id_router);
app.use('/api/v1/collection_offering', collection_offering_router);

app.get('/test', async(req, res) => {
    res.send('ok')
});

app.listen(5000, () => {
    console.log('server runing on port 5000')
});