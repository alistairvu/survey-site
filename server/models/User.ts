import mongoose from "mongoose"
import bcrypt from "bcryptjs"

interface UserSchema extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId
  name: string
  email: string
  password: string
  questions: mongoose.Schema.Types.ObjectId[]
  matchPassword: (password: string) => any
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Questions" }],
  },
  { timestamps: true }
)

userSchema.pre("save", async function (this: UserSchema, next: any) {
  if (!this.isModified("password")) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function (
  this: UserSchema,
  password: string
) {
  return await bcrypt.compare(password, this.password)
}

const User = mongoose.model<UserSchema>("User", userSchema)
export default User
