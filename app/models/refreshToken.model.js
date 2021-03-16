module.exports = (sequelize, Sequelize) => {
    const RefreshToken = sequelize.define("refreshToken", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER
      },
      refreshToken: {
        type: Sequelize.TEXT
      },
    }); 

    return RefreshToken;
  };