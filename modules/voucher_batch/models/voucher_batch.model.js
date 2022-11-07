const sql = require('../../../config/db_config')
class VoucherBatch {
    constructor(data){
        this.batch_id = data.batch_id;
        this.offering_id = data.offering_id;
        this.is_deleted = data.is_deleted;
    }

    async create(result){
        let query = `INSERT INTO voucher_batch (
            offering_id
        ) VALUES ?`;
        let values = [
            [
                this.offering_id
            ]
        ]
        sql.query(query, [values], (err, data) => {
            if (err) {
                console.log(err);
                result(err, {message: err.message});
            }
            result(null, {success: true, data: data});
        });
    }

    async getAll(result){
        sql.query('SELECT * FROM voucher_batch WHERE is_deleted != 1', (err, data) => {
             if (err) {
                result(err, {message: err.message});
            }
            result(null, data);
        })
    }
    
    async delete(result){
        sql.query('UPDATE voucher_batch SET is_deleted = 1 Where batch_id = ?', this.batch_id, (err, data) => {
            if (err) {
                result(err, {message: err.message});
            }
            result(null, {success: true, data: data});
        })
    }
}

module.exports = VoucherBatch;