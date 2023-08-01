import { LoaderConfOptions, WebpackConfiguration } from 'kkt';
import lessModules from '@kkt/less-modules';

export default (conf: WebpackConfiguration, env: 'development' | 'production', options: LoaderConfOptions) => {
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
  }
  return conf;
};
