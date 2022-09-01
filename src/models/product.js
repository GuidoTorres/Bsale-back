
module.exports= (sequelize, type) =>{

    return sequelize.define(
        "product",
        {
            name: type.STRING,
            url_image: type.STRING,
            price: type.FLOAT,
            discount: type.INTEGER,
            category: type.INTEGER
        },
        {
            tableName: "product",
            timestamp: false
        }
    )
}