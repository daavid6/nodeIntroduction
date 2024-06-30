import {validateDiningTable, validatePartialDiningTable} from '../schemas/diningTable.js'

export class DiningTableController {
  constructor({ diningTableModel }) {
    this.diningTableModel = diningTableModel
  }

  getAll = async (req, res) => {
    const diningTables = await this.diningTableModel.getAll()
    res.json(diningTables)
  }

  getById = async (req, res) => {
    const { restaurant_id, number } = req.params
    const diningTable = await this.diningTableModel.getById({ restaurant_id, number })

    if (diningTable) return res.json(diningTable)
      res.status(404).json({ message: 'DiningTable not found' })
  }

  create = async (req, res) => {
    const resultado = validateDiningTable(req.body)

    if (resultado.error) {
      return res.status(400).json({ error: JSON.parse(resultado.error.message) })
    }

    const newDiningTable = await this.diningTableModel.create({input: resultado.data })
    res.status(201).json(newDiningTable)

  }

  delete = async (req, res) => {
    const { restaurant_id, number } = req.params
    const resultado = await this.diningTableModel.delete({ restaurant_id, number })
    
    if (resultado) return res.json({ message: 'DiningTable deleted' }) 
      return res.status(404).json({ message: 'DiningTable not found' })
  }

  update = async (req, res) => {
    const { restaurant_id, number } = req.params
    const resultado = validatePartialDiningTable(req.body)

    if (resultado.error) return res.status(400).json({ error: JSON.parse(resultado.error.message) })
    
    const updatedDiningTable =  await this.diningTableModel.update( { restaurant_id, number, input: resultado.data })
  
    if (updatedDiningTable) return res.json(updatedDiningTable) 
      return res.status(404).json({ message: 'DiningTable not found' })
  }
}