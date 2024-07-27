module.exports = (sequelize, DataTypes) => {
    const TauxRetrait = sequelize.define("TauxRetrait", {
      montant_min: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      montant_max: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fraisRetrait: {
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

    return TauxRetrait;
  };
