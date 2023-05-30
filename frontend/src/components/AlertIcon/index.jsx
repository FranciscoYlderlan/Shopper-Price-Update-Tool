import {GrStatusWarning, GrStatusGood} from 'react-icons/gr'

export function AlertIcon({log_error}) {

  if (log_error.length > 0) {
      return (
          <GrStatusWarning size={20} style={{ fill: '#DC2626' }}/>
        );
    } else {
      return (
          <GrStatusGood size={20} style={{ fill: '#15803D' }} />
      ); 
    }
}