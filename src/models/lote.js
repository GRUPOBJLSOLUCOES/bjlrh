import { sequelize } from '../database'
import { DataTypes } from 'sequelize'

const LoteHolerite = sequelize.define(
    'LoteHolerite',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        responsavel: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        qtd_holerites:{
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
        tableName: 'tb_lote_holerite',
    }
)
// LoteHolerite.sync({ force: true })
//     .then(data => {
//         console.log('🔥 - Criando tabela de dados: "LoteHolerite"')
//     })
//     .catch(e => {
//         console.log('❌ -  Falha ao Criar Banco de dados: "LoteHolerite"')
//     })

module.exports = LoteHolerite
