/* Load GraphQL files */
const graphqlLoader = {
  test: /\.(graphql|gql)$/,
  exclude: /node_modules/,
  loader: 'graphql-tag/loader',
}

module.exports = {
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.module.rules.push(graphqlLoader)
    return config
  },
}
