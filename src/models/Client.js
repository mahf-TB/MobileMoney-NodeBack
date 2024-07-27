module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define("Client", {
      noms: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sexe: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
  
    Client.associate = (models) => {
        Client.hasMany(models.Compte, { foreignKey: "id_client", targetKey: 'id'  });
    };
  
    return Client;
  };