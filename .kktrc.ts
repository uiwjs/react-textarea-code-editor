import path from 'path';
import webpack, { Configuration } from 'webpack';
import { LoaderConfOptions } from 'kkt';
import lessModules from '@kkt/less-modules';
import rawModules from '@kkt/raw-modules';
import scopePluginOptions from '@kkt/scope-plugin-options';
import pkg from './package.json';

export default (conf: Configuration, env: 'development' | 'production', options: LoaderConfOptions) => {
  conf = lessModules(conf, env, options);
  if (options.bundle) {
    conf.output!.library = '@uiw/react-textarea-code-editor';
    conf.externals = {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
    };
  } else {
    conf = rawModules(conf, env, { ...options, test: /\.(txt|md)$/i });
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
  }
  return conf;
};
