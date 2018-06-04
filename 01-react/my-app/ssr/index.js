require("babel-register");

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../config/webpack.config.dev.js';
console.log(JSON.stringify(webpackConfig))

import express from "express";
import path from "path";


import React from "react";
import { renderToString } from "react-dom/server";
import App from "../src/app";
import { readFileSync } from "fs";



const app = express();
app.use(webpackMiddleware(webpack(webpackConfig)));

app.use( express.static( path.resolve( __dirname, "../build/static" ) ) );

app.get( "/*", ( req, res ) => {
    const jsx = ( <App /> );
    const reactDom = renderToString( jsx );

    res.writeHead( 200, { "Content-Type": "text/html" } );
    res.end( htmlTemplate( reactDom ) );
} );

app.listen( 3001 );

function htmlTemplate( reactDom ) {
    var template = readFileSync('./index.html', 'utf8')
    return template.replac(/<div id="root"><\/div>/,reactDom);
}