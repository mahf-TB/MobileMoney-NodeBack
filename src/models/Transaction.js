module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define("Transaction", {
      numEnvoyeur: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numRecepteur: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      montant: {
        type: DataTypes.FLOAT,
        allowNull: false,  
      },
      raison: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  
    Transaction.associate = (models) => {
      Transaction.belongsTo(models.Compte, { foreignKey: "numEnvoyeur",  targetKey: 'numero' });
      Transaction.belongsTo(models.Compte, { foreignKey: "numRecepteur", targetKey: 'numero' });
    };
  
    return Transaction;
  };
  