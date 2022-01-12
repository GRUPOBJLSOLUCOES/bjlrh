import { sequelize } from '../database'
import { DataTypes } from 'sequelize'

const Setor = sequelize.define(
    'Setor',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        setor_nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: Date.now,
        },
    },
    {
        timestamps: false,
        tableName: 'tb_setor',
    }
)
// Setor.sync({ force: true })
//     .then(data => {
//         console.log('🔥 - Criando tabela de dados: "Setor"')
//     })
//     .catch(e => {
//         console.log('❌ -  Falha ao Criar Banco de dados: "Setor"')
//     })

module.exports = Setor
