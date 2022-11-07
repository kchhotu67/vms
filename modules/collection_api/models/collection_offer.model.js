const sql = require('../../../config/db_config');
class CollectionOffering {
    constructor(data){
      this.collection_id = data.collection_id;
      this.offering_id = data.offering_id;
      this.is_deleted = data.is_deleted;
    }

    async create(result){
        let query = `INSERT INTO collection_offering (
            collection_id,
            offering_id
        ) VALUES ?`;
        let values = [
            [
                this.collection_id,
                this.offering_id
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
        sql.query('SELECT * FROM collection_offering WHERE is_deleted != 1', (err, data) => {
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
        let query = "UPDATE collection_offering SET " + keys + "Where collection_id = ?";

        sql.query(query, [...Object.values(body), this.collection_id], (err, data) => {
            if (err) {
                result(err, {message: err.message});
            }
            result(null, {success: true, data: data});
        });
    }

    async getOne(result){
        sql.query('SELECT * FROM collection_offering WHERE collection_id = ? LIMIT 1', [this.collection_id], (err, data) => {
             if (err) {
                result(err, {message: err.message});
            }
            result(null, data);
        })
    }
    
    async delete(result){
        sql.query('UPDATE collection_offering SET is_deleted = 1 Where collection_id = ?', this.collection_id, (err, data) => {
            if (err) {
                result(err, {message: err.message});
            }
            result(null, {success: true, data: data});
        })
    }
}

module.exports = CollectionOffering;