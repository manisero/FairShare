import { connect } from 'react-redux'
import InfoPres from './InfoPres.jsx'

let mapStateToProps = state => ({
    inputLength: state.info.inputLength
});

let InfoCont = connect(mapStateToProps)(InfoPres);

export default InfoCont;
