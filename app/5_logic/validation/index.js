import { validateParticipantAdd, validateParticipantEdit } from './participant'
import { validateItemAdd, validateItemEdit } from './item'
import { validateParticipationsAdd, validateParticipationsEdit } from './participation'

export default {
	participant: { add: validateParticipantAdd, edit: validateParticipantEdit },
	item: { add: validateItemAdd, edit: validateItemEdit },
	participation: { add: validateParticipationsAdd, edit: validateParticipationsEdit }
};
