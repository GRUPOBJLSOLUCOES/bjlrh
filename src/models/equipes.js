import { sequelize } from '../database'
import { DataTypes } from 'sequelize'

const Equipe = sequelize.define(
    'Equipe',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        equipe_nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        responsavel:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_setor: {
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
        tableName: 'tb_equipe',
    }
)
// Equipe.sync({ force: true })
//     .then(data => {
//         console.log('🔥 - Criando tabela de dados: "Equipe"')
//     })
//     .catch(e => {
//         console.log('❌ -  Falha ao Criar Banco de dados: "Equipe"')
//     })

module.exports = Equipe
