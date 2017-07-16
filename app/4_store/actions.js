import { createActionCreatorsFromCommands, createActionCreator } from 'framework/store'
import stateCommands from 'state/commands'

let actions = createActionCreatorsFromCommands(stateCommands);
actions.BATCH = createActionCreator('BATCH', [ 'actions' ])

export { actions };
