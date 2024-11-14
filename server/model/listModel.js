module.exports = (sequelize, DataTypes) => {
    const List = sequelize.define('List', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        group_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        items: {
            type: DataTypes.ARRAY({ItemType}),
            allowNull: false,
        },
    }, {timestamps: true}, )
    return List;
}

const ItemType = DataTypes.OBJECT({
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
})
