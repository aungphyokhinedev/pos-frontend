import constants from './constants'
import io from 'socket.io-client'
import  {store} from '../store'


const socket = () => {
    return io(constants.socketUrl,{
        query: {
            authorization: '' + store.getters['common/authToken']
          }
    });
}

export default socket;