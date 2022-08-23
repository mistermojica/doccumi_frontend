module.exports = {
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'ckeditor/**',
          '**/ckeditor/**',
          '*.js',
          '**/*.ckeditor.js',
          '**/*.ckeditor.*',
          '**/ckeditor/*.js',
          '**/ckeditor/**/*.js',
          '**/.ckeditor/**/*.*',
        ],
        peerDependencies: true,
      },
    ]
  }
}