import { Schema, model, models } from "mongoose";
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
  },
  lastname: {
    type: String,
  },
  todo: {
    type: Array,
    default: [],
  },
  createAt: {
    type: Date,
    immutable: true,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});
const User = models.Users || new model("Users", userSchema);
// new model("X" ,Xschema) ===> models.X
export default User;
