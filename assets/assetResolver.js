const {
  ApolloServer,
  AddArgumentsAsVariables,
} = require("apollo-server-express");
const { getAssetList, getAssetById } = require("./fetchAsset");
const { addAsset } = require("./postAsset");
const { updateAsset } = require("./updateAsset");
const { deleteAsset } = require("./deleteAsset");
const assetResolver = {
  Query: {
    assets: getAssetList,
    assetById: getAssetById,
  },
  Mutation: {
    addAsset: addAsset,
    updateAsset: updateAsset,
    deleteAsset: deleteAsset,
  },
};

module.exports = assetResolver;
