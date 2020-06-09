module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8085, // CHANGE YOUR PORT HERE!
   // https: true,
    hotOnly: false,
},
pwa: {
  name: 'iPos Admin',
  assetsVersion:'1.2',
  themeColor: '#1b5e20',
  msTileColor: '#558b2f',
  appleMobileWebAppCapable: 'yes',
  appleMobileWebAppStatusBarStyle: '#1b5e20',
  manifestOptions:{
    icons: [
      {
          'src': 'img/icons/ipos-logo-new-small.png',
          'sizes': '192x192',
          'type': 'image/png',
      },
      {
          'src': 'img/icons/ipos-logo-new.png',
          'sizes': '512x512',
          'type': 'image/png',
      },
  ],
  },
  // configure the workbox plugin
  iconPaths:
  {
    favicon32: 'img/icons/favicon-32x32.png',
    favicon16: 'img/icons/favicon-16x16.png',
    appleTouchIcon: 'img/icons/android-icon-192x192.png',
    maskIcon: 'img/icons/android-icon-192x192.png',
    msTileImage: 'img/icons/android-icon-192x192.png'
  }
}
}

