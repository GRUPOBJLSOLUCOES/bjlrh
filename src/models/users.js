import { sequelize } from '../database'
import { DataTypes } from 'sequelize'

const Users = sequelize.define(
    'Users',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nome_completo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        active: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_permission: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: Date.now,
        },
    },
    {
        timestamps: false,
        tableName: 'tb_users',
    }
)
// Users.sync({ force: true })
//     .then(data => {
//         console.log('🔥 - Criando tabela de dados: "Users"')
//     })
//     .catch(e => {
//         console.log('❌ -  Falha ao Criar Banco de dados: "Users"')
//     })
module.exports = Users
