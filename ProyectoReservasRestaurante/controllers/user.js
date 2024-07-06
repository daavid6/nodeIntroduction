import {validateUser, validatePartialUser} from '../schemas/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class UserController {
  constructor({ userModel }) {
    this.userModel = userModel
  }

  getAll = async (req, res) => {
    const users = await this.userModel.getAll()
    res.json(users)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const user = await this.userModel.getById({ id })

    if (user) return res.json(user)
      res.status(404).json({ message: 'User not found' })
  }

  create = async (req, res) => {
    const resultado = validateUser(req.body)

    if (resultado.error) {
      return res.status(400).json({ error: JSON.parse(resultado.error.message) })
    }

    const newUser = await this.userModel.create({input: resultado.data })
    res.status(201).json(newUser)
  }

  secret, { expiresIn: '1h' });
    res.json({ token });
  }
login = async (req, res) => {
    const { username, password } = req.body;
    const user = await this.userModel.getByUsername({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, jwtConfig.

  delete = async (req, res) => {
    const { id } = req.params
    const resultado = await this.userModel.delete({ id })
    
    if (resultado) return res.json({ message: 'User deleted' }) 
      return res.status(404).json({ message: 'User not found' })
  }

  update = async (req, res) => {
    const { id } = req.params
    const resultado = validatePartialUser(req.body)

    if (resultado.error) return res.status(400).json({ error: JSON.parse(resultado.error.message) })
    
    const updatedUser =  await this.userModel.update( { id, input: resultado.data })
  
    if (updatedUser) return res.json(updatedUser) 
      return res.status(404).json({ message: 'User not found' })
  }
}