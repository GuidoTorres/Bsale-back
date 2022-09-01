
module.exports = (sequelize, type) => {

    return sequelize.define(
        "category",
        {
            name: type.STRING
        },
        {
            tableName: "category",
            timeStamp: false
        }
    )
}