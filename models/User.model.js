const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 4,
      maxlength: 15
    },
    name: {
      type: String,
      minlength: 2,
      maxlength: 25
    },
    lastname: {
      type: String,
      minlength: 2,
      maxlength: 35
    },
    nif: {
      type: String,
      unique: true,
      trim: true,
      uppercase: true,
      required: [true, 'El DNI/NIE no es válido'],
      validate: function (email) {
        return /^(((([X-Z])|([LM])){1}([-]?)((\d){7})([-]?)([A-Z]{1}))|((\d{8})([-]?)([A-Z])))$/.test(email)
      }
    },
    flightHours: {
      type: Number
    },
    aboutMe: {
      type: String
    },
    password: {
      type: String,
      required: true,
    },
    events: [{
      type: Schema.Types.ObjectId,
      ref: 'Event'
    }],
    role: {
      type: String,
      enum: ['ADMIN', 'USER'],
      default: 'USER'
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'Introduzca su e-mail'],
      validate: function (email) {
        return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email)
      }
    },
    imageURL: {
      type: String,
      default: 'https://img.favpng.com/17/1/20/user-interface-design-computer-icons-default-png-favpng-A0tt8aVzdqP30RjwFGhjNABpm.jpg'
    },
    birth: {
      type: Date
    }
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema)

module.exports = User
