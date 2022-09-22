module.exports = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define('SalesProduct', {
    saleId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      onUpdate: 'CASCADE',
      allowNull: false,
      field: 'sale_id',
    },
    productId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      field: 'product_id',
      allowNull: false,
      onUpdate: 'CASCADE',
    },
    quantity: DataTypes.INTEGER,
  }, {
    tableName: 'salesProducts',
    timestamps: false,
  });

  SalesProduct.associate = (models) => {
    models.Product.belongsToMany(models.Sale, { as: 'sales', through: SalesProduct, foreignKey: 'saleId', otherKey: 'productId' });
    models.Sale.belongsToMany(models.Product, { as: 'products', through: SalesProduct, foreignKey: 'productId', otherKey: 'saleId' });
  };

  return SalesProduct;
};
