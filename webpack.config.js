const {styles} = require('@ckeditor/ckeditor5-dev-utils');
// const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin');

module.exports = {
  module: {
    rules: [
    //   {
    //     test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
    //     use: [ 'raw-loader' ]
    //   },
    //   {
    //     loader: require.resolve( 'file-loader' ),
    //     options: {
    //         // Exclude `js` files to keep the "css" loader working as it injects
    //         // its runtime that would otherwise be processed through the "file" loader.
    //         // Also exclude `html` and `json` extensions so they get processed
    //         // by webpack's internal loaders.
    //     exclude: [
    //         /\.(js|mjs|jsx|ts|tsx)$/,
    //         /\.html$/,
    //         /\.json$/,
    //         /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
    //         /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/
    //     ],
    //     name: 'static/media/[name].[hash:8].[ext]',
    //   }
    // }

      {
        // test: cssRegex
        // exclude: [
        //   cssModuleRegex,
        //   /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
        // ],
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'singletonStyleTag',
              attributes: {
                  'data-cke': true
              }
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: styles.getPostCssConfig( {
                themeImporter: {
                 themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' )
                },
                minify: true
              } )
            }
          }
        ]
      },
    ],
  },
};
