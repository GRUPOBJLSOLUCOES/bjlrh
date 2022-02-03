import { sequelize } from '../database'
import { DataTypes } from 'sequelize'

const LoteIndividual = sequelize.define(
    'LoteIndividual',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        id_lote:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        matricula: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nome_completo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        arquivo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
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
        tableName: 'tb_lote_holerite_individual',
    }
)
// LoteIndividual.sync({ force: true })
//     .then(data => {
//         console.log('🔥 - Criando tabela de dados: "LoteIndividual"')
//     })
//     .catch(e => {
//         console.log('❌ -  Falha ao Criar Banco de dados: "LoteIndividual"')
//     })

module.exports = LoteIndividual
