/* const parseFiles = (files) => {
  const parsed = Object.keys(files).reduce((acc, key) => {
    const fullPath = _.toPath(key);

    if (fullPath.length <= 1 || fullPath[0] !== "files") {
      return acc;
    }

    const path = _.tail(fullPath);
    acc[path.join(".")] = files[key];
    return acc;
  }, {});
  return parsed;
};

module.exports = (plugin) => {
  const origAuthRegister = plugin.controllers.auth.register;

  plugin.controllers.auth.register = async (ctx) => {
    await origAuthRegister(ctx);
    const response = ctx.response.body;
    if (response.user) {
      if (ctx.is("multipart")) {
        const files = parseFiles(ctx.request.files);
        if (files.avatar) {
          const uploadService = strapi.plugin("upload").service("upload");
          await uploadService.uploadToEntity(
            {
              id: response.user.id,
              model: "plugin::users-permissions.user",
              field: "avatar",
            },
            files.avatar
          );
        }
      }
    }
  };

  return plugin;
};
 */
