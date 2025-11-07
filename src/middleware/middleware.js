export const parseJson = (req, res, next) => {
  express.json()(req, res, next);
};

export const parseForm = (req, res, next) => {
  express.urlencoded({ extended: true })(req, res, next);
};

export const validateRegister = (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  next();
};


