import path from 'path';
import webpack from 'webpack';
import { LoaderConfOptions, WebpackConfiguration } from 'kkt';
import lessModules from '@kkt/less-modules';
import rawModules from '@kkt/raw-modules';
import scopePluginOptions from '@kkt/scope-plugin-options';
import { mdCodeModulesLoader } from 'markdown-react-code-preview-loader';
import pkg from './package.json';

export default (conf: WebpackConfiguration, env: 'development' | 'production', options: LoaderConfOptions) => {
  conf = lessModules(conf, env, options);
  conf = rawModules(conf, env, { ...options, test: /\.(txt|md)$/i });
  conf = mdCodeModulesLoader(conf);
  conf = scopePluginOptions(conf, env, {
    ...options,
    allowedFiles: [path.resolve(process.cwd(), 'README.md'), path.resolve(process.cwd(), 'src')],
  });
  // Get the project version.
  conf.plugins!.push(
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(pkg.version),
    }),
  );
  conf.module!.exprContextCritical = false;
  if (env === 'production') {
    conf.optimization = {
      ...conf.optimization,
      splitChunks: {
        cacheGroups: {
          reactvendor: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react-vendor',
            chunks: 'all',
          },
          refractor: {
            test: /[\\/]node_modules[\\/](refractor)[\\/]/,
            name: 'refractor-vendor',
            chunks: 'all',
          },
          codeexample: {
            test: /[\\/]node_modules[\\/](code-example)[\\/]/,
            name: 'code-example-vendor',
            chunks: 'async',
          },
        },
      },
    };
    conf.output = { ...conf.output, publicPath: './' };
  }
  return conf;
};
