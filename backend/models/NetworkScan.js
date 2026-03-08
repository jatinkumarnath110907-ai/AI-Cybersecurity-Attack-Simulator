const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./User');

const NetworkScan = sequelize.define('NetworkScan', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Users', key: 'id' } },
    targetIp: { type: DataTypes.STRING, allowNull: false },
    detectedPorts: { type: DataTypes.JSON, defaultValue: [] },
    status: { type: DataTypes.ENUM('running', 'completed', 'failed'), defaultValue: 'completed' }
}, { timestamps: true });

User.hasMany(NetworkScan, { foreignKey: 'userId' });
NetworkScan.belongsTo(User, { foreignKey: 'userId' });

module.exports = NetworkScan;
