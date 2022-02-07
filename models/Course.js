const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Course extends Model{}
    Course.init ({
        title:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A title is required'
                },
                notEmpty: {
                    msg: 'Please provide a value for title'
                }
            }
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A description is required'
                },
                notEmpty: {
                    msg: 'Please provide a value for description'
                }
            }
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