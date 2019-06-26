import pathify from 'vuex-pathify';

pathify.options.mapping = 'simple';
pathify.options.deep = 1;

pathify.debug();

export default pathify;
