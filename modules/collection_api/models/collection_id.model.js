const sql = require('../../../config/db_config');
class CollectionId {
    constructor(data){
        this.collection_id = data.collection_id;
        this.name = data.name;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
        this.created_by = data.created_by;
        this.modified_by = data.modified_by;
        this.is_deleted = data.is_deleted;
    }

    async create(result){
        let query = `INSERT INTO collection (
            name,
            created_at,
            updated_at,
            created_by,
            modified_by
        ) VALUES ?`;
        let values = [
            [
                this.name,
                this.created_at,
                this.updated_at,
                this.created_by,
                this.modified_by
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
        sql.query('SELECT * FROM collection WHERE is_deleted != 1', (err, data) => {
             if (err) {
                result(err, {message: err.message});
            }
            result(null, data);
        })
    }

    async getOne(result){
        sql.query('SELECT * FROM collection WHERE is_deleted != 1 and collection_id = ?', [this.collection_id], (err, data) => {
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
        let query = "UPDATE collection SET " + keys + "Where collection_id = ?";

        sql.query(query, [...Object.values(body), this.collection_id], (err, data) => {
            if (err) {
                result(err, {message: err.message});
            }
            result(null, {success: true, data: data});
        });
    }
    
    async delete(result){
        sql.query('UPDATE collection SET is_deleted = 1 Where collection_id = ?', this.collection_id, (err, data) => {
            if (err) {
                result(err, {message: err.message});
            }
            result(null, {success: true, data: data});
        })
    }
}

module.exports = CollectionId;