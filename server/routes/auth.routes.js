const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult, body } = require("express-validator");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });
const tokenService = require("../services/token.service");
const yup = require("yup");

const validateSchemePassword = yup.object().shape({
  password: yup
    .string()
    .required("Пароль обязателен для заполнения")
    .matches(
      /(?=.*[A-Z])/,
      "Пароль должен содержать хотябы одну заглавную букву"
    )
    .matches(/(?=.*[0-9])/, "Пароль должен содержать хотябы одну цифру")
    .matches(
      /(?=.*[!@#$%^&*_])/,
      "Пароль должен содержать один из специальных символов !@#$%^&*_"
    )
    .min(8, "Проль должен быть минимум 8 символов"),
});

router.post("/signUp", [
  check("email", "Некорректный email").isEmail(),
  body("password", "Пароль не соответствует утсановленным норма").custom(
    (password) => validateSchemePassword.isValidSync({ password })
  ),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: `INVALID_DATA ${errors[0].msg}`,
            code: 400,
          },
        });
      }

      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          error: {
            message: "EMAIL_EXISTS",
            code: 400,
          },
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = await User.create({
        ...req.body,
        password: hashedPassword,
      });
      const tokens = tokenService.generate({ _id: newUser._id });
      await tokenService.save(newUser._id, tokens.refreshToken);

      res.status(201).send({ ...tokens, userId: newUser._id });
    } catch (e) {
      res.status(500).json({
        message: `На сервере произошла ошибка. Попробуйте позже.`,
      });
    }
  },
]);

router.post("/signInWithToken", async (req, res) => {
  const { userId: _id, accessToken, refreshToken } = req.body;
  const isValidAccessToken = tokenService.validateAccess(accessToken);
  const isValidRefreshToken = tokenService.validateRefresh(refreshToken);

  if (!isValidAccessToken && !isValidRefreshToken) {
    return res.status(400).send({
      error: {
        message: "TOKENS_IS_NOT_VALID",
        code: 400,
      },
    });
  }

  const existingUser = await User.findOne({ _id });
  res.status(200).send(existingUser);
});

router.post("/signIn", [
  check("email", "Email некорректный").normalizeEmail().isEmail(),
  body("password", "Пароль не соответствует утсановленным нормам").custom(
    (password) => validateSchemePassword.isValidSync({ password })
  ),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
          },
        });
      }
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        return res.status(400).send({
          error: {
            message: "EMAIL_NOT_FOUND",
            code: 400,
          },
        });
      }

      const isPasswordEqual = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!isPasswordEqual) {
        return res.status(400).send({
          error: {
            message: "INVALID_PASSWORD",
            code: 400,
          },
        });
      }

      const tokens = tokenService.generate({ _id: existingUser._id });
      await tokenService.save(existingUser._id, tokens.refreshToken);

      res.status(200).send({ ...tokens, userId: existingUser._id });
    } catch (e) {
      res.status(500).json({
        message: `На сервере произошла ошибка. Попробуйте позже.`,
      });
    }
  },
]);

function isTokenInvalid(data, dbToken) {
  return !data || !dbToken || data._id !== dbToken?.user?.toString();
}

router.post("/token", async (req, res) => {
  try {
    const { refresh_token: refreshToken } = req.body;
    const data = tokenService.validateRefresh(refreshToken);
    const dbToken = await tokenService.findToken(refreshToken);

    if (isTokenInvalid(data, dbToken)) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const tokens = await tokenService.generate({
      id: data.id,
    });
    await tokenService.save(data._id, tokens.refreshToken);

    res.status(200).send({ ...tokens, userId: data._id });
  } catch (e) {
    res.status(500).json({
      message: `На сервере произошла ошибка. Попробуйте позже.`,
    });
  }
});

module.exports = router;
