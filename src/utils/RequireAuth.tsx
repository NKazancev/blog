import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from 'store/hooks';

type ProtectedRouteProps = PropsWithChildren;

export default function RequireAuth({ children }: ProtectedRouteProps) {
  const { isLogged } = useAppSelector((state) => state.userSlice);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate('/sign-in', { replace: true });
    }
  });

  return <div>{children}</div>;
}
