const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./User');

const SecurityReport = sequelize.define('SecurityReport', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Users', key: 'id' } },
    riskScore: { type: DataTypes.INTEGER, allowNull: false },
    vulnerabilities: { type: DataTypes.JSON, defaultValue: [] },
    recommendations: { type: DataTypes.JSON, defaultValue: [] }
}, { timestamps: true, updatedAt: false, createdAt: 'generatedAt' });

User.hasMany(SecurityReport, { foreignKey: 'userId' });
SecurityReport.belongsTo(User, { foreignKey: 'userId' });

module.exports = SecurityReport;
