module.exports = {
  apps: [{
    name: "expo-web",
    script: "npm",
    args: "run web",
    watch: true,
    ignore_watch: ["node_modules", "expo-web-build"],
  }]
};
