module.exports = (sequelize, DataTypes) => {
    const Recette = sequelize.define("Recette", {
      id_trans: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      montant: {
        type: DataTypes.FLOAT,
        allowNull: false,
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
  
    Recette.associate = (models) => {
        Recette.belongsTo(models.Transaction, { foreignKey: "id_trans" });
      };

    return Recette;
  };