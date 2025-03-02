/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams, useLocation } from 'react-router-dom';

export function useRouter() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  return {
    push: (path: any) => navigate(path),
    replace: (path: any) => navigate(path, { replace: true }),
    back: () => navigate(-1),
    
    pathname: location.pathname,
    query: Object.fromEntries(new URLSearchParams(location.search)),
    asPath: location.pathname + location.search,
    
    params
  };
}