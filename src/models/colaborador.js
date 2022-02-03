import { sequelize } from '../database'
import { DataTypes } from 'sequelize'

const Colaborador = sequelize.define(
    'Colaborador',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        nome_completo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        matricula:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        telefone:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_equipe: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_gestor: {
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
        tableName: 'tb_colaborador',
    }
)
// Colaborador.sync({ force: true })
//     .then(data => {
//         console.log('🔥 - Criando tabela de dados: "Colaborador"')
//     })
//     .catch(e => {
//         console.log('❌ -  Falha ao Criar Banco de dados: "Colaborador"')
//     })

module.exports = Colaborador
