'use strict';

//module path de node.js
const path = require('path');
//Uglify pour la minification
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
//Extract Text pour externaliser la css
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//Manifeste (pour les versions des fichiers js générés avec un hash (utile pour éviter les problèmes de cache))
const ManifestPlugin = require('webpack-manifest-plugin');
//Pour supprimer le dossier "dist" entre deux compilation
const CleanWebpackPlugin = require('clean-webpack-plugin');
//Pour créer et alimenter le fichier index.html (balise script et link crées dynamiquement)
const HtmlWebpackPlugin = require('html-webpack-plugin');
//Plugin pour donner un ordre aux balises scripts
const CommonsPlugin = new require("webpack/lib/optimize/CommonsChunkPlugin");

//Sommes nous en phase de développement ?
const dev = process.env.NODE_ENV === "dev";

//Les loaders pour les fichiers css (d'autres seront ajouté par la suite via un push())
let cssLoaders = [
    {
        loader: 'css-loader',
        options: {
            importLoaders: 1,
            minimize: !dev
        }
    }
]

//Déclaration de bibliothèque
//Pour pouvoir mettre à jour les bibliothèques indépendamment du code
//nous allons les exporter dans un fichier .js différent
let VENDOR_LIBS = [
    //lib ici
    "react/umd/react.development",
    "react-dom/umd/react-dom.development",
    "react-redux/dist/react-redux",
    "react-router/umd/react-router",
    "redux/dist/redux"
]


if(!dev){

    /* /!\ A TESTER !! */
    //si on est pas en dev on utilise des versions minifiees des lib js
    VENDOR_LIBS = [
        //lib ici
        "react/umd/react.development.min.js",
        "react-dom/umd/react-dom.production.min.js",
        "react-redux/dist/react-redux.min.js",
        "react-router/umd/react-router.min.js",
        "redux/dist/redux.min.js"
    ];

    //si on est pas en dev on ajoute postcss-loader et autoprefixer
    cssLoaders.push({
        loader: 'postcss-loader',
        options: {
            plugins: (loader) => [
                require('autoprefixer')({
                    browsers: ['last 2 versions', 'ie > 8']
                })
            ]
        }
    })
}

//configuration
let config = {

    //point d'entrée
    entry:{
        vendor:VENDOR_LIBS, //Les bibliothèques
        app:'./src/index.js'//l'index.js qui répertorie tout ce qu'il y a à compiler
    },

    watch:dev,//si on est en phase de dev on surveille les fichiers (superflu étant donné qu'on utilise webpack-dev-server ?)

    //point de sortie
    output:{
        path:path.resolve('./dist'),
        filename: dev ? '[name].js' : '[name].[chunkhash:8].js'
    },

    //alias (experimental (ok pour les url dans sass))
    resolve: {
        alias: {
            'assets' : path.resolve('./assets'),
            'img':path.resolve('./assets/img/'),
            'fontAwesomefonts':path.resolve('./node_modules/font-awesome/fonts/')
        }
    },

    //source-map lorsque les fichiers sont minifiés
    devtool: dev ? "cheap-module-eval-source-map" : "source-map",

    module: {

        rules: [
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use:['babel-loader']
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: cssLoaders
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [...cssLoaders, 'sass-loader']
                })
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use:[
                    {
                        loader: 'file-loader',
                        options: {
                            name:'fonts/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name:'img/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(html|txt|json)$/,
                use:[
                    {
                        loader:'file-loader',
                        options: {
                            name:'[name].[ext]',
                            useRelativePath:true,
                            context:'./src',
                        }
                    }
                ],
                exclude: path.join(__dirname,'src/index.html')//on exclue index.html car on utilise HtmlWebpackPlugin
            }
        ]

    },

    devServer: {
        port:3003,
        contentBase: path.join(__dirname, "src"),
    },

    plugins: [

        //donnons un ordre aux fichiers
        new CommonsPlugin({ name:"vendor", chunks:['vendor'], minChunks:Infinity}),
        new CommonsPlugin({ name:"app", chunks:['app']}),

        new ExtractTextPlugin({
            filename: dev ? '[name]'.css : '[name].[contenthash:8].css',
            disable: dev
        }),
        new HtmlWebpackPlugin({
            chunks:[
                //'commons',
                'vendor',
                'app'
            ],
            chunksSortMode: function(a, b) {
                return (a.names[0] < b.names[0])? 1 : -1;
             },//cette fonction remet les "chunks dans l'ordre"
            template:'src/index.html'
        })
    ]

}


if(!dev){
    config.plugins.push(new UglifyJSPlugin({
      sourceMap:true
    })),
    config.plugins.push(new ManifestPlugin()),
    config.plugins.push(new CleanWebpackPlugin(['dist'], {
        root: path.resolve('./'),
        verbose: true,
        dry: false
      }))
  }
  
  module.exports = config;