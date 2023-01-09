savePoster = async (postShare: any) => {
  ActivityIndicator.show();
  const uri = await this.getCapture(postShare);
  let success;
  if (uri) {
    if (Platform.OS === 'ios') {
      try {
        success = await CameraRoll.save(uri, {type: 'photo'});
      } catch (error: any) {
        ActivityIndicator.hide();
        if (error.code === 'E_UNABLE_TO_SAVE') {
          Toast.show('保存图片到相册失败。请在设置中开启相册访问权限');
        }
        return;
      }
    } else {
      success = await CameraRoll.save(uri, {type: 'photo'});
    }
  }
  ActivityIndicator.hide();
  Toast.show(success ? '保存成功' : '保存失败');
};

getCapture = async (postShare: any) => {
  let uri = '';
  let {link} = postShare;
  let success: any = false;
  const isAndroid = Platform.OS === 'android';
  if (isAndroid) {
    const result = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (!result) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: '保存图片',
          message: '需要访问你的相册',
          buttonPositive: 'bottom',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
        return;
      }
    }
  }
  const uuid = rnUuid.v4();
  let dirs = isAndroid
    ? RNFetchBlob.fs.dirs.DownloadDir
    : RNFetchBlob.fs.dirs.CacheDir;
  const path = `${dirs}/${uuid}.png`;
  success = await RNFetchBlob.fs.writeFile(path, link, 'base64');
  uri = isAndroid ? `file://${path}` : path;
  return success ? uri : undefined;
};

savePdf = async (pdfObject: any) => {
  ActivityIndicator.show();
  const {title, uri} = pdfObject;
  const {dirs} = RNFetchBlob.fs;
  const dirToSave =
    Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
  const configfb = {
    fileCache: true,
    useDownloadManager: true,
    notification: true,
    mediaScannable: true,
    title: title,
    path: `${dirToSave}/${title}.pdf`,
  };
  const configOptions: any = Platform.select({
    ios: {
      fileCache: configfb.fileCache,
      title: configfb.title,
      path: configfb.path,
      appendExt: 'pdf',
    },
    android: {
      addAndroidDownloads: configfb,
    },
  });

  const isAndroid = Platform.OS === 'android';
  if (isAndroid) {
    const result = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (!result) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: '保存图片',
          message: '需要访问你的相册',
          buttonPositive: 'bottom',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
        ActivityIndicator.hide();
        return;
      }
    }
  }

  RNFetchBlob.config(configOptions)
    .fetch('GET', uri, {})
    .then(async (res) => {
      ActivityIndicator.hide();
      if (Platform.OS === 'ios') {
        RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
        RNFetchBlob.ios.previewDocument(configfb.path);
      }
      if (Platform.OS === 'android') {
        // showSnackbar('File downloaded');
        Toast.show('保存成功');
      }
    })
    .catch(() => {
      ActivityIndicator.hide();
      Toast.show('保存失败');
    });
};

saveVideo = async (postShare: any) => {
  ActivityIndicator.show();
  const {title, uri} = postShare;
  const {dirs} = RNFetchBlob.fs;
  const dirToSave =
    Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
  const configfb = {
    fileCache: true,
    useDownloadManager: true,
    notification: true,
    mediaScannable: true,
    title: title,
    path: `${dirToSave}/${title}.mp4`,
  };
  const configOptions: any = Platform.select({
    ios: {
      fileCache: configfb.fileCache,
      title: configfb.title,
      path: configfb.path,
      appendExt: 'mp4',
    },
    android: {
      addAndroidDownloads: configfb,
    },
  });

  const isAndroid = Platform.OS === 'android';
  if (isAndroid) {
    const result = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (!result) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: '保存图片',
          message: '需要访问你的相册',
          buttonPositive: 'bottom',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
        ActivityIndicator.hide();
        return;
      }
    }
  }

  RNFetchBlob.config(configOptions)
    .fetch('GET', uri, {})
    .then(async () => {
      if (Platform.OS === 'ios') {
        let success;
        try {
          success = await CameraRoll.save(configfb.path, {type: 'video'});
        } catch (error: any) {
          ActivityIndicator.hide();
          if (error.code === 'E_UNABLE_TO_SAVE') {
            Toast.show('保存图片到相册失败。请在设置中开启相册访问权限');
          }
          return;
        }
        Toast.show(success ? '保存成功' : '保存失败');
      } else {
        Toast.show('保存成功');
      }

      ActivityIndicator.hide();
    })
    .catch(() => {
      ActivityIndicator.hide();
      Toast.show('保存失败');
    });
};
