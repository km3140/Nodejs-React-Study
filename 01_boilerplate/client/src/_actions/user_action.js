// 비동기 처리 가능 : redux thunk
import axios from 'axios';
import { useDispatch } from 'react-redux';

export function loginUser(dataToSubmit) {
  const dispatch = useDispatch();

  const request = axios.post('/api/users/login', dataToSubmit).then(res => res.data);

  // dispatch()
}
