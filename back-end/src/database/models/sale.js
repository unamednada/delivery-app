module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    userId: { type: DataTypes.INTEGER, field: 'user_id', foreignKey: true },
    sellerId: { type: DataTypes.INTEGER, field: 'seller_id', foreignKey: true },
    totalPrice: { type: DataTypes.DECIMAL, field: 'total_price' },
    deliveryAddress: { type: DataTypes.STRING, field: 'delivery_address' },
    deliveryNumber: { type: DataTypes.STRING, field: 'delivery_number' },
    saleDate: { type: DataTypes.DATE, field: 'sale_date', defaultValue: DataTypes.NOW },
    status: { type: DataTypes.STRING, defaultValue: 'Pendente' },
  }, {
    tableName: 'sales',
    timestamps: false,
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
    Sale.belongsTo(models.User, { as: 'seller', foreignKey: 'sellerId' });
  };

  return Sale;
};
