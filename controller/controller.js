export const time = (req, res, next) => {
  console.log("New request is at", Date.now());
  next();
};
