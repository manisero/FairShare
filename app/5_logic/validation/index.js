import validateParticipant from './participant'
import validateItem from './item'
import validateParticipations from './participation'

export default {
	participant: validateParticipant,
	item: validateItem,
	participation: validateParticipations
};
