import buildConfig from "./buildConfig";

const routes = buildConfig.map(config => {
  const baseName = config.filePath.replace(/\.vue$/, "");

  return {
    path: config.routePath,
    component: () => import(`../view/${baseName}.vue`)
  };
});

routes.push({ path: "/", redirect: "/portrayal-analyze" });

export default routes;
