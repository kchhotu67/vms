const sql = require('../../../config/db_config')
class SourceBusiness {
    constructor(data){
        this.brand_id = data.brand_id;
        this.brand_name = data.brand_name;
        this.brand_intro=data.brand_intro;
        this.brand_img1 = data.brand_img1;
        this.brand_img2 = data.brand_img2;
        this.brand_detail = data.brand_detail; 
        this.website_link = data.website_link;
        this.poc_name=data.poc_name;
        this.poc_num  = data.poc_num ;
        this.poc_email=data.poc_email;
        this.fb_link = data.fb_link;
        this.insta_link=data.insta_link;
        this.twitter_link = data.twitter_link;
        this.is_deleted = data.is_deleted;
        this.is_verified = data.is_verified; 
        this.verified_by = data.verified_by;
        this.created_by=data.created_by;
        this.modified_by = data.modified_by;
        this.created_at = data.created_at;
        this.modified_at = data.modified_at; 
        this.agent = data.agent;
    }

    async create(result){
        let query = `INSERT INTO source_business (
            brand_id,
            brand_name,
            brand_intro,
            brand_img1,
            brand_img2,
            brand_detail,
            website_link,
            poc_name,
            poc_num,
            poc_email,
            fb_link,
            insta_link,
            twitter_link,
            is_deleted,
            is_verified,
            verified_by,
            created_by,
            modified_by,
            created_at,
            modified_at,
            agent
        ) VALUES ?`;
        let values = [
            [
                this.brand_id,
                this.brand_name,
                this.brand_intro,
                this.brand_img1,
                this.brand_img2,
                this.brand_detail,
                this.website_link,
                this.poc_name,
                this.poc_num,
                this.poc_email,
                this.fb_link,
                this.insta_link,
                this.twitter_link,
                this.is_deleted,
                this.is_verified,
                this.verified_by,
                this.created_by,
                this.modified_by,
                this.created_at,
                this.modified_at,
                this.agent,
            ]
        ]
        sql.query(query, [values], (err, data) => {
            if (err) {
                result(true, {message: 'something went wrong'});
            }
            result(null, {success: true, data: data});
        });
    }

    async getAll(result){
        console.log('hell')
        sql.query('SELECT * FROM source_business WHERE is_deleted != 1', (err, data) => {
             if (err) {
                result(err, {message: err.message});
            }
            result(null, data);
        })
    }

    async getOne(result){
        sql.query('SELECT * FROM source_business WHERE is_deleted != 1 and brand_id = ?', [this.brand_id], (err, data) => {
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
        let query = "UPDATE source_business SET " + keys + "Where brand_id = ?";
        console.log(query);
        // return;
        sql.query(query, [...Object.values(body), this.brand_id], (err, data) => {
            if (err) {
                result(err);
            }
            result(null, {success: true, data: data});
        });
    }
    
    async delete(result){
        sql.query('UPDATE source_business SET is_deleted = 1 Where brand_id = ?', this.brand_id, (err, data) => {
            if (err) {
                result(true, {message: 'something went wrong'});
            }
            result(null, {success: true, data: data});
        })
    }
}

module.exports = SourceBusiness;