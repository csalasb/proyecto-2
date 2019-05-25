const logger = store => next => action => {
  console.group(action.type)
  console.info('Se está ejecutando la acción: ', action)
  console.log('El state viejo de la store: ', store.getState())
  const result = next(action)
  console.log('El nuevo state de la store: ', store.getState())
  console.groupEnd()

  return result
}

export default logger
