// Datos de demostración en memoria
let categories = [
  { id: 1, nombre: 'Tecnología', descripcion: 'Noticias sobre tecnología', activo: true, fechaalta: new Date(), useralta: 'admin' },
  { id: 2, nombre: 'Deportes', descripcion: 'Noticias deportivas', activo: true, fechaalta: new Date(), useralta: 'admin' },
  { id: 3, nombre: 'Política', descripcion: 'Noticias políticas', activo: true, fechaalta: new Date(), useralta: 'admin' }
];

let nextId = 4;

const get = (request, response) => {
  try {
    const { nombre, descripcion, activo, useralta } = request.query;
    let filteredCategories = categories;

    if (nombre) {
      filteredCategories = filteredCategories.filter(c => 
        c.nombre.toLowerCase().includes(nombre.toLowerCase())
      );
    }
    
    if (descripcion) {
      filteredCategories = filteredCategories.filter(c => 
        c.descripcion.toLowerCase().includes(descripcion.toLowerCase())
      );
    }
    
    if (activo !== undefined) {
      filteredCategories = filteredCategories.filter(c => 
        c.activo === (activo === 'true')
      );
    }
    
    if (useralta) {
      filteredCategories = filteredCategories.filter(c => 
        c.useralta === useralta
      );
    }

    response.json(filteredCategories);
  } catch (err) {
    console.log(err);
    response.status(500).send('Error consultando los datos');
  }
};

const getById = (request, response) => {
  try {
    const id = parseInt(request.params.id);
    const category = categories.find(c => c.id === id);
    
    if (category) {
      response.json(category);
    } else {
      response.status(404).send('Recurso no encontrado');
    }
  } catch (err) {
    response.status(500).send('Error al consultar el dato');
  }
};

const create = (request, response) => {
  try {
    const newCategory = {
      id: nextId++,
      ...request.body,
      fechaalta: new Date()
    };
    
    categories.push(newCategory);
    response.status(201).json(newCategory);
  } catch (err) {
    response.status(500).send('Error al crear');
  }
};

const update = (request, response) => {
  try {
    const id = parseInt(request.params.id);
    const categoryIndex = categories.findIndex(c => c.id === id);
    
    if (categoryIndex !== -1) {
      categories[categoryIndex] = { ...categories[categoryIndex], ...request.body };
      response.status(200).send('1 registro actualizado');
    } else {
      response.status(404).send('Recurso no encontrado');
    }
  } catch (err) {
    response.status(500).send('Error al actualizar');
  }
};

const destroy = (request, response) => {
  try {
    const id = parseInt(request.params.id);
    const categoryIndex = categories.findIndex(c => c.id === id);
    
    if (categoryIndex !== -1) {
      categories.splice(categoryIndex, 1);
      response.status(200).send('1 registro eliminado');
    } else {
      response.status(404).send('Recurso no encontrado');
    }
  } catch (err) {
    response.status(500).send('Error al eliminar');
  }
};

module.exports = {
  get,
  getById,
  create,
  update,
  destroy
};