module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define('Group', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        members: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: false,
        },
    }, {timestamps: true}, )
    return Group;
}
