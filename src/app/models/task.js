const taskSchema = new Schema({
    title: String,
    description: String,
    status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  });
  
  export default models.Task || model('Task', taskSchema);