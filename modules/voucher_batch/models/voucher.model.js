const sql = require('../../../config/db_config');
const VoucherBatch = require('./voucher_batch.model');
class Voucher {
    constructor(data){
        this.id = data.id;
        this.name = data.name;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
        this.hash_key = data.hash_key;
        this.created_by = data.created_by;
        this.modified_by = data.modified_by;
        this.code = data.code;
        this.batch_id = data.batch_id;
        this.is_deleted = data.is_deleted;
    }

    async create(result){
        let query = `INSERT INTO voucher (
            name,
            created_at,
            updated_at,
            hash_key,
            created_by,
            modified_by,
            code,
            batch_id
        ) VALUES ?`;
        let values = [
            [
                this.name,
                this.created_at,
                this.updated_at,
                this.hash_key,
                this.created_by,
                this.modified_by,
                this.code,
                this.batch_id
            ]
        ]
        sql.query(query, [values], (err, data) => {
            if (err) {
                return result(err, {message: err.message});
            }
            result(null, {success: true, data: data});
        });
    }

    async getAll(result){
        sql.query('SELECT * FROM voucher WHERE is_deleted != 1', (err, data) => {
             if (err) {
                result(err, {message: err.message});
            }
            result(null, data);
        })
    }

    async getOne(result){
        sql.query('SELECT * FROM voucher WHERE is_deleted != 1 and id = ?', [this.id], (err, data) => {
             if (err) {
                result(err, {message: err.message});
            }
            result(null, data);
        })
    }

    async update(body, result){
        let keys = ""
        Object.keys(body).forEach((key) => {
            keys += key;
            keys += " = ?,";
        });
        keys = keys.slice(0, keys.length-1);
        keys += " "
        console.log(keys);
        let query = "UPDATE voucher SET " + keys + "Where id = ?";

        sql.query(query, [...Object.values(body), this.id], (err, data) => {
            if (err) {
                result(err, {message: err.message});
            }
            result(null, {success: true, data: data});
        });
    }
    
    async delete(result){
        sql.query('UPDATE voucher SET is_deleted = 1 Where id = ?', this.id, (err, data) => {
            if (err) {
                result(err, {message: err.message});
            }
            result(null, {success: true, data: data});
        })
    }
    
    async deleteBatch(result){
        sql.query('UPDATE voucher SET is_deleted = 1 Where batch_id = ?', this.batch_id, (err, data) => {
            if (err) {
                result(err, {message: err.message});
            }
            let voucherBatch = new VoucherBatch({batch_id: this.batch_id});
            voucherBatch.delete((err, res) => {
                if(err){
                    return result(err, {message: err.message});
                }else{
                    result(null, {success: true, data: data});
                }
            })
        })
    }




}

module.exports = Voucher;