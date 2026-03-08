const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./User');

const AttackLog = sequelize.define('AttackLog', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Users', key: 'id' } },
    attackType: { type: DataTypes.STRING, allowNull: false },
    target: { type: DataTypes.STRING, allowNull: false },
    result: { type: DataTypes.STRING, allowNull: false },
    riskLevel: { type: DataTypes.ENUM('Low', 'Medium', 'High', 'Critical') },
    details: { type: DataTypes.JSON }
}, { timestamps: true, updatedAt: false, createdAt: 'timestamp' });

User.hasMany(AttackLog, { foreignKey: 'userId' });
AttackLog.belongsTo(User, { foreignKey: 'userId' });

module.exports = AttackLog;
