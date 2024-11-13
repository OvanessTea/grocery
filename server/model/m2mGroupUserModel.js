module.exports = (sequelize, DataTypes) => {
    const GroupUser = sequelize.define('GroupUser', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        group_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {timestamps: true}, )
    return GroupUser;
}
