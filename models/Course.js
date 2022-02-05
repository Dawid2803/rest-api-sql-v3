const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Course extends Model{}
    Course.init ({
        title:{
            type: DataTypes.STRING,
        },
        description:{
            type: DataTypes.TEXT,
        },
        estimatedTime:{
            type: DataTypes.STRING,
        },
        materialsNeeded:{
            type: DataTypes.STRING,
        },
        userId:{
            type: DataTypes.INTEGER,
        }

    }, { sequelize });

    Course.associate = (models) => {
        Course.belongsTo(models.User, {
            foreignKey:{
                fieldName: 'userId',
                allowNull: false,
            },
        });
    };

    return Course;
};