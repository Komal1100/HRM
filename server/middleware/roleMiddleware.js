export const isEmployee = (req, res, next) => {
  if (req.user.role !== "Employee") {
    return res.status(403).json({ message: "Employee access only" });
  }
  next();
};

export const isHR = (req, res, next) => {
  if (req.user.role !== "HR") {
    return res.status(403).json({ message: "HR access only" });
  }
  next();
};


// export const isEmployee = (req, res, next) => {
//   if (req.user.role !== "Employee")
//     return res.status(403).json({ message: "Employee access only" });
//   next();
// };

// export const isHR = (req, res, next) => {
//   if (req.user.role !== "HR")
//     return res.status(403).json({ message: "HR access only" });
//   next();
// };
