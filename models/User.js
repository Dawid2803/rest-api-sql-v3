const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
    class User extends Model{}
    User.init ({
        firstName:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A first name is required'
                },
                notEmpty: {
                    msg: 'Please provide a value for firstName'
                }
            }
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A last name is required'
                },
                notEmpty: {
                    msg: 'Please provide a value for lastName'
                }
            }
        },
        emailAddress:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "The email you entered already exists"
            },
            validate: {
                notNull: {
                    msg: 'An email  is required'
                },
                isEmail: {
                    msg: 'Please provide a valid email address'
                }
            }
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
            set(val) {
                if(val === this.password){
                    const hashedPassword = bcrypt.hashSync(val, 10);
                    this.setDataValue('password', hashedPassword);
                }
            },
            validate: {
                notNull: {
                    msg: 'A password is required'
                },
                notEmpty: {
                    msg: 'Please provide a value for password'
                }
            }
        },
        

    }, { sequelize });

    User.associate = (models) => {
        User.hasMany(models.Course, {
            foreignKey:{
                fieldName: 'userId',
                allowNull: false,
            },
        })
    }
    return User;
};