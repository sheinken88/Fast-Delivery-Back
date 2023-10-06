import mongoose, { Schema } from 'mongoose'
import type IStatement from 'interfaces/statement.interface'

const statementSchema: Schema = new Schema({
    consumedAlcohol: { type: Boolean, required: true },
    usingPsychoactiveMedication: { type: Boolean, required: true },
    havingEmotionalIssues: { type: Boolean, required: true },
    date: { type: String, required: true },
})

const Statement = mongoose.model<IStatement>('Statement', statementSchema)

export default Statement
